const booksWrapper = document.querySelector('.books');

class Collection {
  constructor() {
    this.collection = [];
    this.idCode = 0;
  }

  book(title, author) {
    const book = {
      title,
      author,
      id: this.idCode,
    };
    this.idCode += 1;
    return book;
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
    const NewBook = this.book(title, author);
    this.collection.push(NewBook);
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
    const eachTitleAndAuthor = document.createElement('li');
    const eachRemove = document.createElement('li');
    const removeBtn = document.createElement('button');

    // Append elements
    eachBook.appendChild(eachList);
    eachList.appendChild(eachTitleAndAuthor);
    eachList.id = `${book.id}`;
    eachList.appendChild(eachRemove);
    eachRemove.appendChild(removeBtn);
    booksWrapper.appendChild(eachBook);

    // Add values
    eachTitleAndAuthor.textContent = `${book.title} by ${book.author}`;
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

const MyCollection = new Collection();
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
