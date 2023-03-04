const apiURL = "http://localhost:4000/api/tvshow/random";

const getNextShow = async () => {
  
  const res = await fetch(apiURL);
  const show = await res.json();

  const title = document.getElementById('title');
  title.innerText = `${show.name}`;

  const description = document.getElementById('description');
  description.innerText = `${show.description}`;

  const actors = document.getElementById('actors');
  actors.innerText = `${show.actors}`;

  const seasons = document.getElementById('seasons');
  seasons.innerText = `${show.seasons}`;
  
  $('#cover').find('img').attr('src', show.image)
};

//get first tv-show at initialization
getNextShow();

showForm.addEventListener("submit", (e) => {
  window.top.location = window.top.location
});

