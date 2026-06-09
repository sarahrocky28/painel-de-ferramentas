const elemento = {
    lista: document.querySelector("#lista"),
    section: document.querySelectorAll("section"),
}

console.log(elemento.lista);

elemento.lista.addEventListener("click", (evento) => {
    evento.preventDefault();
    const link = evento.target.closest("a");
    if (!link) return;
    console.log(link.id);
    displayController(link.id);
});

function displayController(id) {
    elemento.section.forEach((section) => {
        section.classList.add("hidden"); //*esconde todas
        if (section.classList.contains(id)) {
            section.classList.remove("hidden"); //*mostra só a clicada
        }
    });
}


//*conversão de moedas*//
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


moeda.butConverter.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const valor = parseFloat(moeda.Digitarvalor.value);
    const origem = moeda.moedaOrigem.value;
    const destino = moeda.convMoedas.value;

    if (origem === "dindin" || destino === "dindin") {
        moeda.resulMoeda.textContent = "Selecione as moedas!";
        return;
    }

    if (origem === destino) {
        moeda.resulMoeda.textContent = `Resultado: ${valor}`;
        return;
    }

    try {
        const resposta = await fetch(`https://economia.awesomeapi.com.br/last/${origem}-${destino}`);
        const dados = await resposta.json();
        const chave = `${origem}${destino}`;
        const taxa = parseFloat(dados[chave].bid);
        const resultado = (valor * taxa).toFixed(2);
        moeda.resulMoeda.textContent = `Resultado: ${resultado} ${destino}`;
    } catch (erro) {
        moeda.resulMoeda.textContent = "Erro ao buscar a taxa. Tente novamente.";
        console.error(erro);
    }
});



//*conversão pra IMC*//

const imc = {
    peso: document.querySelector("#imcPeso"),
    altura: document.querySelector("#imcAltura"),
    butImc: document.querySelector("#butImc"),
    resulImc: document.querySelector("#resulImc"),
}

imc.butImc.addEventListener("click", () => {
    const peso = parseFloat(imc.peso.value);
    const altura = parseFloat(imc.altura.value);

    if (!peso || !altura || altura <= 0) {
        imc.resulImc.textContent = "Preencha peso e altura corretamente.";
        return;
    }

    const resultado = peso / (altura * altura);

    let categoria;
    if (resultado < 18.5) categoria = "Abaixo do peso";
    else if (resultado < 25) categoria = "Peso normal";
    else if (resultado < 30) categoria = "Sobrepeso";
    else categoria = "Obesidade";

    imc.resulImc.textContent = `IMC: ${resultado.toFixed(2)} — ${categoria}`;
});


//*conversão 

