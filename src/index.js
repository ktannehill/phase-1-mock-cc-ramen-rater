// Steps
// 1. On page load, GET all ramen data
    // display ramen images in #ramen-menu - done
// 2. Click on ramen image and display in fo in #ramen-detail
    // including comment and rating - done
// 3. Create new ramen when #new-ramen submit
    //  add image to #ramen-menu; does not need persist - done
// bonus 1. Display first ramen on page load
// bonus 2. Update rating & comment for ramen with form #edit-ramen
    // does not need to persist - done
// bonus 3. Delete ramen - remove from menu and do not display on details



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
const editRamenForm = document.querySelector("#edit-ramen")



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
    // console.log(ramenObj)
    // debugger
    const image = document.createElement("img")
    image.src = ramenObj.image
    image.alt = ramenObj.name

    image.addEventListener("click", e => displayDetails(ramenObj))

    ramenMenu.append(image)
}

const validateFormData = (valuesArr) => {
    return valuesArr.every(el => el.trim() !== "")
}

const createNewRamen = (e) => {
    e.preventDefault()

    if(validateFormData([e.target.name.value, e.target.restaurant.value, e.target.image.value, e.target.rating.value, e.target["new-comment"].value])) {
        const newRamen = {
            name: e.target.name.value,
            restaurant: e.target.restaurant.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            comment: e.target["new-comment"].value
        }
    
        displayImages(newRamen)
        e.target.reset()
    } else {
        alert("Please complete submission!")
    }
}

const editRamen = (e) => {
    e.preventDefault()

    if(validateFormData([e.target.rating.value, e.target["new-comment"].value])) {
        const newRamen = {
            rating: e.target.rating.value,
            comment: e.target["new-comment"].value
        }
        rating.textContent = newRamen.rating
        comment.textContent = newRamen.comment
        e.target.reset()
    } else {
        alert("Please complete submission!")
    }
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
    .then(ramenDataArr => {
        displayDetails(ramenDataArr[0])
        ramenDataArr.forEach(displayImages)
    })
    .catch(err => alert(err))
}
getAllRamen()



// Event listeners
newRamenForm.addEventListener("submit", e => createNewRamen(e))
editRamenForm.addEventListener("submit", e => editRamen(e))



