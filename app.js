const elemento = {
    lista: document.querySelector("#lista"),
    section: document.querySelectorAll("section"),
}

console.log(elemento.lista);

elemento.lista.addEventListener("click", (evento) => {
    evento.preventDefault();
    const link = evento.target.closest("a");
    if (!link) return; // clicou em lugar sem link, ignora
    console.log(link.id);
    displayController(link.id);
});

function displayController(id) {
    elemento.section.forEach((section) => {
        if (!section.classList.contains("hidden")) {
            section.classList.add("hidden");
        }

        //Remove a classe "hidden" do item clicado
        if (section.classList.contains(id)) {
            section.classList.remove("hidden");
        }
    });
}

// const moeda = {
//     input: document.querySelector("input")
// }

// moeda.input.addEventListener("click", (evento) => {
//     evento.preventDefault();
// });
