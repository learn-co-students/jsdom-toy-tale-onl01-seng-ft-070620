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
  getToys();
  listenForLikes();
});


function getToys () {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(list) {
    createCards(list);
  })
}

function createCards(list) {
  const collection = document.querySelector("#toy-collection")
  for (const toy of list) {
    collection.appendChild(newCard(toy))
  }
}

function newCard (toy) {
    let card = document.createElement("div")
    card.className = "card"  
    let h2 = document.createElement("h2");
    h2.innerHTML = toy.name;
    let img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";
    let p = document.createElement("p");
    p.innerHTML = `${toy.likes} Likes`;
    let button = document.createElement("button");
    button.className = "like-btn";
    button.innerHTML = "Like";
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    listenForLikes(button, toy);
    return card
};


document.querySelector(".add-toy-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  let toyObj = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  };

  fetch ("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    document.querySelector("#toy-collection").appendChild(newCard(object));
  })

  e.target.reset();
})


function listenForLikes(button, toy) {
  
    button.addEventListener("click", function(e) {
      
    
      let likes = e.target.parentElement.querySelector("p").innerHTML.split(" ")[0]

      let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": `${parseInt(likes) + 1}`
        })
      };



      fetch (`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(function(response) {
        return response.json()
      })
      .then(function(object) {
        e.target.parentElement.querySelector("p").innerHTML = `${object.likes} Likes`
      })
    })
  
}

