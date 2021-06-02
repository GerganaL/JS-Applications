// function loadRepos() {
// 	const username = document.getElementById('username').value;
// 	const url = `https://api.github.com/users/${username}/repos`;

// 	fetch(url)//returns Promise
// 		.then(response => response.json() // Promise
// 		.then(data => { // callback
// 			const ulElement = document.getElementById('repos');
// 			ulElement.innerHTML = '';
// 			data.forEach(repo => {
// 				const liElement = document.createElement('li');
// 				liElement.textContent = repo.full_name;
// 				ulElement.appendChild(liElement);
// 			});
// 	}))
// 	.catch(error => {
// 		console.log('Promise rejected');
// 	})

// }

async function asyncloadRepos() {
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	try {
		const response = await fetch(url);
		console.log(response);

		if(response.status == 404){
			throw new Error('User not found')
		}

		const data = await response.json();
		console.log('Promise fulfilled');
		console.log(data);

		const ulElement = document.getElementById('repos');
		ulElement.innerHTML = '';
		data.forEach(repo => {
			const liElement = document.createElement('li');
			liElement.textContent = repo.full_name;
			ulElement.appendChild(liElement);
		});
	}catch(error){
		console.log('Promise rejected');
		console.log(error);
	}

};

