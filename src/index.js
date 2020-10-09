// hide new toy form
let addToy = false;
const toyUrl = "http://localhost:3000/toys"

// functions
function postToy(toyName, toyImgUrl) {
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImgUrl,
      likes: 0
    })
  })
  .then(resp => {return resp.json()})
  .then(toy => {
    console.log(toy)
    // buildToyCard(toy)
  })
  .catch(error => {
    alert("something went wrong with that toy")
    console.log(error.message)
  })
}

function loadToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => {return resp.json()})
  .then(toyIndex => {
    addToysToDOM(toyIndex)
  })
}

function addToysToDOM(toys) {
  for (const toy of toys) {
    buildToyCard(toy)
  }
}

function buildToyCard(toy) { 
  const card = document.getElementById("toy-collection").appendChild(document.createElement("div"))
  card.dataset.toyId = toy.id
  const toyName = card.appendChild(document.createElement('h2'))
  const toyAvatar = card.appendChild(document.createElement('img'))
  const toyLikes = card.appendChild(document.createElement('p'))
  const likeBtn = card.appendChild(document.createElement('button'))

  card.setAttribute("class", "card")
  toyAvatar.setAttribute("class", "toy-avatar")
  toyAvatar.setAttribute("src", toy.image)
  likeBtn.setAttribute("class", "like-btn")

  toyLikes.innerHTML = `<span>${toy.likes}</span> like`
  if (toy.likes != 1) {toyLikes.innerHTML += 's'}
  likeBtn.textContent = "Like <3"
  toyName.textContent = toy.name

  listenForLike(likeBtn, toy)
}

function listenForLike(btn, toy) {
  btn.addEventListener('click', (e) => {
    toy.likes += 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes
      })
    })
    .then(resp => {return resp.json()})
    .then(toy => {
      updateLikes(toy)
    })
  })
}

function updateLikes(toy) {
  const card = document.querySelector(`[data-toy-id='${toy.id}']`)
  card.querySelector('p').querySelector('span').textContent = toy.likes
}

// stuff for when document loads
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toySubmit = document.querySelector(".submit")
  const toyForm = document.querySelector('form')
  const inputFields = document.querySelectorAll(".input-text")
  loadToys()
  
  // form hide and seek
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // submit listener
  toySubmit.addEventListener('click', (e) => {
    e.preventDefault()
    toyName = inputFields[0].value
    toyImgUrl = inputFields[1].value
    postToy(toyName, toyImgUrl)
  })

});
