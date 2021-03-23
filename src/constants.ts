export enum Inputs {
    Version = "version",
    VersionPath = "path",
    Type = "type",
    Prerelease = "prerelease",
    ReleaseType = "release",
    Result = "result",
    UpdatePath = "update",
    Encoding = "encoding"
}

export enum Outputs {
    Input = "input",
    RawInput = "raw-input",
    Major = "major",
    Minor = "minor",
    Patch = "patch",
    Micro = "micro",
    Prerelease = "prerelease",
    Result = "result"
}

export enum VersionType {
    PEP440 = "pep440",
    SemVer = "semver"
}
