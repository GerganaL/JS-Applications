// import {html} from '../../node_modules/lit-html/lit-html.js';
// import {getTeams} from '../api/data.js';

// const browseTemplate = (teams) => html`
// <section id="browse">
//     <article class="pad-med">
//          <h1>Team Browser</h1>
//     </article>

//     <article class="layout narrow">
//         <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
//     </article>

//     ${teams.map(teamTeamplate)}
   
// </section>
// `;

// const teamTeamplate = (team) => html`
// <article class="layout">
// <img src=${team.logoUrl} class="team-logo left-col">
// <div class="tm-preview">
//     <h2>${team.name}</h2>
//     <p>${team.description}</p>
//     <span class="details">? Members</span>
//     <div><a href=${`/details/${team._id}`} class="action">See details</a></div>
// </div>
// </article>
// `;

// export async function browsePage(ctx) {
//     const teams = await getTeams();

//      ctx.render(browseTemplate(teams));
//  };

import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';

import { getTeams } from '../api/data.js';
import { loaderTemplate } from './common/loader.js';
import { teamTemplate } from './common/team.js';


const browseTemplate = (teams) => html`
<section id="browse">
    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>
    ${teams.map(teamTemplate)}
</section>`;


export async function browsePage(ctx) {
    ctx.render(until(populateTemplate(), loaderTemplate()));
}

async function populateTemplate() {
    const teams = await getTeams();
    return browseTemplate(teams);
}