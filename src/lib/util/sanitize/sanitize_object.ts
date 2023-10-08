import { is_object } from '$lib/util/is_object';
import pkg from 'isomorphic-dompurify';
const { sanitize } = pkg;

export const sanitize_object = (object: { [index: string]: unknown }) => {
	for (const [key, value] of Object.entries(object)) {
		if (typeof value === 'string') {
			object[key] = sanitize(value);
		} else if (is_object(value)) {
			object[key] = sanitize_object(value);
		} else {
			return object;
		}
	}
	return object;
};
