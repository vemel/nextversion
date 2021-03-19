import * as core from "@actions/core";
import fs from "fs";

import { Inputs, Outputs } from "./constants";
import { getResults as getResultsPEP440 } from "./pep440";
import { getResults as getResultsSemVer } from "./semver";
import { Results } from "./types";

function getResults(
    version: string,
    versionType: string,
    outputPrerelease: boolean,
    prereleaseType: string
): Results {
    if (versionType == "pep440") {
        return getResultsPEP440(version, outputPrerelease, prereleaseType);
    }
    return getResultsSemVer(version, outputPrerelease, prereleaseType);
}

function setOutputs(input: string, result: string, results: Results): void {
    core.setOutput(Outputs.Major, results[Outputs.Major]);
    core.setOutput(Outputs.Minor, results[Outputs.Minor]);
    core.setOutput(Outputs.Patch, results[Outputs.Patch]);
    core.setOutput(Outputs.Micro, results[Outputs.Patch]);
    core.setOutput(Outputs.Prerelease, results[Outputs.Prerelease]);
    core.setOutput(Outputs.Result, result);
    core.setOutput(Outputs.Input, results[Outputs.Input]);
    core.setOutput(Outputs.RawInput, input);
}

function updatePaths(
    oldVersion: string,
    newVersion: string,
    paths: Array<string>
): void {
    for (const path of paths) {
        core.debug(`Updating path ${path}`);
        if (!fs.existsSync(path)) {
            core.warning(`Version file path ${path} does not exist`);
            continue;
        }
        const data = fs.readFileSync(path, "utf-8");
        if (!data.includes(oldVersion)) {
            core.warning(
                `Version file path ${path} does not contain version ${oldVersion}`
            );
            continue;
        }
        fs.writeFileSync(path, data.replace(oldVersion, newVersion));
        core.debug(`Updated version in path ${path} to ${newVersion}`);
    }
}

async function run(): Promise<void> {
    try {
        const version = core.getInput(Inputs.Version, { required: true });
        const paths = (core.getInput(Inputs.Path) || "")
            .split(/\r?\n/)
            .map(x => x.trim());
        const versionType = (
            core.getInput(Inputs.Type) || "semver"
        ).toLowerCase();
        const outputPrerelease = ![false, "false", "no"].includes(
            (core.getInput(Inputs.Prerelease) || "false").toLowerCase()
        );
        const prereleaseType = core.getInput(Inputs.PrereleaseType) || "rc";
        const resultKey = core.getInput(Inputs.Result) || Outputs.Patch;
        core.debug(`Got input version: ${version}`);
        const results = getResults(
            version,
            versionType,
            outputPrerelease,
            prereleaseType
        );
        const result = results[resultKey];
        setOutputs(version, result, results);
        updatePaths(version, result, paths);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

export default run;
