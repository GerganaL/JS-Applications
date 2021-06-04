//import modules
import { setupHome, showHome } from './home.js';
import { setupDetails } from './details';
import { setupLogin, showLogin } from './login';
import { setupRegister, showRegister } from './register';
import { setupCreate, showCreate } from './create';
import { setupEdit } from './edit';
//grab sections
//setup modules
//setup navigation

const main = document.querySelector('main');

const links = {
    "homeLink" : showHome,
    "loginLink" : showLogin,
    "registerLink" : showRegister,
    "createLink" : showCreate
}

setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);

setupNavigation();

//start application in home view
showHome();

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main,section);
}

function setupNavigation() {
    document.querySelector('nav').addEventListener('click', (event) => {
        if(event.target.tagName == 'A'){
            const view = links[event.target.id];
            if(typeof view == 'function'){
                view();
            }
        }
    });
}