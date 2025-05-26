module.exports = {

"[externals]/postcss [external] (postcss, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("postcss", () => require("postcss"));

module.exports = mod;
}}),
"[externals]/postcss/lib/comment [external] (postcss/lib/comment, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("postcss/lib/comment", () => require("postcss/lib/comment"));

module.exports = mod;
}}),
"[externals]/postcss/lib/parser [external] (postcss/lib/parser, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("postcss/lib/parser", () => require("postcss/lib/parser"));

module.exports = mod;
}}),
"[externals]/postcss/lib/tokenize [external] (postcss/lib/tokenize, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("postcss/lib/tokenize", () => require("postcss/lib/tokenize"));

module.exports = mod;
}}),
"[project]/node_modules/postcss-safe-parser/lib/safe-parser.js [app-route] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
let Comment = __turbopack_context__.r("[externals]/postcss/lib/comment [external] (postcss/lib/comment, cjs)");
let Parser = __turbopack_context__.r("[externals]/postcss/lib/parser [external] (postcss/lib/parser, cjs)");
let tokenizer = __turbopack_context__.r("[externals]/postcss/lib/tokenize [external] (postcss/lib/tokenize, cjs)");
class SafeParser extends Parser {
    checkMissedSemicolon() {}
    comment(token) {
        let node = new Comment();
        this.init(node, token[2]);
        let pos = this.input.fromOffset(token[3]) || this.input.fromOffset(this.input.css.length - 1);
        node.source.end = {
            column: pos.col,
            line: pos.line,
            offset: token[3] + 1
        };
        let text = token[1].slice(2);
        if (text.slice(-2) === '*/') text = text.slice(0, -2);
        if (/^\s*$/.test(text)) {
            node.text = '';
            node.raws.left = text;
            node.raws.right = '';
        } else {
            let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
            node.text = match[2];
            node.raws.left = match[1];
            node.raws.right = match[3];
        }
    }
    createTokenizer() {
        this.tokenizer = tokenizer(this.input, {
            ignoreErrors: true
        });
    }
    decl(tokens) {
        if (tokens.length > 1 && tokens.some((i)=>i[0] === 'word')) {
            super.decl(tokens);
        }
    }
    doubleColon() {}
    endFile() {
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
        while(this.current.parent){
            this.current = this.current.parent;
            this.current.raws.after = '';
        }
        this.root.source.end = this.getPosition(this.tokenizer.position());
    }
    precheckMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false) return;
        let nextStart, prevEnd;
        for(nextStart = colon - 1; nextStart >= 0; nextStart--){
            if (tokens[nextStart][0] === 'word') break;
        }
        if (nextStart === 0 || nextStart < 0) return;
        for(prevEnd = nextStart - 1; prevEnd >= 0; prevEnd--){
            if (tokens[prevEnd][0] !== 'space') {
                prevEnd += 1;
                break;
            }
        }
        let other = tokens.slice(nextStart);
        let spaces = tokens.slice(prevEnd, nextStart);
        tokens.splice(prevEnd, tokens.length - prevEnd);
        this.spaces = spaces.map((i)=>i[1]).join('');
        this.decl(other);
    }
    unclosedBracket() {}
    unexpectedClose() {
        this.current.raws.after += '}';
    }
    unknownWord(tokens) {
        this.spaces += tokens.map((i)=>i[1]).join('');
    }
    unnamedAtrule(node) {
        node.name = '';
    }
}
module.exports = SafeParser;
}}),
"[project]/node_modules/postcss-safe-parser/lib/safe-parse.js [app-route] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
let { Input } = __turbopack_context__.r("[externals]/postcss [external] (postcss, cjs)");
let SafeParser = __turbopack_context__.r("[project]/node_modules/postcss-safe-parser/lib/safe-parser.js [app-route] (ecmascript)");
module.exports = function safeParse(css, opts) {
    let input = new Input(css, opts);
    let parser = new SafeParser(input);
    parser.parse();
    return parser.root;
};
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__12769258._.js.map