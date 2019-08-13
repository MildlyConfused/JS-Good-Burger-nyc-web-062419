document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  getBurgers()
  const menu = document.querySelector("#burger-menu")

  menu.addEventListener("click", function(e) {
    if (e.target.innerText == "Add to Order") {
      const burgerName = e.target.parentElement.children[0].innerText
      addToOrder(burgerName)
    }
  })
  const form = document.querySelector("#custom-burger")
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    postNewBurger(e.target)
  })
  form.reset()
})

function getBurgers() {
  fetch(`http://localhost:3000/burgers`)
    .then(resp => resp.json())
    .then(function(json) {
      addBurgersToMenu(json)
    })
}

function addBurgersToMenu(burgers) {
  const menu = document.querySelector("#burger-menu")
  menu.innerHTML = ""
  let menuContent = ""
  burgers.forEach(burger => {
    menuContent += makeBurger(burger)
  })
  menu.innerHTML = menuContent
}

function makeBurger(burger) {
  return `
  <div class="burger">
  <h3 class="burger_title">${burger.name}</h3>
    <img src="${burger.image}">
    <p class="burger_description">
      ${burger.description}
    </p>
    <button class="button">Add to Order</button>
</div>
  `
}

function addToOrder(name) {
  const order = document.querySelector("#order-list")
  order.innerHTML += `<li>${name}</li>`
}

function postNewBurger(form) {
  const name = form.name.value
  const description = form.description.value
  const image = form.url.value
  fetch("http://localhost:3000/burgers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      description: description,
      image: image
    })
  })
    .then(resp => resp.json())
    .then(getBurgers())
}
