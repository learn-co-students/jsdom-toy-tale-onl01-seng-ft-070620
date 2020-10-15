let addToy = false;
let url = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys() {
  return fetch(url)
          .then(resp => resp.json())
          .then(jsObj => addToyCard(jsObj))
}

function postToy(toyData) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': toyData.name.value,
      'imageUrl': toyData.image.value,
      'likes': 0
    })
  })
}

function addToyCard(jsObj) {
  const card = document.getElementById('toy-collection')
  for (const element of jsObj) {
    let div = document.createElement('div')
    div.className = "card"
    let h2 = document.createElement('h2')
    h2.innerHTML = element.name
    let img = document.createElement('img')
    img.setAttribute('src', element.image)
    img.width = "180"
    img.height = "220"
    let p = document.createElement('p')
    p.innerHTML = element.likes + " likes"
    let button = document.createElement("button")
    button.className = "like-btn"
    button.setAttribute("id", element.id)
    button.innerHTML = "Like"
    button.addEventListener("click", likeUpdate)
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    card.appendChild(div)
  } 
}

function likeUpdate() {
  event.preventDefault()
  let likeElement = event.target.previousSibling
  let newLikes = parseInt(likeElement.innerText) + 1
  let id = event.target.id
  debugger
  likeElement.innerText = newLikes + " likes"
  sendLikes(id, newLikes)
}

function sendLikes(id, newLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
}