// API URL
const API_URL = 'https://api.github.com/users/';



// get search input
const searchBtn = document.getElementById('search');
// add event listener
searchBtn.addEventListener('keyup', () => fetchUser());


// fetchUser function
const fetchUser = function () {
  const searchTerm = searchBtn.value; 

  if(searchTerm !== '') {
    getUserData(searchTerm);
    fetchRepos(searchTerm);
  } else {
    clearProfile();
  }
}



// fetch user data from github api
async function getUserData(username) {
    const res = await fetch(API_URL + username); 
    const data = await res.json();

    if(!res.ok) {
      catchError('Error fetching user data', 'alert alert-danger');
    }

    return showData(data);

}

// show user information
function showData(user) {
  // get profile document
  const profile = document.getElementById('profile');

  // get relevant information from user
  const {avatar_url, html_url, public_repos, public_gists, followers, following, usercompany, blog,location, created_at} = user;

  console.log(avatar_url); 

  profile.innerHTML = `
  <div clas="card card-body mb-3">
  <div class"row">
    <div class="col-md-3">
      <img class="img-fluid mb-2" src="${avatar_url}">
      <a href="${html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
    </div>
    <div class="col-md-9">
      <span class="badge badge-primary">Public Repos: ${public_repos}</span>
      <span class="badge badge-secondary">Public Gists: ${public_gists}</span>
      <span class="badge badge-success">Followers: ${followers}</span>
      <span class="badge badge-info">Following: ${following}</span>
      <br><br>
      <ul class="list-group">
        <li class="list-group-item">Company: ${usercompany}</li>
        <li class="list-group-item">Website/Blog: ${blog}</li>
        <li class="list-group-item">Location: ${location}</li>
        <li class="list-group-item">Member since: ${created_at}</li>
      </ul>
    </div>
  </div>
  </div>
  <h3 class="page-heading mb-3 mt-3">Latest Repos</h3>
  <div id="repos"></div>
  `; 
 
}




// handle erros section

// clear alerts
function clearAlerts() {
  const currentAlert = document.querySelector('.alert');

  if(currentAlert) {
    currentAlert.remove();
  }
}

// create alert for erros
function catchError(msg, className) {

  clearAlerts();

  const div = document.createElement('div');

  div.className = className;

  div.appendChild(document.createTextNode(msg));

  const parent = document.querySelector('.search-container');
  const subparent = document.querySelector('.searchBody');

  parent.insertBefore(div, subparent);

  setTimeout(function(){
   clearAlerts(); 
  }, 3000)
}

// clear profile error
function clearProfile() {
  const profile = document.getElementById('profile');

  profile.innerHTML = '';
}





// get repos from github api
async function fetchRepos(username) {
  const res = await fetch(API_URL + username + '/repos');

  const data = await res.json();

  return showRepos(data);
}

// function for showing repos
function showRepos(repos) {
  let output = '';

  repos.forEach( (repo) => {

    output += `
    <div class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </div>

          <div class="col-md-6">
          <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
          <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
          <span class="badge badge-success">Forks: ${repo.forks_count}</span>
          </div>
        </div>
      </div>
    `;
  })

  document.getElementById('repos').innerHTML = output;
}


