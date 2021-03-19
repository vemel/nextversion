import { clean, explain, inc } from "@renovate/pep440";

import { Outputs } from "./constants";
import { Results } from "./types";

export function bumpPrerelease(
    version: string,
    release: string,
    preReleaseIdentifier: string
): string {
    const parsed = explain(version);
    let result = inc(version, release, preReleaseIdentifier);
    if (parsed.is_prerelease) {
        if (
            release === "premajor" &&
            parsed.release[1] === 0 &&
            parsed.release[2] === 0
        ) {
            result = inc(version, "prerelease", preReleaseIdentifier);
        }
        if (release === "preminor" && parsed.release[2] === 0) {
            result = inc(version, "prerelease", preReleaseIdentifier);
        }
        if (release === "prepatch") {
            result = inc(version, "prerelease", preReleaseIdentifier);
        }
    }
    const resultParsed = explain(result);
    if (resultParsed.pre && resultParsed.pre[1] === 0) {
        result = inc(result, "prerelease", preReleaseIdentifier);
    }
    return result;
}

export function bumpRelease(
    version: string,
    release: string,
    preReleaseIdentifier: string
): string {
    let result = inc(version, release, preReleaseIdentifier);
    const resultParsed = explain(result);
    if (resultParsed.pre && resultParsed.pre[1] === 0) {
        result = inc(result, "prerelease", preReleaseIdentifier);
    }
    return result;
}

export function getResults(
    version: string,
    outputPrerelease: boolean,
    prereleaseType: string
): Results {
    const results = {
        [Outputs.Input]: clean(version),
        [Outputs.Major]: version,
        [Outputs.Minor]: version,
        [Outputs.Patch]: version,
        [Outputs.Prerelease]: version
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
    return results;
}
