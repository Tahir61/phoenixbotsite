const TEAM_API = 'https://api.neeko-bot.xyz/uavatar=';
const teamContainer = document.querySelector('.team-container');
const translatorContainer = document.querySelector('.translator-container');

const teamMembers = [
    {
      discordID: '802181483170103316',
        name: 'Orhan',
        info: 'Yapımcı , Web Site Developer',
        websiteLink: 'https://neeko-bot.xyz/',
    },
    {
         discordID: '714096745692397678',
        name: 'Emre',
        info: 'Sunucu Sahibi , Minecraft Yönetim',
        websiteLink: 'https://neeko-bot.xyz/',
    },
    {
        discordID: '786226634466000906',
        name: 'Mert',
        info: 'Bot Geliştirici , Minecraft Yönetim',
        websiteLink: 'https://neeko-bot.xyz/',
    }
];


const translatorMembers = [
    {
        discordID: '595178859968856074',
        name: 'Barış',
        info: 'Geliştirici , Tasarımcı , Minecraft Mimar',
        instagramLink: "https://www.instagram.com/samvdb15"
    }
];

/**
 * Fetches the URL to a user's Discord profile picture
 * @param {Array<string>} ids 
 * @returns {Promise<Object>|null}
 */
async function fetchPictures(ids) {
    try {
        let picture = await fetch(TEAM_API + ids)
        return await picture.json();
    } catch (o_O) {
        return null;
    }
}

/**
 * Adds all the team members to the page
 * @param {string} members 
 * @returns {void}
 */
function addMembers(members) {
    teamContainer.innerHTML += members;
}

/**
 * Adds all the translators to the page
 * @param {string} members
 * @returns {void} 
 */
function addTranslators(members) {
    translatorContainer.innerHTML += members;
}

/**
 * A function that generates an appropiate div with the details of a team member
 * @param {string} avatar 
 * @param {object} member
 * @returns {string}
 */
function teamMemberTemplate(avatar, member) {
    let strTemplate = '';

    member.name == "Emre" ? strTemplate += `<div class='team-member', style='background-image: url("https://cdn.neeko-bot.xyz/owner.gif")'>` : strTemplate += `<div class='team-member'>`;


    strTemplate += `
        <div class='team-member-img'><img src='${avatar}'></div>
        <div class='team-member-name'>${member.name}</div>
        ${member.info ? ((member.name == 'Mandruyd') ? `<div class='team-member-info' style='color: cyan; opacity: 1'>${member.info}</div>` : `<div class='team-member-info'>${member.info}</div>`) : ''}
        <div class='team-member-social'>
            ${member.githubLink ? `<button><a href='${member.githubLink}' target='_blank' rel=”noreferrer noopener”><i class='fab fa-github'></i></a></button>` : ''}
            ${member.websiteLink ? `<button><a href='${member.websiteLink}' target='_blank' rel=”noreferrer noopener”><i class='fas fa-link'></i></a></button>` : ''}
            ${member.instagramLink ? `<button><a href='${member.instagramLink}' target='_blank' rel=”noreferrer noopener”><i class='fab fa-instagram'></i></a></button>` : ''}      
            ${member.youtubeLink ? `<button><a href='${member.youtubeLink}' target='_blank' rel=”noreferrer noopener”><i class='fab fa-youtube'></i></a></button>` : ''}                    
        </div>
    </div>
    `;

    return strTemplate;
}

/**
 * @param {Object} object 
 * @param {string} id 
 * @returns {string}
 */
function getAvatar(object, id) {
    if (object && !!object[id]) return object[id];

    const numbers = [1, 2, 3, 4];
    return `https://cdn.discordapp.com/embed/avatars/${numbers[Math.floor(Math.random() * numbers.length)]}.png`
}

(async () => {
    let createUsers = '';

    const avatars = await fetchPictures([...teamMembers, ...translatorMembers].map(member => member.discordID).join(','));

    for (let i = 0; i < teamMembers.length; i++) {
        createUsers += teamMemberTemplate(getAvatar(avatars, teamMembers[i].discordID), teamMembers[i]);
    }

    let createTranslators = '';

    translatorMembers.sort((a, b) => (a.name > b.name) ? 1 : -1);

    for (let i = 0; i < translatorMembers.length; i++) {
        createTranslators += teamMemberTemplate(getAvatar(avatars, translatorMembers[i].discordID), translatorMembers[i]);
    }

    addMembers(createUsers);
    addTranslators(createTranslators);
})();
