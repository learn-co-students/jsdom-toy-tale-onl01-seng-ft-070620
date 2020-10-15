let addToy = false;
const myImage = "http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png"
const form = document.getElementsByClassName("add-toy-form")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection");
// const likeButton = document.querySelectorAll(".like-btn")

function getToys(){
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
    })
    .then(function(jsObj) {
      jsObj.forEach(key => {

        const toy = toyCollection.appendChild(document.createElement("div"));
        toy.className = "card";

        const h2 = toy.appendChild(document.createElement("h2"));
        h2.innerHTML = key.name;

        const img = toy.appendChild(document.createElement("img"));
        img.className = "toy-avatar";
        img.src = key.image;

        const p = toy.appendChild(document.createElement("p"));
        p.innerHTML = `${key.likes} Likes`

        const button = toy.appendChild(document.createElement("button"));
        button.className = "like-btn"
        button.innerHTML = "Like <3"
        button.id = key.id
        button.addEventListener('click', (event) => {
          event.preventDefault()
          likes(event)
        })
      })
    })
    .catch(function(error) {
      console.log(error.message)
    })
}


function likes(event) {
  event.preventDefault()
  debugger
    const numOfLikes = event.target.previousElementSibling.innerText.split(" ")[0]
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"likes": numOfLikes})
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        numOfLikes++
        // debugger
        console.log(response.likes)
      })
}

function addNewToy(name, image) {

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ name: name, image: image, likes: 0})
  };
  
  return fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object)
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getToys()

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      form[0].addEventListener("submit", event => {
        event.preventDefault()
        const inputOne = document.querySelectorAll(".input-text")[0].value
        const inputTwo = document.querySelectorAll(".input-text")[1].value
        addNewToy(inputOne, inputTwo)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});