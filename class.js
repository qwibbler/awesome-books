const booksWrapper = document.querySelector('.books');

class collection {
  constructor() {
    this.collection = [];
    this.idCode = 0;
  }
  
  book(title, author, idCode) {
    
    this.title = title;
    this.author = author;
    this.id = idCode;
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
    this.catchValue();
  }

  // Add books
  addBook(title, author) {
    const NewBook = new book(title, author, this.idCode);
    this.collection.push(NewBook);
    this.idCode += 1;
    this.catchValue();

    // Print book
    this.printBook(this.collection[this.collection.length - 1]);
  }

  // Get book
  getBookById(bookId) {
    const found = this.collection.filter((book) => book.id === bookId);
    const index = this.collection.indexOf(found);
    return [found, index];
  }

  // Remove book
  removeBook(bookId) {
    const deleteBook = this.getBookById(bookId);
    this.collection.splice(deleteBook[1], 1);
    
    // Remove from print
    const toRemove = document.getElementById(`${bookId}`);
    booksWrapper.removeChild(toRemove);
    this.catchValue();
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

const MyCollection = new collection();
MyCollection.getValue();
MyCollection.printAll();

// Get inputs
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');

// On click, add book to collection
addBtn.addEventListener('click', () => {
  MyCollection.addBook(title.value, author.value);
});
