const collection = [
  {
    title: book1,
    author: Zaman,
  },
  {
    title: book2,
    author: Jose,
  },
  {
    title: book3,
    author: Herrera,
  },
];

const booksWrapper = document.querySelector('.books');

function printBook(book) {
  const eachBook = document.createElement('div');
  const eachList = document.createElement('ul');
  const eachTitle = document.createElement('li');
  const eachAuthor = document.createElement('li');
  const eachRemove = document.createElement('li');

  eachBook.appendChild(eachList);
  eachList.appendChild(eachTitle);
  eachList.appendChild(eachAuthor);
  eachList.appendChild(eachRemove);

  eachTitle.innerHTML = book.title;
  eachAuthor.innerHTML = book.author;

  booksWrapper.appendChild(eachBook);
}

for (let i = 0; i < collection.length; i++) {
  printBook(collection[i]);
}

function addBook(title, author) {
  collection.push({ title: title, author: author });
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', () => {
  addBook(title.value, author.value);
})