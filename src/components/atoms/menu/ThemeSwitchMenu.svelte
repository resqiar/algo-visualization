<script lang="ts">
	import { themeDark, themeLight } from '../../../data/theme';
</script>

<div class="dropdown-end dropdown">
	<label tabindex="-1" class="btn btn-ghost m-1 flex gap-1" for="theme-change-menu">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
				clip-rule="evenodd"
			/>
		</svg>

		<p class="normal-case">Theme</p>
	</label>

	<ul
		id="theme-change-menu"
		class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow-xl"
	>
		{#each themeLight as value}
			<li>
				<button data-set-theme={value.toLowerCase()} data-act-class="ACTIVECLASS">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>

					<p>{value}</p>
				</button>
			</li>
		{/each}

		{#each themeDark as value}
			<li>
				<button data-set-theme={value.toLowerCase()} data-act-class="ACTIVECLASS">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>

					<p>{value}</p>
				</button>
			</li>
		{/each}
	</ul>
</div>
