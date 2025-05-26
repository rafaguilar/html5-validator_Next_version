module.exports = {

"[project]/.next-internal/server/app/api/lint-css/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/lint-css/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"40c9fbf29df675a069224d5a69e637b84f3c1bbfcc":"POST"},"",""] */ __turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
async function POST(request) {
    const lintIssues = [];
    try {
        const stylelint = (await __turbopack_context__.r("[project]/node_modules/stylelint/lib/index.mjs [app-route] (ecmascript, async loader)")(__turbopack_context__.i)).default; // Dynamic import
        const { code, codeFilename: rawCodeFilename } = await request.json();
        if (!code || typeof code !== 'string') {
            return new Response(JSON.stringify({
                error: 'CSS code string is required.'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        const codeFilename = typeof rawCodeFilename === 'string' ? rawCodeFilename : rawCodeFilename ? String(rawCodeFilename) : undefined;
        const minimalConfig = {
            rules: {
                'color-no-invalid-hex': true
            }
        };
        let results;
        try {
            results = await stylelint.lint({
                code: code,
                codeFilename: codeFilename || 'temp.css',
                config: minimalConfig
            });
        } catch (lintError) {
            // This catch block is for critical errors during stylelint.lint() itself
            console.error(`Stylelint.lint() execution error for ${codeFilename || 'unknown file'}:`, lintError);
            let errMsg = 'A critical error occurred during CSS linting.';
            let errLine;
            let errCol;
            let errRule = 'stylelint-execution-error';
            if (lintError.name === 'CssSyntaxError' && lintError.reason) {
                errMsg = `CSS Syntax Error: ${lintError.reason}`;
                errLine = lintError.line;
                errCol = lintError.column;
                errRule = 'css-syntax-error';
            } else if (lintError.message) {
                errMsg = lintError.message;
            }
            lintIssues.push({
                id: `css-critical-lint-error-${Math.random().toString(36).substring(2, 9)}`,
                type: 'error',
                message: errMsg,
                line: errLine,
                column: errCol,
                rule: errRule,
                details: lintError.stack || String(lintError)
            });
            return new Response(JSON.stringify({
                issues: lintIssues
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        if (results.results && results.results.length > 0) {
            const fileResult = results.results[0];
            if (fileResult.parseErrors && fileResult.parseErrors.length > 0) {
                fileResult.parseErrors.forEach((parseError)=>{
                    let errMsg = 'Unknown CSS parse error';
                    if (parseError.reason) errMsg = parseError.reason;
                    else if (parseError.text) errMsg = parseError.text;
                    else if (parseError.message) errMsg = parseError.message;
                    lintIssues.push({
                        id: `css-parse-${Math.random().toString(36).substring(2, 9)}`,
                        type: 'error',
                        message: `CSS Parse Error: ${errMsg}`,
                        line: parseError.line,
                        column: parseError.column,
                        rule: 'css-syntax-error'
                    });
                });
            }
            fileResult.warnings.forEach((warning)=>{
                let message = warning.text;
                if (warning.rule === 'CssSyntaxError' && message.endsWith(` (${warning.rule})`)) {
                    message = message.substring(0, message.length - ` (${warning.rule})`.length);
                } else if (warning.rule && message.includes(`(${warning.rule})`)) {
                    message = message.replace(` (${warning.rule})`, '');
                }
                lintIssues.push({
                    id: `css-lint-${warning.line}-${warning.column}-${warning.rule || 'unknown'}`,
                    type: warning.severity === 'error' ? 'error' : 'warning',
                    message: message,
                    line: warning.line,
                    column: warning.column,
                    rule: warning.rule
                });
            });
        } else if (results.errored && (!results.results || results.results.length === 0)) {
            lintIssues.push({
                id: `css-global-error-${Math.random().toString(36).substring(2, 9)}`,
                type: 'error',
                message: results.output || 'A global Stylelint error occurred. The CSS might be empty or critically malformed.',
                rule: 'stylelint-global'
            });
        }
        return new Response(JSON.stringify({
            issues: lintIssues
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // This is the outermost catch, for truly unexpected server errors in the API handler itself.
        console.error('Critical error in /api/lint-css POST handler:', error);
        const criticalErrorIssue = {
            id: `css-critical-server-error-${Math.random().toString(36).substring(2, 9)}`,
            type: 'error',
            message: 'Failed to lint CSS due to a server-side exception.',
            details: error.message || String(error) || 'An unknown server error occurred.',
            rule: 'stylelint-server-exception'
        };
        return new Response(JSON.stringify({
            issues: [
                criticalErrorIssue
            ]
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    POST
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(POST, "40c9fbf29df675a069224d5a69e637b84f3c1bbfcc", null);
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6b392df9._.js.map