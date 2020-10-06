let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault();
        addNewToy(event.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {
    toys.forEach(toy => {
      displayToys(toy);
    })
  })
}

function addNewToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toy.name.value,
      image: toy.image.value,
      likes: 0
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    displayToys(object);
  })
}

function updateLike(event) {
  event.preventDefault();
  let numLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: numLikes
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    event.target.previousElementSibling.innerText = `${numLikes} likes`;
  })
}

function displayToys(toy) {
  const toyDiv = document.getElementById('toy-collection');
  const newDiv = document.createElement('div');
  newDiv.className = "card";
  const toyName = document.createElement('h2')
  toyName.textContent = toy.name;
  const toyImage = document.createElement('img');
  toyImage.src = toy.image;
  toyImage.className = "toy-avatar";
  const toyLikes = document.createElement('p');
  toyLikes.textContent = toy.likes + ' Likes';
  const toyButton = document.createElement('button');
  toyButton.className = "like-btn";
  toyButton.textContent = "Like <3";
  toyButton.setAttribute('id', `${toy.id}`)
  toyButton.addEventListener('click', function(event) {
    event.preventDefault();
    updateLike(event);
  });
  newDiv.appendChild(toyName);
  newDiv.appendChild(toyImage);
  newDiv.appendChild(toyLikes);
  newDiv.appendChild(toyButton);
  toyDiv.appendChild(newDiv);
}

getToys();