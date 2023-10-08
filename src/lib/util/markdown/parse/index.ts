import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import katex from 'marked-katex-extension';
import bidi from 'marked-bidi';
// import extended_tables from 'marked-extended-tables';
import { mangle } from 'marked-mangle';
import linkify_it from 'marked-linkify-it';
import admonition from 'marked-admonition-extension';
import hljs from 'highlight.js';

// export const marked = new Marked

export const parse_timeout = 12000;
export const options = { gfm: true, breaks: true };
export const extensions = [
	// extended_tables(),
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}),
	admonition,
	katex({
		throwOnError: false
	}),
	linkify_it({}, {}),
	mangle(),
	bidi(),options
];

marked.use(...extensions)

export const to_html = (text: string): string => {
	return marked.parse(
		text
		.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/u, '')
	);
};
