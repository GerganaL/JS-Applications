import page from '../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js'

import {logout} from './api/data.js'
import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myFurniturePage } from './views/myFurniture.js';
import { registerPage } from './views/register.js';

import * as api from './api/data.js';


window.api = api;

const main = document.querySelector('.container');

page('/', decorateContext, dashboardPage);
page('/dashboard', decorateContext, dashboardPage);
page('/my-furniture', decorateContext, myFurniturePage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);

document.getElementById('logoutBtn').addEventListener('click', async ()=>{
    await logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();
//start application
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId == null) {
        document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = 'inline-block';
    }else{
    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';}


}


