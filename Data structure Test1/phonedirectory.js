// Node class for AVL tree
class AVLNode {
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.height = 1;
      this.left = null;
      this.right = null;
    }
  }
  
  // AVL tree class
  class AVLTree {
    constructor() {
      this.root = null;
    }
  
    // Helper function to get the height of a node
    getHeight(node) {
      if (node === null) {
        return 0;
      }
      return node.height;
    }
  
    // Helper function to calculate the balance factor of a node
    getBalanceFactor(node) {
      if (node === null) {
        return 0;
      }
      return this.getHeight(node.left) - this.getHeight(node.right);
    }
  
    // Helper function to update the height of a node
    updateHeight(node) {
      if (node === null) {
        return;
      }
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
  
    // Helper function to perform a right rotation
    rotateRight(z) {
      const y = z.left;
      const T3 = y.right;
  
      // Perform rotation
      y.right = z;
      z.left = T3;
  
      // Update heights
      this.updateHeight(z);
      this.updateHeight(y);
  
      return y;
    }
  
    // Helper function to perform a left rotation
    rotateLeft(z) {
      const y = z.right;
      const T2 = y.left;
  
      // Perform rotation
      y.left = z;
      z.right = T2;
  
      // Update heights
      this.updateHeight(z);
      this.updateHeight(y);
  
      return y;
    }
  
    // Helper function to balance the AVL tree
    balance(node) {
      // Update height of the current node
      this.updateHeight(node);
  
      // Check the balance factor and perform rotations if needed
      if (this.getBalanceFactor(node) > 1) {
        // Left-Left case
        if (this.getBalanceFactor(node.left) >= 0) {
          return this.rotateRight(node);
        }
        // Left-Right case
        else {
          node.left = this.rotateLeft(node.left);
          return this.rotateRight(node);
        }
      }
      if (this.getBalanceFactor(node) < -1) {
        // Right-Right case
        if (this.getBalanceFactor(node.right) <= 0) {
          return this.rotateLeft(node);
        }
        // Right-Left case
        else {
          node.right = this.rotateRight(node.right);
          return this.rotateLeft(node);
        }
      }
  
      return node;
    }
  
    // Insert a contact into the AVL tree
    insert(name, phoneNumber) {
      this.root = this.insertNode(this.root, name, phoneNumber);
    }
  
    insertNode(node, name, phoneNumber) {
      // Perform regular BST insertion
      if (node === null) {
        return new AVLNode(name, phoneNumber);
      }
      if (name < node.name) {
        node.left = this.insertNode(node.left, name, phoneNumber);
      } else if (name > node.name) {
        node.right = this.insertNode(node.right, name, phoneNumber);
      } else {
        // Duplicate names are not allowed in this implementation
        return node;
      }
  
      // Update the height and balance the tree
      this.updateHeight(node);
      node = this.balance(node);
  
      return node;
    }
  
    // Search for a contact by name
    searchByName(name) {
      return this.searchByNameRecursive(this.root, name);
    }
  
    searchByNameRecursive(node, name) {
      if (node === null || node.name === name) {
        return node;
      }
      if (name < node.name) {
        return this.searchByNameRecursive(node.left, name);
      } else {
        return this.searchByNameRecursive(node.right, name);
      }
    }
  
    // Delete a contact by name
    deleteContact(name) {
      this.root = this.deleteNode(this.root, name);
    }
  
    deleteNode(node, name) {
      // Perform regular BST deletion
      if (node === null) {
        return node;
      }
      if (name < node.name) {
        node.left = this.deleteNode(node.left, name);
      } else if (name > node.name) {
        node.right = this.deleteNode(node.right, name);
      } else {
        // Node with the given name is found
  
        // Case 1: Node has no children or only one child
        if (node.left === null || node.right === null) {
          node = node.left || node.right;
        }
        // Case 2: Node has two children
        else {
          // Find the inorder successor (smallest node in the right subtree)
          const successor = this.findMinimumNode(node.right);
          node.name = successor.name;
          node.phoneNumber = successor.phoneNumber;
          node.right = this.deleteNode(node.right, successor.name);
        }
      }
  
      // If the tree had only one node, return
      if (node === null) {
        return node;
      }
  
      // Update the height and balance the tree
      this.updateHeight(node);
      node = this.balance(node);
  
      return node;
    }
  
    // Helper function to find the minimum node in a subtree
    findMinimumNode(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }
  }
  
  // Phone Directory class
  class PhoneDirectory {
    constructor() {
      this.contacts = {}; // Hash table to store contacts based on phone numbers
      this.nameIndex = new AVLTree(); // AVL tree to store contacts based on names
    }
  
    // Insert a contact into the phone directory
    insertContact(name, phoneNumber) {
      if (this.contacts[phoneNumber]) {
        console.log("Contact already exists with the given phone number.");
        return;
      }
      this.contacts[phoneNumber] = name;
      this.nameIndex.insert(name, phoneNumber);
    }
  
    // Delete a contact by name
    deleteContact(name) {
      const phoneNumber = this.contacts[name];
      if (!phoneNumber) {
        console.log("Contact with the given name does not exist.");
        return;
      }
      delete this.contacts[name];
      this.nameIndex.deleteContact(name);
    }
  
    // Search for a contact by name
    searchByName(name) {
      const node = this.nameIndex.searchByName(name);
      if (node) {
        console.log(`Name: ${node.name}, Phone Number: ${node.phoneNumber}`);
      } else {
        console.log("Contact not found with the given name.");
      }
    }
  
    // Search for a contact by phone number
    searchByPhoneNumber(phoneNumber) {
      const name = this.contacts[phoneNumber];
      if (name) {
        console.log(`Name: ${name}, Phone Number: ${phoneNumber}`);
      } else {
        console.log("Contact not found with the given phone number.");
      }
    }
  }
  
  // Usage example:
  const phoneDirectory = new PhoneDirectory();
  phoneDirectory.insertContact("John Doe", "1234567890");
  phoneDirectory.insertContact("Jane Smith", "9876543210");
  
  phoneDirectory.searchByName("John Doe"); // Output: Name: John Doe, Phone Number: 1234567890
  phoneDirectory.searchByPhoneNumber("9876543210"); // Output: Name: Jane Smith, Phone Number: 9876543210
  
  phoneDirectory.deleteContact("John Doe");
  phoneDirectory.searchByName("John Doe"); // Output: Contact not found with the given name.
  