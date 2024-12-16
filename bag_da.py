# bag_da.py
# Name:
# OSU Email:
# Course: CS261 - Data Structures
# Assignment:
# Due Date:
# Description:

from dynamic_array import *


class Bag:
    def __init__(self, start_bag=None):
        """
        make a new Bag, add elements if provided
        """
        self._da = DynamicArray()
        if start_bag is not None:
            for value in start_bag:
                self.add(value)

    def __str__(self) -> str:
        """
        show Bag content in readable format
        """
        out = "BAG: " + str(self._da.length()) + " elements. ["
        out += ', '.join([str(self._da.get_at_index(_)) for _ in range(self._da.length())])
        return out + ']'

    def size(self) -> int:
        """
        return number of items in Bag
        """
        return self._da.length()

    def add(self, value: object) -> None:
        """
        add item to Bag
        """
        self._da.append(value)

    def remove(self, value: object) -> bool:
        """
        remove first found item in Bag, return True if removed, False if not found
        """
        for i in range(self._da.length()):
            if self._da.get_at_index(i) == value:
                self._da.remove_at_index(i)
                return True
        return False

    def count(self, value: object) -> int:
        """
        count times an item appears in Bag
        """
        count = 0
        for i in range(self._da.length()):
            if self._da.get_at_index(i) == value:
                count += 1
        return count

    def clear(self) -> None:
        """
        remove all items from Bag
        """
        self._da = DynamicArray()

    def equal(self, second_bag: "Bag") -> bool:
        """
        check if two Bags have same items in any order
        """
        if self.size() != second_bag.size():
            return False
        for i in range(self._da.length()):
            if self.count(self._da.get_at_index(i)) != second_bag.count(self._da.get_at_index(i)):
                return False
        return True

    def __iter__(self):
        """
        start iterator for Bag
        """
        self._index = 0
        return self

    def __next__(self):
        """
        get next item in Bag for iterator
        """
        if self._index >= self._da.length():
            raise StopIteration
        value = self._da.get_at_index(self._index)
        self._index += 1
        return value
