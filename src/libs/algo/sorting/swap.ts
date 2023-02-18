import { sortData } from '../../../stores/sortStore';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export function swap(firstIdx: number, secondIdx: number) {
	const temp = data[firstIdx];

	sortData.update((arr) => {
		arr[firstIdx] = arr[secondIdx];
		arr[secondIdx] = temp;
		return arr;
	});
}
