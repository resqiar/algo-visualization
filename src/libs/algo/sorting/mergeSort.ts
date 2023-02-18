import { sortData } from '../../../stores/sortStore';

let data: number[];

sortData.subscribe((value) => {
	data = value;
});

export async function mergeSort(startIdx: number, endIdx: number, DELAY: number) {
	if (startIdx >= endIdx) return;

	// get the mid point of the current subsequent call
	const midIdx = Math.floor((startIdx + endIdx) / 2);

	// recursively call the left divided array (start -> mid)
	await mergeSort(startIdx, midIdx, DELAY);

	// recursively call the right divided array (mid + 1 -> end)
	await mergeSort(midIdx + 1, endIdx, DELAY);

	// define a temporary array to hold the array
	const temp: number[] = [];

	let leftPointer = startIdx;
	let rightPointer = midIdx + 1;

	/**
	 * loop as long as left side not overlapping mid point,
	 * and as long as right side not overlapping end point.
	 **/
	while (leftPointer <= midIdx && rightPointer <= endIdx) {
		/**
		 * if current left side array is less than right side array,
		 * push the current pointer value of left to temp.
		 **/
		if (data[leftPointer] < data[rightPointer]) {
			temp.push(data[leftPointer]);
			leftPointer++;
		} else {
		/**
		 * else if current left side array is bigger than right side array,
		 * push the current pointer value of right to temp.
		 **/
			temp.push(data[rightPointer]);
			rightPointer++;
		}
	}

	// If there are leftovers, just push the remaining
	while (leftPointer <= midIdx) {
		temp.push(data[leftPointer]);
		leftPointer++;
	}

	// If there are leftovers, just push the remaining
	while (rightPointer <= endIdx) {
		temp.push(data[rightPointer]);
		rightPointer++;
	}

	let tempPointer = 0;

	// loop from start to end of current subsequent call array
	for (let i = startIdx; i <= endIdx; i++) {
		// update the original array with the result from temp
		sortData.update((arr) => {
			arr[i] = temp[tempPointer];
			return arr;
		});
		tempPointer++;
	}

	// Give a delay but dont do it async-ly, wait until done
	await new Promise((resolve) => setTimeout(resolve, DELAY));
}
