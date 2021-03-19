import { getVersionFromPath } from "../src/utils";

test("get version from path", async () => {
    expect(
        getVersionFromPath(`${__dirname}/fixtures/mysetup.py`, "utf-8")
    ).toBe("2.3.4a5");
    expect(
        getVersionFromPath(`${__dirname}/fixtures/__version__.py`, "utf-8")
    ).toBe("2.3.4a5");
    expect(
        getVersionFromPath(`${__dirname}/fixtures/mypyproject.toml`, "utf-8")
    ).toBe("2.3.4a5");
    expect(
        getVersionFromPath(`${__dirname}/fixtures/mysetup.cfg`, "utf-8")
    ).toBe("2.3.4a5");
    expect(
        getVersionFromPath(`${__dirname}/fixtures/mypackage.json`, "utf-8")
    ).toBe("1.2.3-alpha.5");
    expect(
        getVersionFromPath(`${__dirname}/fixtures/version.txt`, "utf-8")
    ).toBe("1.2.3a5");
});
