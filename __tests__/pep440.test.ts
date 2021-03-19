import { bumpPrerelease, bumpRelease, getResults } from "../src/pep440";

test("bump prerelease", async () => {
    expect(bumpPrerelease("1.2.3", "premajor", "rc")).toBe("2.0.0rc1");
    expect(bumpPrerelease("1.2.3", "preminor", "rc")).toBe("1.3.0rc1");
    expect(bumpPrerelease("1.2.3", "prepatch", "rc")).toBe("1.2.4rc1");
    expect(bumpPrerelease("1.2.3", "prerelease", "rc")).toBe("1.2.4rc1");
    expect(bumpPrerelease("1.2.3rc3", "premajor", "rc")).toBe("2.0.0rc1");
    expect(bumpPrerelease("1.2.3rc3", "preminor", "rc")).toBe("1.3.0rc1");
    expect(bumpPrerelease("1.2.3rc3", "prepatch", "rc")).toBe("1.2.3rc4");
    expect(bumpPrerelease("1.2.3rc3", "prerelease", "rc")).toBe("1.2.3rc4");
    expect(bumpPrerelease("1.2.0rc3", "premajor", "rc")).toBe("2.0.0rc1");
    expect(bumpPrerelease("1.2.0rc3", "preminor", "rc")).toBe("1.2.0rc4");
    expect(bumpPrerelease("1.2.0rc3", "prepatch", "rc")).toBe("1.2.0rc4");
    expect(bumpPrerelease("1.0.0rc3", "premajor", "rc")).toBe("1.0.0rc4");
    expect(bumpPrerelease("1.0.0rc3", "preminor", "rc")).toBe("1.0.0rc4");
    expect(bumpPrerelease("1.0.0rc3", "prepatch", "rc")).toBe("1.0.0rc4");
});

test("bump release", async () => {
    expect(bumpRelease("1.2.3", "major", "rc")).toBe("2.0.0");
    expect(bumpRelease("1.2.3", "minor", "rc")).toBe("1.3.0");
    expect(bumpRelease("1.2.3", "patch", "rc")).toBe("1.2.4");
    expect(bumpRelease("1.2.3", "prerelease", "rc")).toBe("1.2.4rc1");
    expect(bumpRelease("1.2.3rc4", "major", "rc")).toBe("2.0.0");
    expect(bumpRelease("1.2.3rc4", "minor", "rc")).toBe("1.3.0");
    expect(bumpRelease("1.2.3rc4", "patch", "rc")).toBe("1.2.3");
    expect(bumpRelease("1.2.3rc4", "prerelease", "rc")).toBe("1.2.3rc5");
    expect(bumpRelease("1.2.0rc4", "major", "rc")).toBe("2.0.0");
    expect(bumpRelease("1.2.0rc4", "minor", "rc")).toBe("1.2.0");
    expect(bumpRelease("1.2.0rc4", "patch", "rc")).toBe("1.2.0");
    expect(bumpRelease("1.2.0rc4", "prerelease", "rc")).toBe("1.2.0rc5");
    expect(bumpRelease("1.0.0rc4", "major", "rc")).toBe("1.0.0");
    expect(bumpRelease("1.0.0rc4", "minor", "rc")).toBe("1.0.0");
    expect(bumpRelease("1.0.0rc4", "patch", "rc")).toBe("1.0.0");
    expect(bumpRelease("1.0.0rc4", "prerelease", "rc")).toBe("1.0.0rc5");
});

test("get results", async () => {
    expect(getResults("1.2.3", true, "rc", "micro")).toStrictEqual({
        input: "1.2.3",
        major: "2.0.0rc1",
        minor: "1.3.0rc1",
        patch: "1.2.4rc1",
        micro: "1.2.4rc1",
        prerelease: "1.2.4rc1",
        result: "1.2.4rc1"
    });
    expect(getResults("1.2.3", false, "rc", "3.4.5")).toStrictEqual({
        input: "1.2.3",
        major: "2.0.0",
        minor: "1.3.0",
        patch: "1.2.4",
        micro: "1.2.4",
        prerelease: "1.2.4rc1",
        result: "3.4.5"
    });
    expect(getResults("1.2.3.rc1", false, "rc", "input")).toStrictEqual({
        input: "1.2.3rc1",
        major: "2.0.0",
        minor: "1.3.0",
        patch: "1.2.3",
        micro: "1.2.3",
        prerelease: "1.2.3rc2",
        result: "1.2.3rc1"
    });
});
