async function request(url, opritons) {
    const response = await fetch(url, opritons);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

//function to load all books from server and display them
async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const rows = Object.entries(books).map(createRow).join('');
    document.querySelector('tbody').innerHTML = rows;
}

function createRow([id, book]) {
    const result = `
    <tr data-id='${id}'>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button class='editBtn'>Edit</button>
            <button class='deletBtn'>Delete</button>
        </td>
    </tr>`;

    return result;
}

//function for create new book
async function createBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    event.target.reset();
    getAllBooks();
}

//function for updating an existing book using ID
async function updateBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get('title'));
    const id = formData.get('id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.reset();
}

//function for deleting an existing book using ID 
async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
    getAllBooks();
}

//program logic for updating the input form and filling existing values (on edit)
//program logic to reverse above chnages to form


//main function
// - attach event listeners as descriped
// - load all books and display them

function start() {
    // event listener on the load btn
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    //event listenet on create btn
    document.getElementById('createForm').addEventListener('submit', createBook);
    //event listeners on delete and edit buttons
    document.querySelector('table').addEventListener('click',handleTableClick);
    document.getElementById('editForm').addEventListener('submit', updateBook);
    

    getAllBooks();
}

start();

function handleTableClick(event) {
    if(event.target.className == 'editBtn'){
       document.getElementById('createForm').style.display = 'none';
       document.getElementById('editForm').style.display = 'block';
       const bookId = event.target.parentNode.parentNode.dataset.id;
      loadBookForEditing(bookId);
    }else if(event.target.className == 'deletBtn'){
        const bookId = event.target.parentNode.parentNode.dataset.id;
        deleteBook(bookId);
    }
}

async function loadBookForEditing(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
}
