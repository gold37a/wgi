import { parentPort } from 'worker_threads';
import { to_html } from '$lib/util/markdown/parse';

parentPort?.on('message', (text) => {
	parentPort?.postMessage(to_html(text));
});
