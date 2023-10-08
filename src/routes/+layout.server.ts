import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	try {
		return { session: await event.locals.getSession() };
	} catch {
		return {session: null}
	}
};
