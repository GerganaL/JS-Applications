document.querySelector('form').addEventListener('submit', onLoginSubmit);

async function onLoginSubmit(event) {
    event.preventDefault();

    ///event target is the form document.querySelector('form').addEventListener('submit', onRegisterSubmit );

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
 

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }
    
    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken);
    window.location.pathname = 'index.html';
}