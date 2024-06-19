"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalsForSvelteScript = exports.getGlobalsForSvelte = exports.globalsForRunes = void 0;
const globalsForSvelte = ["$$slots", "$$props", "$$restProps"];
exports.globalsForRunes = [
    "$state",
    "$derived",
    "$effect",
    "$props",
    "$bindable",
    "$inspect",
    "$host",
];
function getGlobalsForSvelte(svelteParseContext) {
    if (svelteParseContext.runes) {
        return [...globalsForSvelte, ...exports.globalsForRunes];
    }
    return globalsForSvelte;
}
exports.getGlobalsForSvelte = getGlobalsForSvelte;
function getGlobalsForSvelteScript(svelteParseContext) {
    if (svelteParseContext.runes) {
        return exports.globalsForRunes;
    }
    return [];
}
exports.getGlobalsForSvelteScript = getGlobalsForSvelteScript;
