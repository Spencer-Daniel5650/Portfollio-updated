# dynamic_array.py
# Name: Daniel Spencer
# OSU Email: spenced3@oregonstate.edu
# Course: CS261 - Data Structures
# Assignment: A2 Dynamic Array
# Due Date: Oct 29 2024
# Description: Dynamic array with methods for adding, removing, resizing, and accessing elements.

from static_array import StaticArray


class DynamicArrayException(Exception):
    """
    Custom exception class to be used by Dynamic Array
    DO NOT CHANGE THIS CLASS IN ANY WAY
    """
    pass


class DynamicArray:
    def __init__(self, start_array=None):
        """
        Initialize new dynamic array
        """
        self._size = 0
        self._capacity = 4
        self._data = StaticArray(self._capacity)

        if start_array is not None:
            for value in start_array:
                self.append(value)

    def __str__(self) -> str:
        """
        Return content of dynamic array in human-readable form
        """
        out = "DYN_ARR Size/Cap: "
        out += str(self._size) + "/" + str(self._capacity) + ' ['
        out += ', '.join([str(self._data[_]) for _ in range(self._size)])
        return out + ']'

    def __iter__(self):
        """
        Create iterator for loop
        """
        self._index = 0
        return self

    def __next__(self):
        """
        Obtain next value and advance iterator
        """
        if self._index >= self._size:
            raise StopIteration
        value = self[self._index]
        self._index += 1
        return value

    def get_at_index(self, index: int) -> object:
        """
        Get element at index
        """
        if index < 0 or index >= self._size:
            raise DynamicArrayException("Index out of bounds")
        return self._data[index]

    def set_at_index(self, index: int, value: object) -> None:
        """
        Set value at index
        """
        if index < 0 or index >= self._size:
            raise DynamicArrayException("Index out of bounds")
        self._data[index] = value

    def __getitem__(self, index) -> object:
        """
        Get item at index with array[index] syntax
        """
        return self.get_at_index(index)

    def __setitem__(self, index, value) -> None:
        """
        Set item at index with array[index] syntax
        """
        self.set_at_index(index, value)

    def is_empty(self) -> bool:
        """
        Check if array is empty
        """
        return self._size == 0

    def length(self) -> int:
        """
        Get the length of the array
        """
        return self._size

    def get_capacity(self) -> int:
        """
        Get the capacity of the array
        """
        return self._capacity

    def print_da_variables(self) -> None:
        """
        Print internal variables for testing
        """
        print(f"Length: {self._size}, Capacity: {self._capacity}, {self._data}")

    def resize(self, new_capacity: int) -> None:
        """
        Resize array to new capacity
        """
        if new_capacity <= 0 or new_capacity < self._size:
            return
        new_data = StaticArray(new_capacity)
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity

    def append(self, value: object) -> None:
        """
        Add element to the end of the array
        """
        if self._size == self._capacity:
            self.resize(self._capacity * 2)
        self._data[self._size] = value
        self._size += 1

    def pop(self) -> object:
        """
        Remove and return the last element of the array.
        Raises an exception if the array is empty.
        """
        if self._size == 0:
            raise DynamicArrayException("Cannot pop from an empty array")

        value = self._data[self._size - 1]
        self._data[self._size - 1] = None  # Clear the reference
        self._size -= 1

        # Resize if necessary: Only reduce capacity if greater than 10
        if self._size < self._capacity // 4 and self._capacity > 10:
            new_capacity = max(10, self._size * 2)
            self.resize(new_capacity)

        return value

    def swap(self, index1: int, index2: int) -> None:
        """
        Swap two elements at the specified indices.
        """
        if index1 < 0 or index1 >= self.length() or index2 < 0 or index2 >= self.length():
            raise DynamicArrayException("Index out of bounds")
        self[index1], self[index2] = self[index2], self[index1]

    def insert_at_index(self, index: int, value: object) -> None:
        """
        Insert element at specific index
        """
        if index < 0 or index > self._size:
            raise DynamicArrayException("Index out of bounds")
        if self._size == self._capacity:
            self.resize(self._capacity * 2)
        for i in range(self._size, index, -1):
            self._data[i] = self._data[i - 1]
        self._data[index] = value
        self._size += 1

    def remove_at_index(self, index: int) -> None:
        """
        Remove element at specific index
        """
        if index < 0 or index >= self._size:
            raise DynamicArrayException("Index out of bounds")

        # Shift elements left to fill the gap
        for i in range(index, self._size - 1):
            self._data[i] = self._data[i + 1]

        # Clear the last element and decrease size
        self._data[self._size - 1] = None
        self._size -= 1

        # Resize if necessary: Only reduce capacity if greater than 10
        if self._size < self._capacity // 4 and self._capacity > 10:
            new_capacity = max(10, self._size * 2)
            self.resize(new_capacity)

    def slice(self, start_index: int, size: int) -> "DynamicArray":
        """
        Return a slice of the array from start_index of given size
        """
        if start_index < 0 or size < 0 or start_index + size > self._size:
            raise DynamicArrayException("Invalid start index or size for slicing")

        result = DynamicArray()
        for i in range(start_index, start_index + size):
            result.append(self._data[i])
        return result

    def map(self, map_func) -> "DynamicArray":
        """
        Apply map_func to each element and return new DynamicArray
        """
        result = DynamicArray()
        for i in range(self._size):
            result.append(map_func(self._data[i]))
        return result

    def filter(self, filter_func) -> "DynamicArray":
        """
        Filter elements by filter_func and return new DynamicArray
        """
        result = DynamicArray()
        for i in range(self._size):
            if filter_func(self._data[i]):
                result.append(self._data[i])
        return result

    def reduce(self, reduce_func, initializer=None) -> object:
        """
        Reduce elements by reduce_func, starting with initializer if present
        """
        if self._size == 0:
            return initializer
        result = self._data[0] if initializer is None else initializer
        start_index = 1 if initializer is None else 0
        for i in range(start_index, self._size):
            result = reduce_func(result, self._data[i])
        return result
