export interface Edge {
	x: number;
	y: number;
	isWall: boolean;
	isStart: boolean;
	isVisited: boolean;
	isEnd: boolean;
	isPath: boolean;
	prev: Edge | null;
	weight: number;
}

export class PriorityQueue {
	constructor(public heap: { vtx: Edge; priority: number }[] = []) {}

	enqueue(vtx: Edge, priority: number) {
		this.heap.push({ vtx, priority });

		// Bubble Up
		this.bubbleUp(this.heap.length - 1);
	}

	dequeue() {
		// save the first and last element of the array
		const dequeued = this.heap[0];
		const lastElem = this.heap.pop();

		if (!lastElem) return;

		// swap the last index of the heap array to
		// the first index
		if (this.heap.length !== 0) {
			this.heap[0] = lastElem;

			// bubble down the first index
			this.bubbleDown(0);
		}

		return dequeued;
	}

	bubbleUp(idx: number) {
		const parentIdx = Math.floor((idx - 1) / 2);

		const parent = this.heap[parentIdx];
		const current = this.heap[idx];

		if (!parent) return;

		if (current.priority < parent.priority) {
			this.heap[parentIdx] = current;
			this.heap[idx] = parent;
			this.bubbleUp(parentIdx);
		}
	}

	bubbleDown(idx: number) {
		const parent = this.heap[idx];

		const leftChildIdx = 2 * idx + 1;
		const leftChild = this.heap[leftChildIdx];

		const rightChildIdx = 2 * idx + 2;
		const rightChild = this.heap[rightChildIdx];

		// if there is no children of the current parent
		if (!leftChild && !rightChild) return;

		if (
			rightChild &&
			leftChild.priority < parent.priority &&
			leftChild.priority < rightChild.priority
		) {
			swapLeft(this);
		} else if (
			rightChild &&
			rightChild.priority < parent.priority &&
			rightChild.priority < leftChild.priority
		) {
			swapRight(this);
		} else if (leftChild.priority < parent.priority) {
			swapLeft(this);
		}

		function swapLeft(ctx: PriorityQueue) {
			ctx.heap[idx] = leftChild;
			ctx.heap[leftChildIdx] = parent;
			ctx.bubbleDown(leftChildIdx);
		}

		function swapRight(ctx: PriorityQueue) {
			ctx.heap[idx] = rightChild;
			ctx.heap[rightChildIdx] = parent;
			ctx.bubbleDown(rightChildIdx);
		}
	}
}
