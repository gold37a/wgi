<script lang="ts">
	import { OnEnter } from 'sveltekit-carbon-utils';
	import { parse } from '@edge37/util';
	import { notify } from 'sveltekit-carbon-utils';
	import { sanitize_object, sanitize_string } from '@edge37/util';
	import axios from 'axios';
	import {
		Button,
		ButtonSet,
		FluidForm,
		InlineLoading,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';
	import { link_prefix } from './constants';
	import { goto } from '$app/navigation';
	let link = '',
		t_invalid: boolean,
		t_invalid_text: string,
		edit_loading = false,
		delete_loading = false;

	export let n = '',
		t = '',
		id: string | undefined = undefined;

	const dispatch = createEventDispatcher<{ save: { link?: string; id?: string; h: string } }>();

	const del = async () => {
		if (!id || delete_loading) return;
		delete_loading = true;
		try {
			await axios.delete(`/${id}`);
			notify('Deleted');
			goto('/');
		} catch (e: any) {
			console.error('delete error', e);
			notify({
				kind: 'error',
				title: 'Delete error',
				subtitle: e.response.data.message ? e.response.data.message : undefined
			});
		}
		delete_loading = false;
	};

	const save = async () => {
		if (edit_loading) return;
		edit_loading = true;
		try {
			let id = link.split(link_prefix)[1];
			let payload = sanitize_object({ n, t });
			const html = await parse(payload.t as string);
			payload.h = sanitize_string(html);
			await axios.put(`/${id}`, payload);
			// dispatch('save', { id, h: payload.html });
			notify('Saved');
			goto(`/{$id}`);
		} catch (e: any) {
			console.error('save error', e);
			if (e === 'timeout') {
				t_invalid_text = 'Use less text';
				t_invalid = true;
			} else {
				notify({
					kind: 'error',
					title: 'Save error',
					subtitle: e.response.data.message ? e.response.data.message : e.toString() || undefined
				});
			}
		}
		edit_loading = false;
	};
</script>

<OnEnter ctrl on:enter={save} />

{#if id}
	<p>Edit description for Whatsapp group {link_prefix}{id}</p>
{/if}

<FluidForm>
	{#if !id}
		<TextInput labelText="link" bind:value={link} />
	{/if}
	<TextInput labelText="name" bind:value={n} />
	<TextArea
		rows={15}
		placeholder="Describe your group in detail, Use markdown if you want"
		invalid={t_invalid}
		invalidText={t_invalid_text}
		bind:value={t}
	/>
</FluidForm>
<ButtonSet stacked>
	<Button disabled={edit_loading} icon={edit_loading ? InlineLoading : Save} on:click={save}
		>Save</Button
	>
	<Button disabled={delete_loading} icon={delete_loading ? InlineLoading : TrashCan} on:click={del}
		>Delete Profile</Button
	>
</ButtonSet>
