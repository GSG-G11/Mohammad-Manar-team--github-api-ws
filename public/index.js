const url = "https://api.github.com/users/mohammadalhabil";
const reopsUrl = "https://api.github.com/users/mohammadalhabil/repos";

const handl = handlDom;
fetchData("GET", url, handl.Info);
fetchData("GET", reopsUrl, handl.Repos);
fetchData("GET", reopsUrl, handl.Langs);
fetchData("GET", reopsUrl, handl.Starts);

const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getData();
});
searchBtn.addEventListener("click", getData);

function getData() {
  const urlUser = `https://api.github.com/users/${input.value}`;
  const Urlreops = `https://api.github.com/users/${input.value}/repos`;

  fetchData("GET", urlUser, handl.Info);
  fetchData("GET", Urlreops, handl.Repos);
  fetchData("GET", Urlreops, handl.Langs);
  fetchData("GET", Urlreops, handl.Starts);
}


