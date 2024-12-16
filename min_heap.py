# mini heap
# Name: Daniel Spencer
# OSU Email: spenced3@oregonstate.edu
# Course: CS261 - Data Structures
# Assignment: Assignment 5 mini_heap
# Due Date: Nov 25 2024
# Description:file implements a MinHeap data structure using a dynamic array, supporting various operations


from dynamic_array import DynamicArray


class MinHeapException(Exception):
    """
    Custom exception to be used by MinHeap class
    DO NOT CHANGE THIS CLASS IN ANY WAY
    """
    pass


class MinHeap:
    def __init__(self, start_heap=None):
        """
        Initialize a new MinHeap
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        self._heap = DynamicArray()

        # populate MinHeap with initial values (if provided)
        # before using this feature, implement add() method
        if start_heap:
            for node in start_heap:
                self.add(node)

    def __str__(self) -> str:
        """
        Return MinHeap content in human-readable form
        DO NOT CHANGE THIS METHOD IN ANY WAY
        """
        heap_data = [self._heap[i] for i in range(self._heap.length())]
        return "HEAP " + str(heap_data)

    def is_empty(self) -> bool:
        # Return True if the heap has no elements
        return self._heap.length() == 0

    def size(self) -> int:
        # Return the number of elements in the heap
        return self._heap.length()

    def clear(self) -> None:
        # Clear all elements from the heap
        self._heap = DynamicArray()

    def add(self, node: object) -> None:
        # Add a new object while maintaining heap property
        self._heap.append(node)
        current = self._heap.length() - 1
        parent = (current - 1) // 2

        while current > 0 and self._heap[current] < self._heap[parent]:
            self._heap.swap(current, parent)
            current = parent
            parent = (current - 1) // 2

    def get_min(self) -> object:
        # Return the smallest element without removing it
        if self.is_empty():
            raise MinHeapException("Heap is empty")
        return self._heap[0]

    def remove_min(self) -> object:
        # Remove and return the smallest element while maintaining heap property
        if self.is_empty():
            raise MinHeapException("Heap is empty")

        min_val = self._heap[0]
        last = self._heap[self._heap.length() - 1]
        self._heap[0] = last
        self._heap.pop()

        if not self.is_empty():
            self._percolate_down(0)

        return min_val

    def build_heap(self, da: DynamicArray) -> None:
        # Build a heap from a given DynamicArray
        self._heap = DynamicArray()
        for i in range(da.length()):
            self._heap.append(da[i])

        for index in range(self._heap.length() // 2 - 1, -1, -1):
            self._percolate_down(index)

    def _percolate_down(self, parent: int) -> None:
        # Helper method
        child = 2 * parent + 1
        while child < self._heap.length():
            # Determine smallest child
            right = child + 1
            if right < self._heap.length() and self._heap[right] < self._heap[child]:
                child = right

            # Compare parent with smallest child
            if self._heap[parent] <= self._heap[child]:
                break

            self._heap.swap(parent, child)
            parent = child
            child = 2 * parent + 1


def heapsort(da: DynamicArray) -> None:
    """
    Sort elements in non-ascending order using Heapsort
    """
    heap = MinHeap()
    heap.build_heap(da)
    for i in range(da.length() - 1, -1, -1):
        da[i] = heap.remove_min()
