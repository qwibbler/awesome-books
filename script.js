let collection = [
  {
    title: 'book1',
    author: 'Zaman',
  },
  {
    title: 'book2',
    author: 'Jose',
  },
  {
    title: 'book3',
    author: 'Herrera',
  },
];

function catchValue() {
  const saveCollection = JSON.stringify(collection);
  localStorage.setItem('collection', saveCollection);
}

function getValue() {
  collection = JSON.parse(localStorage.getItem('collection'))
}

window.onload = getValue;

const booksWrapper = document.querySelector('.books');

function printBook(book) {
  const eachBook = document.createElement('div');
  const eachList = document.createElement('ul');
  const eachTitle = document.createElement('li');
  const eachAuthor = document.createElement('li');
  const eachRemove = document.createElement('li');
  const removeBtn = document.createElement('button');
  
  eachBook.appendChild(eachList);
  eachList.appendChild(eachTitle);
  eachList.appendChild(eachAuthor);
  eachList.appendChild(eachRemove);
  eachRemove.appendChild(removeBtn);
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn'

  eachTitle.innerHTML = book.title;
  eachAuthor.innerHTML = book.author;

  booksWrapper.appendChild(eachBook);
}

for (let i = 0; i < collection.length; i += 1) {
  printBook(collection[i]);
}

function addBook(title, author) {
  collection.push({ title: title, author: author });
  catchValue();
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', () => {
  addBook(title.value, author.value);
  printBook(collection[collection.length-1]);
})

function removeBook(book) {
  collection = collection.splice(book, 1);
  booksWrapper.removeChild(booksWrapper.childNodes[book+1]);
  catchValue();
}


const allRemove = document.querySelectorAll('.remove-btn');
for (let i = 0; i < allRemove.length; i += 1){
  allRemove[i].addEventListener('click', () => {
    removeBook(i)
  })
}
