// Steps
// 1. On page load, GET all ramen data
    // display ramen images in #ramen-menu - done
// 2. Click on ramen image and display in fo in #ramen-detail
    // including comment and rating - done


// Global variables
const RAMENURL = "http://localhost:3000/ramens"
const ramenMenu = document.querySelector("#ramen-menu")
const ramenDetails = document.querySelector("#ramen-detail")
const ramenImg = document.querySelector("img.detail-image")
const ramenName = document.querySelector("h2.name")
const restaurant = document.querySelector("h3.restaurant")
const rating = document.querySelector("#rating-display")
const comment = document.querySelector("#comment-display")
const newRamenForm = document.querySelector("#new-ramen")


// Helper functions
const displayDetails = (ramenObj) => {
    ramenImg.src = `${ramenObj.image}`
    ramenImg.alt = ramenObj.name
    ramenName.textContent = ramenObj.name
    restaurant.textContent = ramenObj.restaurant
    rating.textContent = ramenObj.rating
    comment.textContent = ramenObj.comment
}

const displayImages = (ramenObj) => {
    const image = document.createElement("img")
    image.src = ramenObj.image
    image.alt = ramenObj.name

    image.addEventListener("click", e => displayDetails(ramenObj))

    ramenMenu.append(image)
}


// Fetch requests
const getAllRamen = () => {
    fetch(RAMENURL)
    .then(resp => {
        if(resp.ok) {
            return resp.json()
        } else {
            throw(err)
        }
    })
    .then(ramenDataArr => ramenDataArr.forEach(displayImages))
    .catch(err => alert(err))
}
getAllRamen()


// Event listeners
