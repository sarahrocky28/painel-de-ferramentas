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
    genero: document.querySelector("#imcGenero"),
    peso: document.querySelector("#imcPeso"),
    altura: document.querySelector("#imcAltura"),
    butImc: document.querySelector("#butImc"),
    resulImc: document.querySelector("#resulImc"),
}

imc.butImc.addEventListener("click", () => {
    const genero = imc.genero.value;
    const peso = parseFloat(imc.peso.value);
    const altura = parseFloat(imc.altura.value);

    // Validações separadas e específicas
    if (!genero || genero === "escolher") {
        imc.resulImc.textContent = "Selecione o seu gênero biológico.";
        return;
    }
    if (!peso || peso <= 0) {
        imc.resulImc.textContent = "Preencha o peso corretamente.";
        return;
    }
    if (!altura || altura <= 0) {
        imc.resulImc.textContent = "Preencha a altura corretamente.";
        return;
    }

    const resultado = peso / (altura * altura);

    let categoria;

    if (genero === "masculino") {
        if (resultado < 20.7) categoria = "Abaixo do peso";
        else if (resultado < 26.4) categoria = "Peso normal";
        else if (resultado < 27.8) categoria = "Sobrepeso leve";
        else if (resultado < 31.1) categoria = "Sobrepeso moderado";
        else if (resultado < 35.1) categoria = "Obesidade";
        else categoria = "Obesidade mórbida";
    } else {
        if (resultado < 19.1) categoria = "Abaixo do peso";
        else if (resultado < 25.8) categoria = "Peso normal";
        else if (resultado < 27.3) categoria = "Sobrepeso leve";
        else if (resultado < 32.3) categoria = "Sobrepeso moderado";
        else if (resultado < 35.1) categoria = "Obesidade";
        else categoria = "Obesidade mórbida";
    }

    imc.resulImc.textContent = `IMC: ${resultado.toFixed(2)} — ${categoria}`;
});

//*conversão de temperatura*//

const temp = {
    valor: document.querySelector("#tempValor"),
    origem: document.querySelector("#tempOrigem"),
    destino: document.querySelector("#tempDestino"),
    butTemp: document.querySelector("#butTemp"),
    resulTemp: document.querySelector("#resulTemp"),
}

temp.butTemp.addEventListener("click", () => {
    const valor = parseFloat(temp.valor.value);
    const origem = temp.origem.value;
    const destino = temp.destino.value;

    if (origem === "vazio" || destino === "vazio") {
        temp.resulTemp.textContent = "Selecione as unidades!";
        return;
    }
    if (origem === destino) {
        temp.resulTemp.textContent = `Resultado: ${valor} °${destino};`
        return;
    }

    // Passo 1: converter o valor para Celsius
    let emCelsius;
    if (origem === "C") emCelsius = valor;
    else if (origem === "F") emCelsius = (valor - 32) * 5 / 9;
    else if (origem === "K") emCelsius = valor - 273.15;

    // Passo 2: converter de Celsius para o destino
    let resultado;
    if (destino === "C") resultado = emCelsius;
    else if (destino === "F") resultado = (emCelsius * 9 / 5) + 32;
    else if (destino === "K") resultado = emCelsius + 273.15;

    temp.resulTemp.textContent = `Resultado: ${resultado.toFixed(2)} ${destino};`
});
