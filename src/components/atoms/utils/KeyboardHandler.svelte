<script lang="ts">
	export let triggerSave: () => void;
	export let triggerLoad: () => void;
	export let triggerStart: () => void;
	export let triggerEnd: () => void;
	export let triggerPlay: () => void;
	export let triggerClear: () => void;
	export let triggerReset: () => void;
	export let triggerRandomize: () => void;

	function handleKeyboard(e: KeyboardEvent) {
		// Trigger Save
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault();
			triggerSave();
		}

		// Trigger Load
		if (e.ctrlKey && e.key === 'l') {
			e.preventDefault();
			triggerLoad();
		}

		// Trigger Start
		if (e.altKey && e.key === 's') {
			e.preventDefault();
			triggerStart();
		}

		// Trigger End
		if (e.altKey && e.key === 'e') {
			e.preventDefault();
			triggerEnd();
		}

		// Trigger Play
		if (e.ctrlKey && e.key === ' ') {
			e.preventDefault();
			triggerPlay();
		}

		// Trigger Clear
		if (e.key === 'Delete') {
			e.preventDefault();
			triggerClear();
		}

		// Trigger Clear
		if (e.shiftKey && e.key === 'Delete') {
			e.preventDefault();
			triggerReset();
		}

		// Trigger Randomize
		if (e.altKey && e.key === 'r') {
			e.preventDefault();
			triggerRandomize();
		}
	}
</script>

<svelte:window on:keydown={handleKeyboard} />
