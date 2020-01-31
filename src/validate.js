"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const core = __importStar(require("@actions/core"));
const shell_1 = require("./shell");
async function validateInstallation(installed) {
    try {
        const s = await fs_1.promises.stat(installed.bin);
        if (!s.isDirectory()) {
            throw new Error(`Validation failed! '${installed.bin}' is not a directory for executable`);
        }
    }
    catch (err) {
        throw new Error(`Validation failed! Could not stat installed directory '${installed.bin}': ${err.message}`);
    }
    core.debug(`Installed directory '${installed.bin}' was validated`);
    const fullPath = path_1.join(installed.bin, installed.executable);
    try {
        const ver = await shell_1.exec(fullPath, ['--version']);
        console.log(`Installed version:\n${ver}`);
    }
    catch (err) {
        throw new Error(`Validation failed! Could not get version from executable '${fullPath}': ${err.message}`);
    }
    core.debug(`Installed executable '${fullPath}' was validated`);
}
exports.validateInstallation = validateInstallation;
//# sourceMappingURL=validate.js.map