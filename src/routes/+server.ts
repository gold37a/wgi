import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {search} from "@edge37/redis-utils"
import { client } from "$lib/util/redis";
import { remote } from "$lib/util/embedding/remote";
import {index} from "$lib/constants"
import { handle_server_error } from "$lib/util/handle_server_error";

export const GET: RequestHandler = async ({request, url}) => {
    try {
        const q = url.searchParams.get('q') ?? '';
        return json(await search(client, {RETURN: ['n'],index, B: await remote(q, true)}))
    } catch (e) {
        handle_server_error(request, e)
    }
}