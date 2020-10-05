let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  addNewToy();
  increaseLike();
});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    displayToys(object);
  })
}

function addNewToy() {
  const submitToy = document.querySelector('input[type=submit]');
  submitToy.addEventListener('click', () => {
    const nameValue = document.getElementsByClassName('input-text')[0].value;
    const imageValue = document.getElementsByClassName('input-text')[1].value;
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: nameValue,
        image: imageValue
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      displayToys(object);
    })
  })
}

function increaseLike() {
  const likeArray = document.getElementsByClassName('like-btn');
  for (let element of likeArray) {
    element.addEventListener('click', () => {
      let increase = element.likes + 1
      fetch(`http://localhost:3000/toys/${element.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: increase
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object);
      })
    })
  }
}

function displayToys(object) {
  const toyDiv = document.getElementById('toy-collection')
  for (const element of object) {
    const newDiv = document.createElement('div');
    newDiv.className = "card";
    const toyName = document.createElement('h2')
    toyName.textContent = element.name;
    const toyImage = document.createElement('img');
    toyImage.src = element.image;
    toyImage.className = "toy-avatar";
    const toyLikes = document.createElement('p');
    toyLikes.textContent = element.likes + ' Likes';
    const toyButton = document.createElement('button');
    toyButton.className = "like-btn";
    toyButton.textContent = "Like <3";
    newDiv.appendChild(toyName);
    newDiv.appendChild(toyImage);
    newDiv.appendChild(toyLikes);
    newDiv.appendChild(toyButton);
    toyDiv.appendChild(newDiv);
  }
}