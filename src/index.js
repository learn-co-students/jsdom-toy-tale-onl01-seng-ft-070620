let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        submitNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetchAllToys()

function fetchAllToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {toys.forEach(toy => renderToys(toy))
  })
} 

function renderToys (toy) {
  const toyDiv = document.getElementById("toy-collection")
  let newToy = document.createElement('div')
  newToy.classList.add('card')

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let image = document.createElement('img')
  image.src = toy.image
  image.classList.add('toy-avatar')

  let pgh = document.createElement('p')
  pgh.innerText = toy.likes+" Likes"

  let btn = document.createElement('button')
  btn.classList.add("like-btn")
  btn.id = toy.id
  btn.innerText = "Like <3"
  btn.addEventListener('click', (event) => {
    // debugger
    // console.log(event.target.dataset)
    addOneLike(event)
  })

  toyDiv.append(newToy)
  newToy.append(h2, image, pgh, btn)
}

function submitNewToy(toyData) {
  // debugger
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toyData.name.value, 
      "image": toyData.image.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(toyObj => renderToys(toyObj)
  )
}

function addOneLike(event) {
  event.preventDefault()
  let plusOne = parseInt(event.target.previousElementSibling.innerHTML) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": plusOne
    })
  })
  .then(response => response.json())
  .then(updateLikeObj => {
    event.target.previousElementSibling.innerText = `${plusOne} Likes`
  })
}



