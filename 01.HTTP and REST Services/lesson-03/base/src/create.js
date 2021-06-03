document.querySelector('form').addEventListener('submit', onCreateSubmit);

async function onCreateSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData
    .get('ingredients')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l != '');
    const steps = formData.
    get('steps')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l != '');

    const token = sessionStorage.getItem('userToken');

    const response = await fetch('http://localhost:3030/data/recipes',{
        method : 'post',
        headers: {
            'Content-Type': 'application/json',
           'X-Authorization':  token
        },
        body: JSON.stringify({
            name,
            img,
            ingredients,
            steps
        })
    });

    if(response.ok != true){
        const err = await response.json();
        return alert(err.message);
    }

    window.location.pathname = 'index.html';

}