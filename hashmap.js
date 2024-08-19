function HashMap() {
  let buckets = [];
  let capacity = 16;
  let loadFactor = 0.75;
  let length = 0;
  const initialCapacity = 16;

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        capacity -
        initialCapacity +
        ((primeNumber * hashCode + key.charCodeAt(i)) % 16);
    }
    return hashCode;
  }

  function set(key, value) {
    let currLinkedList = buckets[hash(key)];
    if (!currLinkedList) {
      buckets[hash(key)] = LinkedList().append(key, value);
      this.length++;
    } else if (!currLinkedList.replace(key, value)) {
      currLinkedList.append(key, value);
    }
    if (this.capacity * loadFactor < bucketsLength()) {
      this.capacity += 16;
    }
  }

  function get(key) {
    const value = has(key) ? buckets[hash(key)].getValue(key) : null;
    return value;
  }

  function has(key) {
    return buckets[hash(key)] ? buckets[hash(key)].contains(key) : false;
  }

  function remove(key) {
    return has(key) ? buckets[hash(key)].removeKey(key) : false;
  }

  function bucketsLength() {
    let length = 0;
    for (element of buckets) {
      if (element) {
        length += element.size();
      }
    }
    return length;
  }

  function clear() {
    buckets.length = 0;
    this.capacity = 16;
  }

  function keys() {
    let array = [];
    for (element of buckets) {
      if (element) {
        // array = array.concat(Object.keys(element.head)[0]);
        array = array.concat(element.keys());
        // console.log(element.keys());
      }
    }
    return array;
  }

  function values() {
    let array = [];
    for (element of buckets) {
      if (element) {
        // if ((item = Object.keys(element.head)[0])) {
        //   array = array.concat(Object.values(element.head)[0]);
        // }
        for (key of element.keys()) {
          array.push(element.getValue(key));
        }
      }
    }
    return array;
  }

  function entries() {
    let array = [];
    for (element of buckets) {
      if (element) {
        // array = array.concat(Object.keys(element.head)[0]);
        for (key of element.keys()) {
          array.push([key, element.getValue(key)]);
        }
      }
    }
    return array;
  }

  return {
    buckets,
    length,
    capacity,
    hash,
    set,
    get,
    has,
    remove,
    bucketsLength,
    clear,
    keys,
    values,
    entries,
  };
}

function Node(key = null, value = null, next = null) {
  return {
    [key]: value,
    next,
  };
}

function LinkedList(head = null) {
  function append(key, value) {
    if (this.head == null) {
      this.head = Node(key, value, null);
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = Node(key, value, null);
    }
    return this;
  }

  function contains(key) {
    let temp = this.head;
    while (temp) {
      if (temp[key]) {
        return true;
      }
      temp = temp.next;
    }
    return false;
  }

  function getValue(key) {
    let temp = this.head;
    while (temp) {
      if (temp[key]) {
        return temp[key];
      }
      temp = temp.next;
    }
    return false;
  }

  function replace(key, value) {
    let temp = this.head;
    while (temp) {
      if (temp[key]) {
        temp[key] = value;
        return true;
      }
      temp = temp.next;
    }
    return false;
  }

  function removeKey(key) {
    const index = this.find(key);
    if (index !== null) {
      this.removeAt(index);
      return true;
    }
    return false;
  }

  function at(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter == index) {
        return node;
      }
      node = node.next;
      counter++;
    }
    return null;
  }

  function removeAt(index) {
    if (index == 0) {
      this.head = this.head.next;
      return this;
    }
    let previous = this.at(index - 1);
    let curr = this.at(index);
    if (previous && curr) {
      previous.next = curr.next;
    }
    return this;
  }

  function find(key) {
    let temp = this.head;
    let index = 0;
    while (temp) {
      if (temp[key]) {
        return index;
      }
      index++;
      temp = temp.next;
    }
    return null;
  }

  function size() {
    let temp = this.head;
    let size = 0;
    while (temp) {
      temp = temp.next;
      size++;
    }
    return size;
  }

  function keys() {
    let temp = this.head;
    let array = [];
    while (temp) {
      array = array.concat(Object.keys(temp)[0]);
      temp = temp.next;
    }
    return array;
  }

  return {
    head,
    append,
    contains,
    replace,
    getValue,
    removeKey,
    find,
    at,
    removeAt,
    size,
    keys,
  };
}
