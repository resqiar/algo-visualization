<script lang="ts">
	import { BIGO_TITLE, bigOFunction } from '../../data/functionData';
	import atomOneDark from 'svelte-highlight/styles/github-dark';
	import Highlighter from '../atoms/utils/Highlighter.svelte';
	import PlotInput from '../atoms/input/PlotInput.svelte';

	// The title of the choosen algorithm
	// this variable has a responsibility
	// to keep track of the algorithm that
	// user had already choose.
	let activeTitle: string = BIGO_TITLE.ADD_UP_TO_LOOP;

	// Change active algorithm throught this fn
	function changeActiveAlgo(n: string) {
		return (activeTitle = n);
	}

	// Side effect for updated code
	// this active code will be passed to
	// Highlighter atom-component.
	$: activeCode = bigOFunction.filter((v) => v.title === activeTitle)[0];
</script>

<svelte:head>
	<!-- HIGHLIGHT JS SNYTAX HIGHLIGHTING-->
	{@html atomOneDark}
</svelte:head>

<section class="flex w-full items-center justify-center py-8">
	<div class="flex justify-center gap-4">
		<!-- First algorithm -->
		<button
			on:click={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_LOOP)}
			class="btn {activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP ? 'btn-primary' : undefined}"
			>AddUpTo (Loop)</button
		>

		<!-- Second algorithm -->
		<button
			on:click={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_MATH)}
			class="btn {activeTitle === BIGO_TITLE.ADD_UP_TO_MATH ? 'btn-primary' : undefined}"
			>AddUpTo (Math)</button
		>
	</div>

	<!-- Divider horizontal -->
	<div class="divider divider-horizontal" />

	<div>
		<!-- Plot N Input -->
		<PlotInput placeholder="input desired 'n'" />
	</div>
</section>

<section class="my-8 mx-10 flex justify-between gap-8">
	<!-- CODE HIGHLIGHTING -->
	<div class="flex-1">
		<div id="code-preview" class="mockup-code w-full">
			<Highlighter code={activeCode.code} />
		</div>
	</div>

	<!-- CHART -->
	<div class="flex-1">lorem</div>
</section>
