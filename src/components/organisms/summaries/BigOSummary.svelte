<div>
	<h1 class="text-4xl font-bold">Big O Notation</h1>

	<p class="mt-4">
		<strong
			>Big O Notation is a formal way (or rather a mathematical way) to measure the execution
			behavior of an algorithm</strong
		>. Usually used to measure the relations between the size of input (n) and the runtime
		execution of a function f(n).
	</p>

	<br />

	<p>
		We say that and algorithm is O(f(n)) if the number of operations that the computer has to do
		is less than a constant times f(n).
	</p>

	<br />

	<p>Quite gibberish but that definition means that a function or an algorithm could be:</p>

	<div>
		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">1. Constant — O(1)</h2>
			<p>
				No matter how small or huge the input is, the output will stay constant. This is
				because the operations are independent and not affected by the input (n). If the
				number of operations are 3, then no matter the input whether it is 100, 1000, 100K,
				1M, or even 1B, the output will always constant to 3.
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">2. Logarithmic — O(log n)</h2>
			<p>
				Logarithm is a opposite operation of exponentiation. So O(log n) refers to a
				function (or algorithm, or step in an algorithm) working in an amount of time
				proportional to the logarithm of the size of the input. This type of Big O commonly
				used in a divide-and-conquer algorithm like binary search.
				<sup class="px-1 hover:underline">
					<a target="_blank" href="https://stackoverflow.com/a/2307332">Read More</a>
				</sup>
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">3. Linear — O(n)</h2>
			<p>
				Linear means a function with the input of (n) scales with the input, if the input
				grows larger, the output (execution time) grows as well.
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">4. Linearithmic — O(n log n)</h2>
			<p>
				Linearithmic time (O(n log n)) is the Muddy Mudskipper of time complexities—the
				worst of the best (although, less grizzled and duplicitous). It is a moderate
				complexity that floats around linear time (O(n)) until input reaches advanced size.
				It is slower than logarithmic time, but faster than the less favorable, less
				performant time complexities.
				<sup class="px-1 hover:underline">
					<a
						target="_blank"
						href="https://levelup.gitconnected.com/differentiating-logarithmic-and-linearithmic-time-complexity-976cd49c351b"
						>Read More</a
					>
				</sup>
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">5. Quadratic — O(n<sup>2</sup>)</h2>
			<p>
				Quadratic means that a function with the input of n squared related to the square of
				the input (n). If the input is 5, then the output is 5<sup>2</sup> = 25.
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">6. Exponential — O(2<sup>n</sup>)</h2>
			<p>
				The algorithm or a function with exponential characteristics will growth
				exponentiatially with the growth of n. The complexity starts very small, then rising
				exponentially until the last of the input.
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">7. Factorial — O(n!)</h2>
			<p>
				This is worst of the worst, and should be avoided. Remember when doing factorial in
				high school, 5! (5 factorial) is equal to 5 * 4 * 3 * 2 * 1 = 120.
			</p>
		</div>

		<div class="py-2">
			<h2 class="my-2 text-xl font-bold">
				8. Or could be something entirely different formula!
			</h2>
		</div>
	</div>
</div>
