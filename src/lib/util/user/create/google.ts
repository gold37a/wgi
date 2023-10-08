import { client } from '$lib/util/redis';
import { EscapedEmail } from '$lib/types';
import { user_id_prefix, user_index } from '$lib/constants';
import type { SignInArg } from '.';
import { embed_user } from '../embed_user';

const new_user = async (arg: SignInArg, email: EscapedEmail, v: number[]): Promise<void> => {
	const id = user_id_prefix.concat('google').concat((await client.incr('last_user_id')).toString());
	await client.json.set(id, '$', {
		email: email.value,
		name: arg.profile?.name as string,
		provider: arg.account?.provider as string,
		v
	});
};

export const google = async (arg: SignInArg): Promise<void> => {
	const email = new EscapedEmail(arg.profile?.email as string);
	const res = await client.ft.search(user_index, `@email:"${email.value}"`);
	if (!res.total) {
		new_user(arg, email, await embed_user({ name: arg.profile?.name as string }));
		return;
	} else {
		await client.json.set(res.documents[0].id, '$.provider', arg.account?.provider as string);
	}
};
