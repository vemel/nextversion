interface Version {
    epoch: number;
    release: [number, number, number];
    pre: [string, number] | null;
    post: number | null;
    dev: number | null;
    local: string | null;
    public: string;
    base_version: string;
    is_prerelease: boolean;
    is_devrelease: boolean;
    is_postrelease: boolean;
}

declare module "@renovate/pep440" {
    function inc(
        input: string,
        release: string,
        preReleaseIdentifier?: string
    ): string;
    function explain(version: string): Version;
    function clean(version: string): string;
}
