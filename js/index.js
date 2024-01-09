
const form = document.querySelector('#github-form');
form.addEventListener('submit', githubSearch);

function githubSearch(event){
    event.preventDefault();
    
    const userName = document.querySelector('#search').value;
    const userApiUrl = `https://api.github.com/users/${userName}`;

    if (userName === ''){
        alert('Please enter a name');
    }
    fetch(userApiUrl)
    .then(res => res.json())
    .then(user => {
        const userList = document.querySelector('#user-list');

        const userListItems = `<li>
            <a onclick="displayRepos('${user.login}')">
                <span>${user.login}</span>
                <img 
                    src= "${user.avatar_url}"
                    alt= "${user.login}"
                />
                <a href="${user.html_url}" target="_blank">Profile</a>
            </a>
        </li>`;
        userList.insertAdjacentHTML('beforeend', userListItems);
    })
    .catch(error => {
        alert(`${error.message}`);
        console.log(error.message);
    });
}

function displayRepos(userName) {
    const reposApiUrl = `https://api.github.com/users/${userName}/repos`;

    fetch(reposApiUrl)
        .then(res => res.json())
        .then(repos => {
            const reposList = document.getElementById('repos-list');
            if (Array.isArray(repos)) {
                const reposListItems = repos.map(repo => `<li>
                    <span>${repo.name}</span>
                </li>`).join('');
                reposList.innerHTML = reposListItems;
            }
        })
        .catch(error => {
            alert(`${error.message}`);
            console.log(error.message);
        });
}

