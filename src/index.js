let addToy = false;
let toyForm = document.querySelector("form.add-toy-form")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  // make a GET request to fetch the toys
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => seedToys(json))
})

// invokes createToy() for each toy
function seedToys(toys) {
  toys.forEach(toy => createToy(toy))
}

// invokes postToy() upon new toy submission
toyForm.addEventListener("submit", e => {
  e.preventDefault()
  postToy(e.target)
  toyForm.reset() // clears out the form after toy creation
})

// sends a POST request via fetch and returns an object
// invokes createToy() and passes the returned object as an argument
function postToy(toy) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy["name"].value,
      "image": toy["image"].value,
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configObj)
  .then(response => response.json())
  .then(json => createToy(json))
}

// creates a toy object from the given argument and adds it to the page
function createToy(toy) {
  const collection = document.querySelector("div#toy-collection")

  const card = document.createElement("div")
  card.setAttribute("class", "card")

  const header = document.createElement("h2")
  header.innerText = toy["name"]

  const likes = document.createElement("p")
  likes.innerText = "0 likes"

  const img = document.createElement("img")
  img.src = toy["image"]
  img.setAttribute("class", "toy-avatar")

  const btn = document.createElement("button")
  btn.innerText = "Like <3"
  btn.setAttribute("class", "like-btn")
  btn.setAttribute("id", toy["id"]) // need id for like event listener
  btn.addEventListener("click", e => addLike(e))

  card.append(header, likes, img, btn)
  collection.appendChild(card)
}

// sends a PATCH request via fetch()
// increments the given toy's likes by 1
function addLike(toy) {
  const currentToy = toy.target.parentElement
  const likesPlusOne = parseInt(currentToy.querySelector("p").innerText.split(" ")[0]) + 1

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likesPlusOne
    })
  }

  fetch(`http://localhost:3000/toys/${toy.target.id}`, configObj)
  .then(response => response.json())
  .then(json => currentToy.querySelector("p").innerText = `${likesPlusOne} likes`)
}
