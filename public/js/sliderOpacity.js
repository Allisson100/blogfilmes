const flag = document.getElementById("flag")

window.addEventListener("load", start)
var timer = 4000


const images = document.querySelectorAll(".carrousel-image")

var currentImage = 0
var max = images.length

// start()

function start () {
    if(flag) {
        setInterval (() => {
            nextImage()
        }, timer)
    }
}

function nextImage() {

    images[currentImage].classList.remove("selected")

    currentImage++

    if(currentImage >= max) {
        currentImage = 0
    }

    images[currentImage].classList.add("selected")
}



