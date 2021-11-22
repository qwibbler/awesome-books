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

function getValue() {
  if (localStorage.getItem('collection')) {
    console.log('notNull', localStorage.getItem('collection'));
    collection = JSON.parse(localStorage.getItem('collection'));
    idCode = JSON.parse(localStorage.getItem('idCode'));
    console.log('notNull', localStorage.getItem('collection'));
  }
  catchValue();
}

getValue()
window.onload = getValue;

function catchValue() {
  const saveCollection = JSON.stringify(collection);
  const saveIdCode = JSON.stringify(idCode);
  localStorage.setItem('collection', saveCollection);
  localStorage.setItem('idCode', saveIdCode);
}
// catchValue()

const booksWrapper = document.querySelector('.books');

function removeBook(idCode) {
  collection.filter(function (book) {
    if (book.idCode === idCode){
      index = collection.indexOf(book);
      collection.splice(index.idCode, 1);
    }
  });
  const toRemove = document.getElementById(`${idCode}`)
  booksWrapper.removeChild(toRemove);
  catchValue();
}

function printBook(book) {
  const eachBook = document.createElement('div');
  const eachList = document.createElement('ul');
  const eachTitle = document.createElement('li');
  const eachAuthor = document.createElement('li');
  const eachRemove = document.createElement('li');
  const removeBtn = document.createElement('button');

  eachBook.appendChild(eachList);
  eachBook.id = `${book.idCode}`
  eachList.appendChild(eachTitle);
  eachList.appendChild(eachAuthor);
  eachList.appendChild(eachRemove);
  eachRemove.appendChild(removeBtn);
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.addEventListener('click', () => removeBook(book.idCode));

  eachTitle.innerHTML = book.title;
  eachAuthor.innerHTML = book.author;

  booksWrapper.appendChild(eachBook);
}

for (let i = 0; i < collection.length; i += 1) {
  printBook(collection[i]);
}

function addBook(title, author) {
  collection.push({ title: title, author: author, idCode: idCode});
  idCode += 1;
  printBook(collection[collection.length - 1]);
  catchValue();
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', () => {
  addBook(title.value, author.value);
})

// const allRemove = document.querySelectorAll('.remove-btn');
// for (let i = 0; i < allRemove.length; i += 1) {
//   allRemove[i].addEventListener('click', () => removeBook(i))
// }
