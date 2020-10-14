let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
  .then(response => {return response.json()})
  .then(function(object) {object.forEach(toy => {
    let cards = document.querySelector('div#toy-collection')
    let toyCard = document.createElement('div')
    let name = document.createElement('h2')
    let image = document.createElement('img')
    let likeNum = document.createElement('p')
    let likeButton = document.createElement('button')

    toyCard.className = "card"
    name.innerHTML = toy.name
    image.src = toy.image
    image.className = 'toy-avatar'
    likeNum.innerHTML = toy.likes + " Likes"
    likeButton.className = 'like-btn'
    likeButton.addEventListener('click', function() {
      console.log("Clicked like!")
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            likes: toy.likes + 1
          })
      }
      fetch('http://localhost:3000/toys/' + (toy.id), configObj)
      .then(response => response.json())
      .then(function(object) {
        card = document.querySelectorAll('div.card')[toy.id - 1]
        likes = card.querySelector('p')
        likes.innerHTML = object.likes + " Likes"
      })
      

    })
    likeButton.innerHTML = 'Like <3'


    toyCard.appendChild(name)
    toyCard.appendChild(image)
    toyCard.appendChild(likeNum)
    toyCard.appendChild(likeButton)
    cards.appendChild(toyCard)
  });

  })
});

document.addEventListener('submit', function(event) {
  event.preventDefault
  let fields = document.querySelectorAll('input')
  let name = fields[0].value
  let image = fields[1].value
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        name: name,
        image: image, 
        likes: 0
      })
  };

  fetch('http://localhost:3000/toys', configObj)

})
