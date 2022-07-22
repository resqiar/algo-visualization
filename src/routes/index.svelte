<script>
	import Meta from '../components/atoms/meta/Meta.svelte';
	import IndexDrawer from '../components/organisms/drawers/IndexDrawer.svelte';
	import IndexHeader from '../components/organisms/headers/IndexHeader.svelte';
	import IndexBody from '../components/templates/IndexBody.svelte';
</script>

<!-- META -->
<Meta />

<!-- DRAWER WRAPPER -->
<IndexDrawer>
	<!-- HEADER -->
	<IndexHeader />

	<!-- BODY -->
	<IndexBody />
</IndexDrawer>
