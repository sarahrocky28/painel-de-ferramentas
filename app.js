const elemento = {
    aside: documento.querySelector("aside"),
    section: document.querySelectorAll("section"),
}

console.log(elemento.aside);

elemento.aside.addEventListener("click", (evento) => {
    evento.preventDefault();
    console.log(evento.target.id);
    displayController(evento.target.id)
});

function displayController(id) {
    elemento.sections.array.forEach((section) => {
        if (!section.classList.contains("hidden")) {
            section.classList.add("hidden");
        }

        //Remove a classe "hidden" do item clicado
        if (section.classList.contains(id))
            section.classList.remove
    });
}