import { swap } from './swap';
import { sortData } from '../../../stores/sortStore';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export async function quickSort(startIdx: number = 0, endIdx: number = data.length - 1) {
	if (startIdx < endIdx) {
		const mid = await pivot(startIdx, endIdx);
		// sort left side
		quickSort(startIdx, mid);
		// sort right side
		quickSort(mid + 1, endIdx);
	}

	return data;
}

async function pivot(startIdx: number, endIdx: number) {
	let captainIdx = startIdx;
	let scouterIdx = captainIdx + 1;
	let lessIdx = startIdx;

	while (scouterIdx <= endIdx) {
		if (data[scouterIdx] < data[captainIdx]) {
			// increment less idx first
			lessIdx++;
			// swap scouter with less
			swap(scouterIdx, lessIdx);
			// await for 1 ms
			await new Promise((resolve) => setTimeout(resolve, 1));
		}

		scouterIdx++;
	}

	// swap the captain with less
	swap(captainIdx, lessIdx);

	// await for DELAY
	await new Promise((resolve) => setTimeout(resolve, 50));

	return lessIdx;
}
