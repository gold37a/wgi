<script lang="ts">
	import Edit from "$lib/Edit.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
</script>

<Edit {...data} n={data.n} t={data.t} id={data.id} />