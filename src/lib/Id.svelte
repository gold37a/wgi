<script lang="ts">
	import { Column, Link, Row } from 'carbon-components-svelte';
	import { link_prefix } from './constants';
	import { page } from '$app/stores';

	export let id: string, h: string, u: string;
</script>

<Row>
	<Column>
		<div class="c">
			{#if u === $page.data.session?.user?.id}
				<Link href="/{id}/edit">Edit</Link>
			{/if}
			<h5>{link_prefix}{id}</h5>
			<div>
				{@html h}
			</div>
		</div>
	</Column>
</Row>

<style>
	.c {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}
</style>
