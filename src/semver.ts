import { inc, ReleaseType, SemVer } from "semver";

import { Outputs } from "./constants";
import { Results } from "./types";

export function bumpPrerelease(
    version: string,
    release: ReleaseType,
    preReleaseIdentifier: string
): string {
    const parsed = new SemVer(version);
    let result = inc(version, release, preReleaseIdentifier) || version;
    if (parsed.prerelease.length) {
        if (
            release === "premajor" &&
            parsed.minor === 0 &&
            parsed.patch === 0
        ) {
            result = inc(version, "prerelease", preReleaseIdentifier) || result;
        }
        if (release === "preminor" && parsed.patch === 0) {
            result = inc(version, "prerelease", preReleaseIdentifier) || result;
        }
        if (release === "prepatch") {
            result = inc(version, "prerelease", preReleaseIdentifier) || result;
        }
    }
    const resultParsed = new SemVer(result);
    if (resultParsed.prerelease[1] === 0) {
        result = inc(result, "prerelease", preReleaseIdentifier) || result;
    }
    return result;
}

export function bumpRelease(
    version: string,
    release: ReleaseType,
    preReleaseIdentifier: string
): string {
    let result = inc(version, release, preReleaseIdentifier) || version;
    const resultParsed = new SemVer(result);
    if (resultParsed.prerelease[1] === 0) {
        result = inc(result, "prerelease", preReleaseIdentifier) || result;
    }
    return result;
}

export function bumpBuild(version: string): string {
    const parsed = new SemVer(version);
    const build = parseInt(parsed.build[0]) + 1 || 1;
    return `${parsed.format()}+${build}`;
}

function isPrerelease(version: string): boolean {
    return new SemVer(version).prerelease.length ? true : false;
}

export function getResults(
    version: string,
    outputPrerelease: boolean,
    prereleaseType: string,
    resultKey: string
): Results {
    const results = {
        [Outputs.Input]: new SemVer(version).format(),
        [Outputs.Major]: version,
        [Outputs.Minor]: version,
        [Outputs.Patch]: version,
        [Outputs.Micro]: version,
        [Outputs.Prerelease]: version,
        [Outputs.Postrelease]: version,
        [Outputs.Build]: version,
        [Outputs.Result]: version,
        [Outputs.IsPrerelease]: false
    };

    if (outputPrerelease) {
        results[Outputs.Major] = bumpPrerelease(
            version,
            "premajor",
            prereleaseType
        );
        results[Outputs.Minor] = bumpPrerelease(
            version,
            "preminor",
            prereleaseType
        );
        results[Outputs.Patch] = bumpPrerelease(
            version,
            "prepatch",
            prereleaseType
        );
        results[Outputs.Prerelease] = results[Outputs.Patch];
    } else {
        results[Outputs.Major] = bumpRelease(version, "major", prereleaseType);
        results[Outputs.Minor] = bumpRelease(version, "minor", prereleaseType);
        results[Outputs.Patch] = bumpRelease(version, "patch", prereleaseType);
        results[Outputs.Prerelease] = bumpRelease(
            version,
            "prerelease",
            prereleaseType
        );
    }
    results[Outputs.Postrelease] = results[Outputs.Patch];
    results[Outputs.Build] = bumpBuild(version);
    results[Outputs.Micro] = results[Outputs.Patch];
    if (Object.keys(results).includes(resultKey)) {
        results[Outputs.Result] = results[resultKey];
    } else {
        results[Outputs.Result] = new SemVer(resultKey).format();
    }
    results[Outputs.IsPrerelease] = isPrerelease(results[Outputs.Result]);
    return results;
}
