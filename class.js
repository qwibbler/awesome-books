const booksWrapper = document.querySelector('#bookList');

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
    if (this.collection.length === 0) {
      booksWrapper.removeChild(booksWrapper.firstChild);
    }
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

  // If empty, print an empty message
  printEmpty() {
    if (this.collection.length === 0) {
      const emptyBook = document.createDocumentFragment();
      const emptyList = document.createElement('ul');
      const emptyItem = document.createElement('li');
      emptyBook.appendChild(emptyList);
      emptyList.appendChild(emptyItem);
      emptyList.id = 'empty';
      emptyList.textContent = 'Please add a book to the collection from the form.';
      booksWrapper.appendChild(emptyBook);
    }
  }

  // Remove book
  removeBook(bookId) {
    const deleteBook = this.getBookById(bookId);
    this.collection.splice(deleteBook[1], 1);

    // Remove from print
    const toRemove = document.getElementById(`${bookId}`);
    booksWrapper.removeChild(toRemove);

    this.printEmpty();

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
    this.printEmpty();
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
  if (title.value) {
    if (!author.value) {
      author.value = 'Anonymous';
    }
    MyCollection.addBook(title.value, author.value);
    title.value = '';
    author.value = '';
  } else {
    alert('Please give a title for your book'); // eslint-disable-line no-alert
  }
});

// Switch Pages
const showList = document.querySelector('#showAll');
const addNew = document.querySelector('#addNew');
const contact = document.querySelector('#contact');
const booksSection = document.querySelector('.books');
const addBookSection = document.querySelector('.addBook');
const contactSection = document.querySelector('.contact');
const sections = [booksSection, addBookSection, contactSection];
function showPage(section) {
  sections.filter((element) => element !== section).forEach((element) => {
    element.classList.add('hidden');
  });
  section.classList.remove('hidden');
}
showList.addEventListener('click', () => { showPage(booksSection); });
addNew.addEventListener('click', () => { showPage(addBookSection); });
contact.addEventListener('click', () => { showPage(contactSection); });

// Add datetime
const { DateTime } = luxon; // eslint-disable-line no-undef
const dateTimeDiv = document.querySelector('.dateTime');
function updateTime() {
  const dt = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  dateTimeDiv.textContent = dt.toString();
}
updateTime();
setInterval(updateTime, 1000);
