let user = {

    "apiUrl": 'https://api.github.com/users/',
    fetchUser: async function (user) {
        fetch(this.apiUrl + user).then((response) => response.json())
            .then((data) => this.createUserCard(data));
    },
    fetchRepos: async function (repos_url) {
        fetch(repos_url).then((response) => response.json())
            .then((repodata) => this.addRepo(repodata));
    },
    addRepo: function (repodata) {
        const reposdiv = document.querySelector(".reposdiv");
        reposdiv.innerHTML='';
        repodata
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 100000000)
            .forEach((repo) => {
                const createLink = document.createElement("a");//creation new li for the toast
                createLink.className = `repoelement`;//add class for the toasts
                createLink.href=repo.html_url;
                createLink.innerText = repo.name;
                reposdiv.appendChild(createLink);
            })
    },
    createUserCard: async function (data) {
        const { login, message } = data;
        console.log(login);
        if (typeof login !== 'undefined') {
            const { login, bio, avatar_url, html_url, repos_url, public_repos,
                following, followers } = data;
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?coding')";
            document.querySelector(".img-fluid").src = avatar_url;
            document.querySelector(".userName").href = html_url;
            document.querySelector(".userName").innerText = login;
            document.querySelector(".repoCount").innerText = public_repos + " Public Repo";
            document.querySelector(".followersCount").innerText = followers + " Followers";
            document.querySelector(".followingCount").innerText = following + " Following";
            document.querySelector(".userBio").innerText = bio;
            this.fetchRepos(repos_url);
            createToast("success");
            createToast("warning");
        }
        else if (typeof login == 'undefined') {
            console.log(message);
            createToast("error");
        }
    },
    search: async function () {
        // console.log(document.querySelector(".form-control").value);
        this.fetchUser(document.querySelector(".form-control").value);
    }
};
document.querySelector(".search-button").addEventListener("click", async function () {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?github')";
    
    user.search();
});
document.querySelector(".form-control").addEventListener("keyup", async function (event) {
    if (event.key == "Enter") {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?github')";
        user.search();
    }
});
user.fetchUser("zeymurat");
createToast("inform");
async function createToast(id) {
    //Start creating toasts details
    const toastsDetails = {
        timer: 5000,
        success: {
            icon: 'fa-circle-check',
            text: 'The user find successfully',
        },
        error: {
            icon: 'fa-circle-xmark',
            text: 'We couldn\'t find the user that written. Please check.',
        },
        warning: {
            icon: 'fa-triangle-exclamation',
            text: 'You can read only with this page',
        },
        inform: {
            icon: 'fa-circle-info',
            text: 'You are using Zeynel Murat\'s Github User Search App',
        },
    }
    //End creating toasts details
    //Add toasts details on variables due to id
    const { icon, text } = toastsDetails[id]
    const notifications = document.querySelector(".notifications");
    const toast = document.createElement("li");//creation new li for the toast
    toast.className = `toast ${id} show`;//add class for the toasts
    toast.innerHTML = `<div class="column">
                            <i class="fa-solid ${icon}"></i>
                            <span>${text}</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToasts(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    toast.timeoutId = setTimeout(() => removeToasts(toast), toastsDetails.timer);
}
async function removeToasts(toast) {
    toast.classList.add("passive");
    if (toast.timeoutId) clearTimeout(toast.timeoutId); //Clear the timeout
    setTimeout(() => toast.remove(), 300);
}
// "login": "Zeymurat",
//   "id": 58563405,
//   "node_id": "MDQ6VXNlcjU4NTYzNDA1",
//   "avatar_url": "https://avatars.githubusercontent.com/u/58563405?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/Zeymurat",
//   "html_url": "https://github.com/Zeymurat",
//   "followers_url": "https://api.github.com/users/Zeymurat/followers",
//   "following_url": "https://api.github.com/users/Zeymurat/following{/other_user}",
//   "gists_url": "https://api.github.com/users/Zeymurat/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/Zeymurat/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/Zeymurat/subscriptions",
//   "organizations_url": "https://api.github.com/users/Zeymurat/orgs",
//   "repos_url": "https://api.github.com/users/Zeymurat/repos",
//   "events_url": "https://api.github.com/users/Zeymurat/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/Zeymurat/received_events",
//   "type": "User",
//   "site_admin": false,
//   "name": null,
//   "company": null,
//   "blog": "",
//   "location": null,
//   "email": null,
//   "hireable": null,
//   "bio": null,
//   "twitter_username": null,
//   "public_repos": 13,
//   "public_gists": 0,
//   "followers": 7,
//   "following": 1,
//   "created_at": "2019-12-05T15:44:15Z",
//   "updated_at": "2023-08-16T06:12:06Z"