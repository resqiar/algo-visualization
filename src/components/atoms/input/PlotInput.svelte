<script lang="ts">
	export let placeholder: string = '';
	export let inputValue: number | null = null;
</script>

<div class="form-control w-full max-w-xs">
	<input
		type="number"
		id="plot-input"
		{placeholder}
		class="input input-bordered w-full max-w-xs"
		bind:value={inputValue}
		on:keyup
	/>
</div>
