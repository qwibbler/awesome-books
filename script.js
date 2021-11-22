// Get Collection
// Default
let collection = [
  {
    title: 'book1',
    author: 'Zaman',
    idCode: 0,
  },
  {
    title: 'book2',
    author: 'Jose',
    idCode: 1,
  },
  {
    title: 'book3',
    author: 'Herrera',
    idCode: 2,
  },
];
let idCode = 3;

// Save it to localStorage
function catchValue() {
  const saveCollection = JSON.stringify(collection);
  const saveIdCode = JSON.stringify(idCode);
  localStorage.setItem('collection', saveCollection);
  localStorage.setItem('idCode', saveIdCode);
}

// Get it from localStorage (if it exists)
function getValue() {
  if (localStorage.getItem('collection')) {
    collection = JSON.parse(localStorage.getItem('collection'));
    idCode = JSON.parse(localStorage.getItem('idCode'));
    catchValue();
  }
}
// Run function
getValue();
window.onload = getValue;

// Print Books + Add/Remove
// Books Section
const booksWrapper = document.querySelector('.books');

// Remove function by id
function removeBook(idCode) {
  // Remove from collection
  collection.filter((book) => {
    if (book.idCode === idCode) {
      const index = collection.indexOf(book);
      collection.splice(index, 1);
    }
    return book;
  });
  // Remove from print
  const toRemove = document.getElementById(`${idCode}`);
  booksWrapper.removeChild(toRemove);
  catchValue();
}

// Print a book
function printBook(book) {
  // Create elements
  const eachBook = document.createElement('div');
  const eachList = document.createElement('ul');
  const eachTitle = document.createElement('li');
  const eachAuthor = document.createElement('li');
  const eachRemove = document.createElement('li');
  const removeBtn = document.createElement('button');

  // Append elements
  eachBook.appendChild(eachList);
  eachBook.id = `${book.idCode}`;
  eachList.appendChild(eachTitle);
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
  removeBtn.addEventListener('click', () => removeBook(book.idCode));
}

// Print every book already in collection
for (let i = 0; i < collection.length; i += 1) {
  printBook(collection[i]);
}

// Add book function
function addBook(title, author) {
  collection.push({ title, author, idCode });
  idCode += 1;
  printBook(collection[collection.length - 1]);
  catchValue();
}

// Get inputs
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');

// On click, add book to collection
addBtn.addEventListener('click', () => {
  addBook(title.value, author.value);
});
