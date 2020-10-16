let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
    })
    .then(function(toys) {
      let toysHTML = toys.map(function(toy) {
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image}/>
          <p>${toy.likes} Likes </p>
          <button data-id="${toy.id}" class="like-btn">Like <3</button>
        </div>
        `
      })
      toyCollection.innerHTML += toysHTML.join('')
    })

  toyFormContainer.addEventListener("submit", function(e) {
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImg = e.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImg,
        likes: 3
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(newToy) {
      let newToyHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image}/>
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div>
      `
    toyCollection.innerHTML += newToyHTML
    })
  })

  toyCollection.addEventListener("click", (e) => {
    if (e.target.className === "like-btn") {
      let likeNum = parseInt(e.target.previousElementSibling.innerText)
      addLikes = likeNum + 1
      e.target.previousElementSibling.innerText = `${addLikes} likes`

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: addLikes
        })
      })
    }
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
