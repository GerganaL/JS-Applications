function attachEvents() {

    let inputs = Array.from(document.querySelectorAll('input'));
    document.getElementById('submit').addEventListener('click', async () => {
        const author = inputs[0].value;
        const content = inputs[1].value;
       await sendMessage({ author, content });

        inputs[0].value = '';
        inputs[1].value = '';
        getMessages();
    });
    document.getElementById('refresh').addEventListener('click', getMessages)

    getMessages();
}

attachEvents();

async function getMessages() {
    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await response.json();

    console.log(data);

    const messeges = Object.values(data)
        .map(v => `${v.author}:${v.content}`).join('\n');
    document.getElementById('messages').value = messeges;
}

async function sendMessage(message) {
    const response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    });
    const data = await response.json();
}