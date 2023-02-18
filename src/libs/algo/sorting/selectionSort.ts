import { sortData, timeout } from '../../../stores/sortStore';
import { swap } from './swap';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export function selectionSort(DELAY: number) {
	for (let outerIdx = 0; outerIdx < data.length; outerIdx++) {
		const current = data[outerIdx];
		// set minimum value inside iterations
		let minIdx = outerIdx;

		const id: ReturnType<typeof setTimeout> = setTimeout(() => {
			for (let innerIdx = outerIdx + 1; innerIdx < data.length; innerIdx++) {
				const inner = data[innerIdx];

				// if the value of inner < current minimum value
				if (Math.min(inner, data[minIdx]) === inner) {
					// update the minimum index
					minIdx = innerIdx;
				}
			}

			// if minimum changes, meaning that there is a smaller
			// value inside the inner loop, then swap.
			if (data[minIdx] !== current) {
				swap(outerIdx, minIdx);
			}
		}, outerIdx * DELAY);

		// push setTimeout id into an array,
		// this way we can clear the timeout later if user stop.
		timeout.update((arr) => {
			arr.push(id);
			return arr;
		});
	}
}
