import { swap } from './swap';
import { sortData } from '../../../stores/sortStore';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export async function quickSort(
	startIdx: number = 0,
	endIdx: number = data.length - 1,
	DELAY: number
) {
	if (startIdx < endIdx) {
		const mid = await pivot(startIdx, endIdx, DELAY);
		// sort left side
		quickSort(startIdx, mid, DELAY);
		// sort right side
		quickSort(mid + 1, endIdx, DELAY);
	}

	return data;
}

async function pivot(startIdx: number, endIdx: number, DELAY: number) {
	let captainIdx = startIdx;
	let scouterIdx = captainIdx + 1;
	let lessIdx = startIdx;

	while (scouterIdx <= endIdx) {
		if (data[scouterIdx] < data[captainIdx]) {
			// increment less idx first
			lessIdx++;
			// swap scouter with less
			swap(scouterIdx, lessIdx);
			// wait for DELAY / 2 ms
			await new Promise((resolve) => setTimeout(resolve, DELAY / 2));
		}

		scouterIdx++;
	}

	// swap the captain with less
	swap(captainIdx, lessIdx);

	// wait for FULL DELAY
	await new Promise((resolve) => setTimeout(resolve, DELAY));

	return lessIdx;
}
