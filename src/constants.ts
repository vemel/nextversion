export enum Inputs {
    Version = "version",
    VersionPath = "version-path",
    Type = "type",
    Prerelease = "prerelease",
    PrereleaseType = "prerelease-type",
    ReleaseType = "release-type",
    Result = "result",
    UpdatePath = "update-path",
    Encoding = "encoding",
    ReleaseNotes = "release-notes"
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
