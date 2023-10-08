import { to_html } from '$lib/util/markdown/parse';

onmessage = (e) => {
	postMessage(to_html(e.data));
};
