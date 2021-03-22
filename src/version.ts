import * as core from "@actions/core";
import fs from "fs";

import { Inputs, Outputs, VersionType } from "./constants";
import { getResults as getResultsPEP440 } from "./pep440";
import { getResults as getResultsSemVer } from "./semver";
import { Results } from "./types";
import { getVersionFromPath } from "./utils";

function getResults(
    version: string,
    versionType: string,
    outputPrerelease: boolean,
    prereleaseType: string,
    resultKey: string
): Results {
    if (versionType == VersionType.PEP440) {
        return getResultsPEP440(
            version,
            outputPrerelease,
            prereleaseType,
            resultKey
        );
    }
    return getResultsSemVer(
        version,
        outputPrerelease,
        prereleaseType,
        resultKey
    );
}

function setOutputs(input: string, result: string, results: Results): void {
    core.setOutput(Outputs.Major, results[Outputs.Major]);
    core.setOutput(Outputs.Minor, results[Outputs.Minor]);
    core.setOutput(Outputs.Patch, results[Outputs.Patch]);
    core.setOutput(Outputs.Micro, results[Outputs.Micro]);
    core.setOutput(Outputs.Prerelease, results[Outputs.Prerelease]);
    core.setOutput(Outputs.Result, results[Outputs.Result]);
    core.setOutput(Outputs.Input, results[Outputs.Input]);
    core.setOutput(Outputs.RawInput, input);
}

function updatePath(
    oldVersion: string,
    newVersion: string,
    path: string,
    encoding: string
): void {
    core.debug(`Updating path ${path}`);
    if (!fs.existsSync(path)) {
        core.warning(`Version file path ${path} does not exist`);
        return;
    }
    const data = fs.readFileSync(path, { encoding });
    if (!data.includes(oldVersion)) {
        core.warning(
            `Version file path ${path} does not contain version ${oldVersion}`
        );
        return;
    }
    const newData = data.replace(oldVersion, newVersion);
    fs.writeFileSync(path, newData, encoding);
    core.debug(`Updated version in path ${path} to ${newVersion}`);
}

function getResultKeyFromNotes(notes: string): string {
    if (notes.match(/^### Removed$/im)) return Outputs.Major;
    if (notes.match(/^### Added$/im)) return Outputs.Minor;
    if (notes.match(/^### Changed$/im)) return Outputs.Minor;
    return Outputs.Patch;
}

async function run(): Promise<void> {
    try {
        let version = core.getInput(Inputs.Version) || "";
        const versionPath = core.getInput(Inputs.VersionPath) || "";
        const releaseNotes = core.getInput(Inputs.ReleaseNotes) || "";
        const encoding = core.getInput(Inputs.Encoding) || "utf-8";
        const versionType = (
            core.getInput(Inputs.Type) || VersionType.SemVer
        ).toLowerCase();
        core.error(releaseNotes);
        if (versionPath.length) {
            version = getVersionFromPath(versionPath, encoding);
            core.debug(`Extracted version ${version} from ${versionPath}`);
        }
        if (!version.length) {
            throw new Error(`Invalid input version: ${version}`);
        }

        const updatePaths = (core.getInput(Inputs.UpdatePath) || "")
            .split(/\r?\n/)
            .map(x => x.trim())
            .filter(x => x.length);
        const outputPrerelease = ![false, "false", "no"].includes(
            (core.getInput(Inputs.Prerelease) || "false").toLowerCase()
        );
        const prereleaseType = core.getInput(Inputs.PrereleaseType) || "rc";
        const resultKey =
            core.getInput(Inputs.Result) || getResultKeyFromNotes(releaseNotes);
        core.debug(`Got input version: ${version}`);
        core.debug(`Result version set to ${resultKey}`);
        const results = getResults(
            version,
            versionType,
            outputPrerelease,
            prereleaseType,
            resultKey
        );
        const result = results[Outputs.Result];
        setOutputs(version, result, results);
        for (const path of updatePaths) {
            updatePath(version, result, path, encoding);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

export default run;
