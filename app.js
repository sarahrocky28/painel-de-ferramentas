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

    let emCelsius;
    if (origem === "C") emCelsius = valor;
    else if (origem === "F") emCelsius = (valor - 32) * 5 / 9;
    else if (origem === "K") emCelsius = valor - 273.15;

    let resultado;
    if (destino === "C") resultado = emCelsius;
    else if (destino === "F") resultado = (emCelsius * 9 / 5) + 32;
    else if (destino === "K") resultado = emCelsius + 273.15;

    temp.resulTemp.textContent = `Resultado: ${resultado.toFixed(2)} ${destino};`
});


//*função de velocidade*//

const vel = {
    valor: document.querySelector("#velValor"),
    origem: document.querySelector("#velOrigem"),
    destino: document.querySelector("#velDestino"),
    butVel: document.querySelector("#butVel"),
    resulVel: document.querySelector("#resulVel"),
}

vel.butVel.addEventListener("click", () => {
    const valor = parseFloat(vel.valor.value);
    const origem = vel.origem.value;
    const destino = vel.destino.value;

    if (origem === "vazio" || destino === "vazio") {
        vel.resulVel.textContent = "Selecione as unidades!";
        return;
    }
    if (origem === destino) {
        vel.resulVel.textContent = `Resultado: ${valor} ${destino}`;
        return;
    }

    let emKmh;
    if (origem === "kmh") emKmh = valor;
    else if (origem === "ms") emKmh = valor * 3.6;
    else if (origem === "mph") emKmh = valor * 1.60934;

    let resultado;
    if (destino === "kmh") resultado = emKmh;
    else if (destino === "ms") resultado = emKmh / 3.6;
    else if (destino === "mph") resultado = emKmh / 1.60934;

    vel.resulVel.textContent = `Resultado: ${resultado.toFixed(4)} ${destino}`;
});

//*calculo de massas*//
const massa = {
    valor: document.querySelector("#massaValor"),
    origem: document.querySelector("#massaOrigem"),
    destino: document.querySelector("#massaDestino"),
    butMassa: document.querySelector("#butMassa"),
    resulMassa: document.querySelector("#resulMassa"),
}

massa.butMassa.addEventListener("click", () => {
    const valor = parseFloat(massa.valor.value);
    const origem = massa.origem.value;
    const destino = massa.destino.value;

    if (origem === "vazio" || destino === "vazio") {
        massa.resulMassa.textContent = "Selecione as unidades!";
        return;
    }
    if (origem === destino) {
        massa.resulMassa.textContent = `Resultado: ${valor} ${destino}`;
        return;
    }

    // Passo 1: converter para kg
    let emKg;
    if (origem === "kg") emKg = valor;
    else if (origem === "g") emKg = valor / 1000;
    else if (origem === "lb") emKg = valor * 0.453592;
    else if (origem === "oz") emKg = valor * 0.0283495;

    // Passo 2: converter de kg para o destino
    let resultado;
    if (destino === "kg") resultado = emKg;
    else if (destino === "g") resultado = emKg * 1000;
    else if (destino === "lb") resultado = emKg / 0.453592;
    else if (destino === "oz") resultado = emKg / 0.0283495;

    massa.resulMassa.textContent = `Resultado: ${resultado.toFixed(4)} ${destino}`;
});

//*regra de 3*//
const regra3 = {
    a: document.querySelector("#r3A"),
    b: document.querySelector("#r3B"),
    c: document.querySelector("#r3C"),
    x: document.querySelector("#r3X"),
    butRegra3: document.querySelector("#butRegra3"),
    resulRegra3: document.querySelector("#resulRegra3"),
}

regra3.butRegra3.addEventListener("click", () => {
    const a = parseFloat(regra3.a.value);
    const b = parseFloat(regra3.b.value);
    const c = parseFloat(regra3.c.value);

    if (!a || !b || !c || a === 0) {
        regra3.resulRegra3.textContent = "Preencha os três valores. O primeiro não pode ser zero.";
        return;
    }

    const x = (b * c) / a;
    regra3.x.textContent = x.toFixed(2);
    regra3.resulRegra3.textContent = `X = ${x.toFixed(2)}`;
});