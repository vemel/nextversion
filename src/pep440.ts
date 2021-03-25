import { clean, explain, inc } from "@renovate/pep440";
import { parse, stringify } from "@renovate/pep440/lib/version";

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

function bumpPostrelease(version: string): string {
    const parsed = parse(version);
    delete parsed.pre;
    parsed.post = ["post", parsed.post ? parsed.post[1] + 1 : 1];
    return clean(stringify(parsed));
}

function bumpLocal(version: string): string {
    const parsed = parse(version);
    const local = parsed.local ? parsed.local[0] + 1 : 1;
    parsed.local = [local];
    return clean(stringify(parsed));
}

function isPrerelease(version: string): boolean {
    return explain(version).is_prerelease;
}

export function getResults(
    version: string,
    outputPrerelease: boolean,
    prereleaseType: string,
    resultKey: string
): Results {
    const results = {
        [Outputs.Input]: clean(version),
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
    results[Outputs.Micro] = results[Outputs.Patch];
    results[Outputs.Postrelease] = bumpPostrelease(version);
    results[Outputs.Build] = bumpLocal(version);
    if (Object.keys(results).includes(resultKey)) {
        results[Outputs.Result] = results[resultKey];
    } else {
        results[Outputs.Result] = clean(resultKey);
    }
    results[Outputs.IsPrerelease] = isPrerelease(results[Outputs.Result]);
    return results;
}
