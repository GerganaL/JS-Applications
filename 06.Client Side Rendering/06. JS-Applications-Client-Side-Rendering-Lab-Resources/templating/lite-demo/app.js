import { html, render } from 'https://unpkg.com/lit-html?module';
import createArticle from './article.js';

const articleTemplate = (article) => html`
<article>
<header>
    <h3>${article.title}</h3>
    </header>
    <div class="article-content">
       <p>${article.content}</p>
    </div>
    <footer>Author: ${article.author}</footer>
</article>`;


async function start() {
    const articles = await (await fetch('./articales.json')).json();
    const main = document.getElementById('content');
    const main2 = document.getElementById('content2');

    document.getElementById('btn').addEventListener('click', onClick);

    function onClick() {
        const article = articleTemplate(articles[0]);
        const article2 = createArticle(articles[0]);
        render(article,main);
        main2.innerHTML = article2;
    }
};

start();