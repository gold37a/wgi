import { PREFIX } from '$lib/constants';
import { remote } from '$lib/util/embedding/remote';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { sanitize_string } from '$lib/util/sanitize';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, params }) => {
    try {
        const id = PREFIX.concat(params.id)
        if (!await client.exists(id)) throw error(404, 'Group not found in database')
        await client.json.del(id)
        return new Response()
    } catch (e) {
        throw handle_server_error(request, e)
    }
}

export const GET: RequestHandler = async ({ request, params }) => {
	try {
		const id = PREFIX.concat(params.id);
		if (!(await client.exists(id))) throw error(404, 'Group not found in database');
		const res = await client.json.get(id);
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};

export const PUT: RequestHandler = async ({ request, params, locals }) => {
    try {
        // if (!params.id) TODO!
		const user = (await locals.getSession())?.user;
		if (!user) throw error(401);
		let { t, h } = await request.json();
		t = sanitize_string(t);
		h = sanitize_string(h);
		await client.json.set(PREFIX.concat(params.id), { v: await remote(t), h, u: user.id });
		return new Response();
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
