const url = "https://api.github.com/users/mohammadalhabil";
const reopsUrl = "https://api.github.com/users/mohammadalhabil/repos";
fetchData("GET", url, handleInfo);
fetchData("GET", reopsUrl, handlRepos);
fetchData("GET", reopsUrl, handlLang);
fetchData("GET", reopsUrl, handlStarts);

const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const githubUserLink = document.querySelector("#github-user-link");
const githubUserHandle = document.querySelector("#github-user-handle");
const githubUserAvatar = document.querySelector("#github-user-avatar");
const githubUserRepos = document.querySelector("#github-user-repos");
const githubRepoLink = document.querySelector("#github-repo-link");
const githubRepoName = document.querySelector("#github-repo-name");
const githubRepoCreated = document.querySelector("#github-repo-created");
const githubRepoOpenIssues = document.querySelector("#github-repo-open-issues");
const githubRepoWatchers = document.querySelector("#github-repo-watchers");
const githubRepoContributors = document.querySelector("#github-repo-contributors");
const githubRepoLanguages = document.querySelector("#github-repos-languages");
const githubRepoStars = document.querySelector("#github-repos-stars");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getData();
});
searchBtn.addEventListener("click", getData);

function getData() {
  const urlUser = `https://api.github.com/users/${input.value}`;
  const Urlreops = `https://api.github.com/users/${input.value}/repos`;

  fetchData("GET", urlUser, handleInfo);
  fetchData("GET", Urlreops, handlRepos);
  fetchData("GET", Urlreops, handlLang);
  fetchData("GET", Urlreops, handlStarts);
}

function handleInfo(data) {
  githubUserLink.href = data.html_url;
  githubUserHandle.innerText = data.login;
  githubUserAvatar.src = data.avatar_url;
  githubUserRepos.innerText = data.public_repos;
}

function handlRepos(data) {
  githubRepoLink.href = data[0].html_url;
  githubRepoName.textContent = data[0].name;
  githubRepoCreated.textContent = data[0].created_at;
  githubRepoOpenIssues.textContent = data[0].open_issues_count;
  githubRepoWatchers.textContent = data[0].watchers_count;
  fetchData("GET", data[0].contributors_url, handlContributions);
}

function handlLang(data) {
  const uniquelanguages = [...new Set(data.map((repo) => repo.language))];
  const languages = uniquelanguages.filter((lang) => lang != null);
  githubRepoLanguages.textContent = languages.join(", ");
}

function handlStarts(data) {
  let stars = 0;
  data.forEach((repo) => (stars += repo.stargazers_count));
  githubRepoStars.textContent = stars;
}

function handlContributions(data) {
  githubRepoContributors.textContent = data.map((contributor) => contributor.login).join(", ");
}
