const booksWrapper = document.querySelector('.books');

class book {
  constructor(title, author, idCode) {
    this.title = title;
    this.author = author;
    this.id = idCode;
  }
}

class collection {
  constructor() {
    this.collection = [];
    this.idCode = 0;
  }

  // Local storage save
  catchValue() {
    const saveCollection = JSON.stringify(this.collection);
    const saveIdCode = JSON.stringify(this.idCode);
    localStorage.setItem('collection', saveCollection);
    localStorage.setItem('idCode', saveIdCode);
  }
  
  // Local storage get
  getValue() {
    if (localStorage.getItem('collection')) {
      this.collection = JSON.parse(localStorage.getItem('collection'));
      this.idCode = JSON.parse(localStorage.getItem('idCode'));
    }
  }

  // Add books
  addBook(title, author, id) {
    const newBook = new book(title, author, id);
    this.collection.push(newBook);
    this.idCode += 1;
  }

  // Get book
  getBookById(bookId) {
    console.log('Get Book');
    console.log('Collection', this.collection.length);
    console.log('bookId', bookId);
    const found = this.collection.filter(book => book.id === bookId);
    const index = this.collection.indexOf(found);
      // if (book.id === this.idCode) {
      //   const index = this.collection.indexOf(book);
      //   console.log('Index', index);
      // }
      // return book;
      // console.log('Returned!')
    console.log('Book found', found, this.collection.length);
    return found, index;
  }

  // Remove book
  removeBook(bookId) {
    const deleteBook = this.getBookById(bookId);
    console.log('Remove it!', deleteBook)
    this.collection.splice(deleteBook[1], 1);
    console.log('newCollection', this.collection.length)

    // console.log('Collection', this.collection.length);
    // console.log('bookId', bookId);
    // this.collection.filter((book) => {
    //   if (book.id === bookId) {
    //     console.log('id', book.id, bookId)
    //     const index = this.collection.indexOf(book);
    //     this.collection.splice(index, 1);
    //   }
    //   return book;
    // });
    // console.log('newCollection', this.collection.length)

    // Remove from print
    const toRemove = document.getElementById(`${bookId}`);
    booksWrapper.removeChild(toRemove);
    // catchValue();
  }

  printBook(book) {
    // Create elements
    const eachBook = document.createDocumentFragment();
    const eachList = document.createElement('ul');
    const eachTitle = document.createElement('li');
    const eachAuthor = document.createElement('li');
    const eachRemove = document.createElement('li');
    const removeBtn = document.createElement('button');

    // Append elements
    eachBook.appendChild(eachList);
    eachList.appendChild(eachTitle);
    eachList.id = `${book.id}`;
    eachList.appendChild(eachAuthor);
    eachList.appendChild(eachRemove);
    eachRemove.appendChild(removeBtn);
    booksWrapper.appendChild(eachBook);

    // Add values
    eachTitle.textContent = book.title;
    eachAuthor.textContent = book.author;
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Add event listener
    removeBtn.addEventListener('click', () => this.removeBook(book.id));
  }

  printAll() {
    while (booksWrapper.firstChild) {
      booksWrapper.removeChild(booksWrapper.firstChild);
    }
    for (let i = 0; i < this.collection.length; i += 1) {
      this.printBook(this.collection[i]);
    }
  }
}

const myCollection = new collection();
myCollection.getValue();
myCollection.printAll();

// Get inputs
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');

// On click, add book to collection
addBtn.addEventListener('click', () => {
  addBook(title.value, author.value);
});
