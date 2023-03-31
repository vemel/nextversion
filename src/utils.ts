import fs from "fs";

const RE_SETUP_PY = /_*version_*\s*=\s*['"]+([^'"]+)['"]+/m;
const RE_SETUP_CFG = /^version\s*=\s*(\S+)/m;
const RE_PYPROJECT_TOML = /^version\s*=\s*['"]([^'"]+)['"]/m;

export function getVersionFromPath(
    path: string,
    encoding: BufferEncoding
): string {
    const data = fs.readFileSync(path, { encoding });
    if (path.toLowerCase().endsWith(".json")) {
        return JSON.parse(data).version;
    }
    if (path.toLowerCase().endsWith(".cfg")) {
        const match = data.match(RE_SETUP_CFG);
        if (!match) throw new Error(`Could not find version in ${path}`);
        return match[1];
    }
    if (path.toLowerCase().endsWith(".toml")) {
        const match = data.match(RE_PYPROJECT_TOML);
        if (!match) throw new Error(`Could not find version in ${path}`);
        return match[1];
    }
    if (path.toLowerCase().endsWith(".py")) {
        const match = data.match(RE_SETUP_PY);
        if (!match) throw new Error(`Could not find version in ${path}`);
        return match[1];
    }
    return data.split(/\r?\n/, 2)[0];
}
