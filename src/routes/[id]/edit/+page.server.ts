import { PREFIX } from '$lib/constants';
import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, params }) => {
	try {
		const id = PREFIX.concat(params.id);
		if (!(await client.exists(id))) throw error(404, 'Group not found in database');
		const { '$.n': n, '$.t': t } = await client.json.get(id, { path: ['n', 't'] });
		return { n, t, id: params.id };
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
