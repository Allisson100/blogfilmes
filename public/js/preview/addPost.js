// Arquivo addpost.handlebars
// Esse arquivo js, mostra o preview da imagem selecionada e troca os nomes do arquivo addpost.handlebars

    const text = document.getElementById("formPost-text")
    const inputFile = document.getElementById("file")

    const fileName = document.getElementById("formPost-fileName") //Para o input none

    const chooseImage = document.getElementById("formPost-chooseImage")
    const imageTag = document.getElementById("formPost-imageTag")

if (text == null || inputFile == null || fileName == null) {

} else {
    inputFile.addEventListener("change", changeImage)
    inputFile.addEventListener("change", nameFile)
}

function nameFile () {
    var name  = inputFile.files[0].name
    text.textContent = "File selected: " + name
    fileName.value = name
    console.log(fileName.value)
}

function changeImage (e) {
    const inputTarget = e.target
    const file = inputTarget.files[0]

    if (file) {
        chooseImage.innerHTML = "Change image"

        const reader = new FileReader()

        reader.addEventListener("load", function(e) {
            const readerTarget = e.target

            const img = document.createElement("img")
            img.src = readerTarget.result;
            img.classList.add("_root_formLabelImage")

            imageTag.innerHTML = ""

            imageTag.appendChild(img)

        })

        reader.readAsDataURL(file)
    }
}








