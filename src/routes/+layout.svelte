<script>
	// import Offline from '$lib/Offline.svelte'; - TODO
	// import OfflineHeaderUtility from '$lib/OfflineHeaderUtility.svelte';

	import { Layout, VercelAnalyticsInject } from 'sveltekit-carbon-utils';
</script>

<!-- <Offline /> -->
<VercelAnalyticsInject />
<Layout header_props={{ platformName: 'WhatsApp Group Index' }}>
	<svelte:fragment slot="header" />
	<!-- <svelte:fragment slot="header-utilities">
		<OfflineHeaderUtility />
	</svelte:fragment> -->
	<svelte:fragment slot="content-grid">
		<slot />
	</svelte:fragment>
</Layout>
