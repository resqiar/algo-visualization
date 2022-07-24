<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	// Code that will be Highlighted by the library
	export let code: string;
</script>

<Highlight language="{typescript}" {code} />
