const booksWrapper = document.querySelector('.books');

class book {
  constructor(title, author, idCode) {
    this.title = title;
    this.author = author;
    this.id = idCode;
  }

  // static idCode() {
  //   if (idCode) {
  //     idCode += 1;
  //   } else {
  //     let idCode = 0;
  //   }
  // }

}

class collection {
  constructor() {
    this.collection = [];
  }

  // Local storage save
  catchValue() {
    const saveCollection = JSON.stringify(this.collection);
    const saveIdCode = JSON.stringify(idCode);
    localStorage.setItem('collection', saveCollection);
    localStorage.setItem('idCode', saveIdCode);
  }

  // Local storage get
  getValue() {
    let idCode = 0
    if (localStorage.getItem('collection')) {
      this.collection = JSON.parse(localStorage.getItem('collection'));
      idCode = JSON.parse(localStorage.getItem('idCode'));
    }
  }

  // Add books
  addBook(title, author, idCode) {
    const newBook = new book(title, author);
    this.collection.push(newBook);
    idCode += 1;
  }

  // Get book
  getBookById(idCode) {
    this.collection.filter((book) => {
      console.log('Get Book');
      console.log('Collection', this.collection);
      console.log('idCode', idCode);
      console.log('Book', book.idCode, idCode);
      return book.idCode === idCode;
      // if (book.idCode === idCode) {
      //   const index = this.collection.indexOf(book);
      //   console.log('Index', index);
      // }
      // return book;
      // console.log('Returned!')
    })
    console.log('new_Collection', this.collection)
  }

  // Remove book
  removeBook(idCode) {
    const removeBook = this.getBookById(idCode);
    console.log('Remove it!', removeBook)
    this.collection.filter((book) => { this.removeBook(book); });
    console.log('newCollection', this.collection)

    // this.filter((book) => {
    //   if (book.idCode === idCode) {
    //     const index = collection.indexOf(book);
    //     collection.splice(index, 1);
    //   }
    //   return book;

    // });
    // Remove from print

    const toRemove = document.getElementById(`${idCode}`);
    booksWrapper.removeChild(toRemove);
    catchValue();
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
    eachList.id = `${book.idCode}`;
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
    removeBtn.addEventListener('click', () => this.removeBook(book.idCode));
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
