const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        // console.log('first data: ',data);
        createUserCard(data)
        
    }
    catch (err) {
        if (err.response.status = 400) {
            createErrorCard('No user profile found in this search Name');
        }
    }
}




function createUserCard(user) {
    const cardHTML = `
        <div class='card'>
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
            
            <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repository</strong></li>
            </ul>

            <div id="repositoryId"></div>

            </div>
        </div>

        `
    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
    const cardHTML = `
    <div class="card">
        <h1>${msg}</h1>
    </div>

    
    `
    main.innerHTML = cardHTML;
}




form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user)

        search.value = '';
    }

})