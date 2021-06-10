// import createArticle from './article.js';

// async function start (){
//     const articles = await(await fetch('./articales.json')).json();
//     const main = document.getElementById('content');
//     main.innerHTML = articles.map(createArticle).join('');
//     console.log(articles.map(createArticle));
// };

// start();


import { renderTemplate } from './engine.js';

async function start() {
    const articles = await (await fetch('./articales.json')).json();
    const articleTemplate = await (await fetch('./articleTemplate.html')).text();

    const main = document.getElementById('content');
    main.innerHTML = articles.map(article => renderTemplate(articleTemplate, article)).join('');

};

start();