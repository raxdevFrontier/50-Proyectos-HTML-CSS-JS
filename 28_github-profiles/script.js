const APIURL = "https://api.github.com/users/"

// getUser("bradtraversy")

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

async function getUser(username) {
	try {
		// const res = await axios(APIURL + username)
		const { data } = await axios(APIURL + username)

		createUserCard(data)
		getRepos(username)
	} catch (err) {
		if (err.response.status == 404) {
			createErrorCard("No profile with this username founded")
		}
		// console.log(err)
	}
}

async function getRepos(username) {
	try {
		//petició general - que retornara els repositoris en ordre alfabetic
		// const { data } = await axios(APIURL + username + "/repos")

		//pero se lo pot aplicar un filtre amb "?sort=created" al final per ordenar per ultims creats, per exemple
		const { data } = await axios(APIURL + username + "/repos?sort=created")

		addReposToCard(data)
	} catch (err) {
		createErrorCard("Problem fetchin repos")
	}
}

function createUserCard(user) {
	const cardHTML = `
    <div class="card">
        <div>
            <img
                src="${user.avatar_url}"
                alt="img_portrait"
                class="avatar"
            />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos"></div>
        </div>
    </div>`

	main.innerHTML = cardHTML
}

function createErrorCard(msg) {
	const cardHTML = `
        <div class="card error">
            <h1>${msg}</h1>
        </div>`
	main.innerHTML = cardHTML
}

function addReposToCard(repos) {
	const reposEl = document.getElementById("repos")

	repos.slice(0, 5).forEach((repo) => {
		const repoEl = document.createElement("a")
		repoEl.classList.add("repo")
		repoEl.href = repo.html_url
		repoEl.target = "_blank"
		repoEl.innerText = repo.name

		reposEl.appendChild(repoEl)
	})
}

form.addEventListener("submit", (e) => {
	e.preventDefault()

	const user = search.value

	if (user) {
		getUser(user)

		search.value = ""
	}
})
