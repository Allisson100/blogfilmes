const mpFile = document.getElementById("mpFile")

if(mpFile) {
    mpFile.addEventListener("change", mpChangeImage)
}

let mpBannerPreview = ""
let mpBtChooseImage = ""
let mpLabelImage = ""


function mpChangeImage (e) {

    getElements(e)

    mpLabelImage.innerHTML = ""

    var teste = []

    var files = e.target.files
    var filesLength = files.length

    for (let i = 0; i < filesLength; i++) {
        teste.push(files[i])
    }

    if(teste.length > 0) {
        const imgElement = mpLabelImage.querySelectorAll("img")
        imgElement.forEach(e => e.parentNode.removeChild(e))

        teste.forEach((element) => {
            previewImage(element)  
        })
    }       
}

function previewImage(element) {
    mpBtChooseImage.innerHTML = "Change the Banners"

    const reader = new FileReader();

    reader.addEventListener("load", function(e) {


        

        const img = document.createElement("img")

        const readerTarget = e.target.result

        img.src = readerTarget

        mpLabelImage.appendChild(img)

    })

    reader.readAsDataURL(element)
}

function getElements(e) {
    mpBannerPreview = e.target.parentNode
    mpBtChooseImage = mpBannerPreview.querySelector("[data-inputSelected]")
    mpLabelImage = mpBannerPreview.querySelector("[data-mpLabelImage]")
}
