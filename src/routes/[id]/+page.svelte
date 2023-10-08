<script lang='ts'>
	import Id from "$lib/Id.svelte";
	import type { PageData } from "./$types";

    export let data: PageData

</script>
<Id id={data.id} h={data.h} u={data.u} /> 