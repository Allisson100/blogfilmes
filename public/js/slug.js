// Autocomplete all slugs from all files with slugs

const InputName = document.querySelector("[data-formpostTitle]")
const InputSlug = document.querySelector("[data-formpostSlug]")

if (InputName) {
    InputName.addEventListener("keyup", editPostSlugName)
}

function editPostSlugName () {
    if (InputSlug) {
        InputSlug.value = InputName.value.toLowerCase()
    }
}


