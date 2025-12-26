/**
 * Double Linked List Implementation for Shopping Cart
 * Each node has prev and next pointers for bidirectional traversal
 */

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

export class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Insert a new node at the end of the list
     * @param {Object} data - Data to store in the node
     */
    insertLast(data) {
        const newNode = new Node({
            ...data,
            id: data.id || Date.now().toString()
        });

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
        return newNode.data;
    }

    /**
     * Insert a new node at the beginning of the list
     * @param {Object} data - Data to store in the node
     */
    insertFirst(data) {
        const newNode = new Node({
            ...data,
            id: data.id || Date.now().toString()
        });

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return newNode.data;
    }

    /**
     * Find a node by its ID
     * @param {string} id - ID to search for
     * @returns {Node|null}
     */
    find(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    /**
     * Remove a node by its ID
     * @param {string} id - ID of the node to remove
     * @returns {boolean} - True if removed, false if not found
     */
    removeById(id) {
        const node = this.find(id);
        if (!node) return false;

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            // Node is head
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            // Node is tail
            this.tail = node.prev;
        }

        this.size--;
        return true;
    }

    /**
     * Update a node's data by ID
     * @param {string} id - ID of the node to update
     * @param {Object} patch - Data to merge
     * @returns {boolean}
     */
    update(id, patch) {
        const node = this.find(id);
        if (!node) return false;
        node.data = { ...node.data, ...patch };
        return true;
    }

    /**
     * Convert the list to an array (for React rendering)
     * @returns {Array}
     */
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    /**
     * Traverse forward from head (for demonstration)
     * @param {Function} callback - Function to call on each node
     */
    traverseForward(callback) {
        let current = this.head;
        while (current) {
            callback(current.data);
            current = current.next;
        }
    }

    /**
     * Traverse backward from tail (for demonstration)
     * @param {Function} callback - Function to call on each node
     */
    traverseBackward(callback) {
        let current = this.tail;
        while (current) {
            callback(current.data);
            current = current.prev;
        }
    }

    /**
     * Clear the list
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Get the size of the list
     * @returns {number}
     */
    getSize() {
        return this.size;
    }

    /**
     * Load from array (for localStorage restoration)
     * @param {Array} arr
     */
    loadFromArray(arr) {
        this.clear();
        arr.forEach(item => this.insertLast(item));
    }
}

export default DoublyLinkedList;
