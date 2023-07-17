class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  isEmpty() {
    return this.top === null;
  }

  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const poppedData = this.top.data;
    this.top = this.top.next;
    return poppedData;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.top.data;
  }

  display() {
    let current = this.top;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// Usage example:
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.pop());  // Output: 30
console.log(stack.peek()); // Output: 20

stack.display();
