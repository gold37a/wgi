import { user_index } from "$lib/constants";
import { float32_buffer } from "../float32_buffer";
import { search } from "../redis/search";
import { client } from "$lib/util/redis";

export const similar = async(id: string) => {const {
	'$.v': v_,
	'$.name': name_,
	'$.email': email_
}: { v_: number[][]; name_: string[]; email_: string[] } = await client.json.get(id, {
	path: ['$.v', '$.name', '$.email']
});
return {
	name: name_[0],
	id: id,
	d: (
		await search({
			index: user_index,
			page: 1,
			B: float32_buffer(v_[0]),
			options: { RETURN: ['name'] },
			query: `@email:-"${email_[0]}"`
		})
	).documents
};}