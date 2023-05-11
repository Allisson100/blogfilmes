const inputEditFile = document.getElementById("editFile")

const preview = document.getElementById("formEditPost-imageTag")
const chooseEditImage = document.getElementById("formEditPost-chooseImage")

const editText = document.getElementById("formEditPost-text")
const editFileName = document.getElementById("formEditPost-fileName")

if (preview == null || inputEditFile == null || chooseEditImage == null) {

} else {
    inputEditFile.addEventListener("change", changeEditImage)
    inputEditFile.addEventListener("change", nameEditFile)
}

function changeEditImage(e) {
    const inputTarget = e.target
    const file = inputTarget.files[0]

    if (file) {
        preview.innerHTML = ""
        // chooseEditImage.innerHTML = "Change image"

        const reader = new FileReader();

        reader.addEventListener("load", function(e) {
            
            const readerTarget = e.target

            const img = document.createElement("img")
            img.src = readerTarget.result;
            img.classList.add("_root_formLabelImage")

            

            preview.appendChild(img)

        })

        reader.readAsDataURL(file)
    }
}

function nameEditFile () {
    var name  = inputEditFile.files[0].name
    editText.textContent = "File selected: " + name
    editFileName.value = name
    console.log(editFileName.value)
}


