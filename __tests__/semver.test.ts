import { bumpPrerelease, bumpRelease, getResults } from "../src/semver";

test("bump prerelease", async () => {
    expect(bumpPrerelease("1.2.3", "premajor", "rc")).toBe("2.0.0-rc.1");
    expect(bumpPrerelease("1.2.3", "preminor", "rc")).toBe("1.3.0-rc.1");
    expect(bumpPrerelease("1.2.3", "prepatch", "rc")).toBe("1.2.4-rc.1");
    expect(bumpPrerelease("1.2.3", "prerelease", "rc")).toBe("1.2.4-rc.1");
    expect(bumpPrerelease("1.2.3-rc.3", "premajor", "rc")).toBe("2.0.0-rc.1");
    expect(bumpPrerelease("1.2.3-rc.3", "preminor", "rc")).toBe("1.3.0-rc.1");
    expect(bumpPrerelease("1.2.3-rc.3", "prepatch", "rc")).toBe("1.2.3-rc.4");
    expect(bumpPrerelease("1.2.3-rc.3", "prerelease", "rc")).toBe("1.2.3-rc.4");
    expect(bumpPrerelease("1.2.0-rc.3", "premajor", "rc")).toBe("2.0.0-rc.1");
    expect(bumpPrerelease("1.2.0-rc.3", "preminor", "rc")).toBe("1.2.0-rc.4");
    expect(bumpPrerelease("1.2.0-rc.3", "prepatch", "rc")).toBe("1.2.0-rc.4");
    expect(bumpPrerelease("1.0.0-rc.3", "premajor", "rc")).toBe("1.0.0-rc.4");
    expect(bumpPrerelease("1.0.0-rc.3", "preminor", "rc")).toBe("1.0.0-rc.4");
    expect(bumpPrerelease("1.0.0-rc.3", "prepatch", "rc")).toBe("1.0.0-rc.4");
});

test("bump release", async () => {
    expect(bumpRelease("1.2.3", "major", "rc")).toBe("2.0.0");
    expect(bumpRelease("1.2.3", "minor", "rc")).toBe("1.3.0");
    expect(bumpRelease("1.2.3", "patch", "rc")).toBe("1.2.4");
    expect(bumpRelease("1.2.3", "prerelease", "rc")).toBe("1.2.4-rc.1");
    expect(bumpRelease("1.2.3-rc.4", "major", "rc")).toBe("2.0.0");
    expect(bumpRelease("1.2.3-rc.4", "minor", "rc")).toBe("1.3.0");
    expect(bumpRelease("1.2.3-rc.4", "patch", "rc")).toBe("1.2.3");
    expect(bumpRelease("1.2.3-rc.4", "prerelease", "rc")).toBe("1.2.3-rc.5");
    expect(bumpRelease("1.2.0-rc.4", "major", "rc")).toBe("2.0.0");
    expect(bumpRelease("1.2.0-rc.4", "minor", "rc")).toBe("1.2.0");
    expect(bumpRelease("1.2.0-rc.4", "patch", "rc")).toBe("1.2.0");
    expect(bumpRelease("1.2.0-rc.4", "prerelease", "rc")).toBe("1.2.0-rc.5");
    expect(bumpRelease("1.0.0-rc.4", "major", "rc")).toBe("1.0.0");
    expect(bumpRelease("1.0.0-rc.4", "minor", "rc")).toBe("1.0.0");
    expect(bumpRelease("1.0.0-rc.4", "patch", "rc")).toBe("1.0.0");
    expect(bumpRelease("1.0.0-rc.4", "prerelease", "rc")).toBe("1.0.0-rc.5");
});

test("get results", async () => {
    expect(getResults("1.2.3", true, "rc")).toStrictEqual({
        input: "1.2.3",
        major: "2.0.0-rc.1",
        minor: "1.3.0-rc.1",
        patch: "1.2.4-rc.1",
        prerelease: "1.2.4-rc.1"
    });
    expect(getResults("1.2.3", false, "rc")).toStrictEqual({
        input: "1.2.3",
        major: "2.0.0",
        minor: "1.3.0",
        patch: "1.2.4",
        prerelease: "1.2.4-rc.1"
    });
    expect(getResults("v1.2.3-rc.1", false, "rc")).toStrictEqual({
        input: "1.2.3-rc.1",
        major: "2.0.0",
        minor: "1.3.0",
        patch: "1.2.3",
        prerelease: "1.2.3-rc.2"
    });
});
