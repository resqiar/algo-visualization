import type { Edge } from './priorityQueue';

export class Node {
	constructor(
		public value: Edge,
		public next: Node | null = null,
		public prev: Node | null = null
	) {}
}

export class Queue {
	private head: Node | null;
	private tail: Node | null;
	public length: number;

	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	enqueue(value: Edge) {
		const newNode = new Node(value);

		if (!this.length) {
			this.head = newNode;
			this.tail = newNode;
			this.length++;
			return;
		}

		const current = this.tail;
		current!.next = newNode;
		newNode.prev = current;

		this.tail = newNode;
		this.length++;
	}

	dequeue() {
		if (!this.length) return null;
		if (this.length === 1) {
			const current = this.head;

			this.head == null;
			this.tail == null;
			this.length--;

			return current!.value;
		}

		const current = this.head;

		this.head = current!.next;
		this.length--;

		return current!.value;
	}
}
