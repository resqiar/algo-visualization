<script lang="ts">
	import { BIGO_TITLE } from '../../../data/bigOData';

	export let changeActiveAlgo: (activeTitle: string) => void;
	export let activeTitle: string;
</script>

<div class="flex justify-center gap-4">
	<!-- First algorithm -->
	<button
		on:click={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_LOOP)}
		class="btn flex gap-2 {activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP
			? 'btn-primary'
			: undefined}"
	>
		<div class="h-3 w-3 bg-yellow-500" />
		AddUpTo - O(n)</button
	>

	<!-- Second algorithm -->
	<button
		on:click={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_MATH)}
		class="btn flex gap-2 {activeTitle === BIGO_TITLE.ADD_UP_TO_MATH
			? 'btn-primary'
			: undefined}"
	>
		<div class="h-3 w-3 bg-red-500" />
		AddUpTo - O(1)</button
	>

	<!-- Third algorithm -->
	<button
		on:click={() => changeActiveAlgo(BIGO_TITLE.ARRAY_OF_PAIRS)}
		class="btn flex gap-2 {activeTitle === BIGO_TITLE.ARRAY_OF_PAIRS
			? 'btn-primary'
			: undefined}"
	>
		<div class="h-3 w-3 bg-purple-500" />
		<p>
			Array of Pairs - O(n<sup>2</sup>)
		</p>
	</button>

	<!-- Fourth algorithm -->
	<button
		on:click={() => changeActiveAlgo(BIGO_TITLE.FACTORIAL)}
		class="btn flex gap-2 {activeTitle === BIGO_TITLE.FACTORIAL ? 'btn-primary' : undefined}"
	>
		<div class="h-3 w-3 bg-orange-500" />
		<p>Factorial - O(n!)</p>
	</button>
</div>
