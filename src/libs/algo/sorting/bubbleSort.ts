import { sortData, timeout } from '../../../stores/sortStore';
import { swap } from './swap';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export function bubbleSort(DELAY: number) {
	for (let i = data.length - 1; i >= 0; i--) {
		const id: ReturnType<typeof setTimeout> = setTimeout(() => {
			for (let j = 0; j < i; j++) {
				const current = data[j];
				const next = data[j + 1];

				if (current > next) {
					swap(j, j + 1);
				}
			}
		}, (data.length - i) * DELAY);

		// push setTimeout id into an array,
		// this way we can clear the timeout later if user stop.
		timeout.update((arr) => {
			arr.push(id);
			return arr;
		});
	}
}
