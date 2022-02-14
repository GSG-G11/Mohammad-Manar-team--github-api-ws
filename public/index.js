/* let's go! */
function fetchData(methode,url,cb){
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange =()=>{
        if(xhr.readyState === 4 && xhr.status === 200){
            const repoObj = JSON.parse(xhr.responseText)
            console.log(repoObj)
            cb(repoObj)
        }

    }
    xhr.open(methode , url);
    xhr.send();
}
//set the Api links 
const url = `https://api.github.com/users/manar-abed`
const repourl = `https://api.github.com/users/manar-abed/repos`

//get html ele 
const name = document.querySelector('#github-user-handle')
const userimg = document.querySelector('#github-user-avatar')
const numofRepo = document.querySelector('#github-user-repos')
const langRepo = document.querySelector('#github-repos-languages')
const repostars = document.querySelector('#github-repos-stars')
const reponame = document.querySelector('#github-repo-name')
const repocreated = document.querySelector('#github-repo-created')
const repoissues = document.querySelector('#github-repo-open-issues')
const repowatchers = document.querySelector('#github-repo-watchers')
const repocontributors = document.querySelector('#github-repo-contributors')

//get data from JSON obj and put it into HTML ele 
function handelDom(data){
   name.innerText = data.name;
   userimg.src = data.avatar_url;
   numofRepo.innerHTML=data.public_repos;
}
const handelDetails = (data) => {
    let languages = []
    let star = 0
    data.forEach(repo => {
        languages.push(repo.language)
        star += repo.stargazers_count
    });
    repostars.textContent = star
    langRepo.textContent= languages.join(',')
 }
const TopRepo = (data) => {
    reponame.innerText = data[0].name;
    repocreated.innerText = data[0].created_at;
    repoissues.innerText = data[0].open_issues_count;
    repowatchers.innerText = data[0].watchers_count;
    fetchData('GET',data[0].contributors_url,Contributors)
}
const Contributors = (data) => {
    const contributors = []
    data.forEach(contributor =>{
        contributors.push(contributor.login)
    })
    repocontributors.textContent= contributors.join(',')
}

//invoke fetch fun 
fetchData('GET' , url , handelDom)
fetchData('GET' , repourl , handelDetails)
fetchData('GET' , repourl , TopRepo)
