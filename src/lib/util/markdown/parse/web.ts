import { browser } from '$app/environment';
import { parse_timeout } from '.';

export const parse = (text: string, timeout_ms = parse_timeout): Promise<string> =>
	new Promise((resolve, reject) => {
		if (!browser) reject('not_browser');
		const worker = new Worker(new URL('$lib/util/markdown/parse/web_worker.js', import.meta.url), {
			type: "module"
		});
		worker.postMessage(text);
		const timeout = setTimeout(() => {
			worker.terminate();
			reject('timeout');
		}, timeout_ms);

		worker.onmessage = (e) => {
			clearTimeout(timeout);
			resolve(e.data);
			worker.terminate();
		};
	});
