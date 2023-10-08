import { browser } from '$app/environment';
import pkg from 'isomorphic-dompurify';
const { sanitize } = pkg;
import dompurify from 'dompurify';
// import { JSDOM } from 'jsdom';

export const sanitize_string = (text: string): string => {
	if (browser) {
		return dompurify.sanitize(text);
	} else {
		return sanitize(text);
		// return DOMPurify(new JSDOM('').window).sanitize(text);
	}
};
