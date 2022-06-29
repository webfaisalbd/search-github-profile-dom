const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


// load profile data 
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        // console.log('first data: ',data);
        createUserCard(data)
        getRepos(username)
    }
    catch (err) {
        if (err.response.status = 400) {
            createErrorCard('No user profile found in this search Name');
        }
    }
}


// load repository data
async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');
        // console.log('second data: ',data);
        addRepoToCard(data)
    }
    catch (err) {
        createErrorCard('Problem is fetching in repos')
    }
}


// show profile data 
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

            <button onclick="againSubmit()" id="againSubmit" class="againSubmit">Again Search</button>
                
            

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


// show repository data 
function addRepoToCard(repos) {
    const reposE1 = document.getElementById('repositoryId');

    repos.slice(0, 10).forEach(repo => {
            const repoE1 = document.createElement('a');
            repoE1.classList.add('repo');
            repoE1.href = repo.html_url;
            repoE1.target = '_black';
            repoE1.innerText = repo.name;

            reposE1.appendChild(repoE1)

        })

}

// enter the search box 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user)

        search.value = '';
    }

})


// again Submit
function againSubmit(){
    main.innerHTML = '';
}