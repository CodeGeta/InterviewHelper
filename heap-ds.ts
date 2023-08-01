interface IHeap<T> {
  insert(value: T): void;
  extractTop(): T | undefined;
  peek(): T | undefined;
  size(): number;
  isEmpty(): boolean;
}


class Heap<T> implements IHeap<T> {
  private heap: T[] = [];
  private compare: any;

  constructor(compare: any = (a, b) => a - b ) {
    this.compare = compare;
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  private heapifyUp(): void {
    let currentIndex = this.heap.length - 1;
    while (this.hasParent(currentIndex) && this.compare(this.heap[currentIndex], this.heap[this.getParentIndex(currentIndex)]) < 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  private heapifyDown(): void {
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let smallestChildIndex = this.getLeftChildIndex(currentIndex);
      if (this.hasRightChild(currentIndex) && this.compare(this.heap[this.getRightChildIndex(currentIndex)], this.heap[smallestChildIndex]) < 0) {
        smallestChildIndex = this.getRightChildIndex(currentIndex);
      }

      if (this.compare(this.heap[currentIndex], this.heap[smallestChildIndex]) < 0) {
        break;
      }

      this.swap(currentIndex, smallestChildIndex);
      currentIndex = smallestChildIndex;
    }
  }

  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractTop(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const topValue = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();

    return topValue;
  }

  peek(): T | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
 
