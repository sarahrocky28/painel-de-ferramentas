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



const moeda = {
    Digitarvalor: document.querySelector("#Digitarvalor"),
    moedaOrigem: document.querySelector("#moedaOrigem"),
    convMoedas: document.querySelector("#convMoedas"),
    butConverter: document.querySelector("#butConverter"),
    resulMoeda: document.querySelector("#resulMoeda"),
}
console.log(moeda.Digitarvalor);
console.log(moeda.moedaOrigem);
console.log(moeda.convMoedas);
console.log(moeda.butConverter);
console.log(moeda.resulMoeda);


moeda.butConverter.addEventListener("click", (evento) => {
    evento.preventDefault();

    const valor = parseFloat(moeda.Digitarvalor.value);
    const origem = moeda.moedaOrigem.value;
    const destino = moeda.convMoedas.value;

    const taxaUSDparaBRL = 5.02;
    let resultado;

    if (origem === destino) {
        resultado = valor;
    } else if (origem === "USD" && destino === "BRL") {
        resultado = valor * taxaUSDparaBRL;
    } else if (origem === "BRL" && destino === "USD") {
        resultado = valor / taxaUSDparaBRL;
    } else {
        resultado = "Conversão não suportada";
    }

    moeda.resulMoeda.textContent = `Resultado: ${resultado.toFixed(2)}`;
});


