import { ReleaseType } from "semver";
import { Results } from "./types";
export declare function bumpPrerelease(
    version: string,
    release: ReleaseType,
    preReleaseIdentifier: string
): string;
export declare function bumpRelease(
    version: string,
    release: ReleaseType,
    preReleaseIdentifier: string
): string;
export declare function bumpBuild(version: string): string;
export declare function getResults(
    version: string,
    outputPrerelease: boolean,
    prereleaseType: string,
    resultKey: string
): Results;
