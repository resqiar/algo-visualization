import { sortData, timeout } from '../../../stores/sortStore';
import { swap } from './swap';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export function insertionSort(DELAY: number) {
	for (let outerIdx = 1; outerIdx < data.length; outerIdx++) {
		// Temporary index for swapping
		let tempIdx = outerIdx;

		const id: ReturnType<typeof setTimeout> = setTimeout(() => {
			// Do inner loop as long as the index is not less than 0
			// and the inner value is bigger than temporary value.
			for (
				let innerIdx = tempIdx - 1;
				innerIdx >= 0 && data[innerIdx] > data[tempIdx];
				innerIdx--
			) {
				const inner = data[innerIdx];

				// if inner value is bigger than temporary value,
				// swap between the two and update the temp idx to inner idx.
				if (inner > data[tempIdx]) {
					swap(innerIdx, tempIdx);
					tempIdx = innerIdx;
				}
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
