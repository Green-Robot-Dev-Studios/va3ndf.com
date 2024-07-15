---
title: Test for formatting
date: 1970-01-01
tags:
  - Test
---

# CS 240: Data Structures and Data Management
## Module 2: Priority Queues

### Instructors
- **Mark Petrick**
- **Éric Schost**

### Institution
- **David R. Cheriton School of Computer Science, University of Waterloo**
- **Term:** Spring 2024

### Outline
1. Priority Queues
2. Abstract Data Types (ADTs)
3. ADT Priority Queue
4. Binary Heaps
5. Binary Heaps as PQ realization
6. PQ-sort and heap-sort
7. Towards the Selection Problem

### Abstract Data Types (ADT) Review
- **Definition:** 
  An ADT is a description of:
  - **Information:** Data items.
  - **Operations:** Methods to manipulate data.
  The information is accessed only through these operations.
- **Realizations:** 
  - **Data Structures:** How information is stored.
  - **Algorithms:** How operations are performed.

### ADT Stack Review
- **Operations:**
  - `push`: Add an item to the stack.
  - `pop`: Remove and return the most recently added item.
  - Additional operations: `size`, `is-empty`, `top`
- **Characteristics:**
  - **LIFO (Last-In-First-Out):** The most recently added item is removed first.
  - **Realizations:** Arrays or linked lists, achieving constant time operations, except for resizing arrays.

### ADT Queue Review
- **Operations:**
  - `enqueue` (or `append`, `add-back`): Add an item to the queue.
  - `dequeue` (or `remove-front`): Remove and return the least recently inserted item.
- **Characteristics:**
  - **FIFO (First-In-First-Out):** The least recently added item is removed first.

### Priority Queues
- **Definition:** A data structure where each element has a priority. Elements are served based on priority.
- **Operations:**
  - `insert`: Add an element with a priority.
  - `remove_min`: Remove and return the element with the highest priority (lowest value).

### Binary Heaps
- **Properties:**
  - A complete binary tree.
  - Each node is smaller (min-heap) or larger (max-heap) than its children.
- **Types:**
  - **Min-heap:** Parent node is less than or equal to its children.
  - **Max-heap:** Parent node is greater than or equal to its children.
- **Height:** $$h = \lfloor \log_2 n \rfloor$$ where \( n \) is the number of nodes.

### Binary Heaps as PQ Realization
- **Insertion:** 
  - Add the new element at the end of the heap.
  - Percolate up to restore heap property.
- **Deletion:** 
  - Remove the root element.
  - Replace the root with the last element.
  - Percolate down to restore heap property.

### PQ-sort and Heap-sort
- **PQ-sort:**
  - Insert all elements into a priority queue.
  - Repeatedly remove the minimum element to sort.
- **Heap-sort:**
  - Build a heap from the input data.
  - Repeatedly extract the maximum (for max-heap) or minimum (for min-heap) element to sort.
- **Complexity:** 
  - Building the heap: $$O(n)$$
  - Each `remove_min`: $$O(\log n)$$
  - Total: $$O(n \log n)$$

### Towards the Selection Problem
- **Problem Statement:** Find the \( k \)-th smallest element in a list.
- **Approach:**
  - Use a min-heap to efficiently track the smallest elements.
  - Insert all elements into the heap.
  - Extract the minimum element \( k \) times.
- **Complexity:** 
  - Insertion: $$O(n \log n)$$
  - Extraction: $$O(k \log n)$$


