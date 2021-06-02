function solve() {

    // const url = 'http://localhost:3030/jsonstore/bus/schedule/depot';
    // const response = await fetch(url);

    const departBtn = document.getElementById('depart');
    const arrivetBtn = document.getElementById('arrive');
   // const banner = document.getElementById('info');
   const banner = document.querySelector('span.info');

    let stop = {
        next : 'depot'
    };
    async function depart() {

        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        stop = data;

        banner.textContent = `Next stop ${stop.name}`;

        departBtn.disabled = true;
        arrivetBtn.disabled = false;
    }

    function arrive() {
        console.log('Arrive TODO...');

        banner.textContent = `Arraving at ${stop.name}`
        departBtn.disabled = false;
        arrivetBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();