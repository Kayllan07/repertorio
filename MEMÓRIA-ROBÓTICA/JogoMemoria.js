const cartas = [
    'arduino', 'arduino',
    'led', 'led',
    'protob', 'protob',
    'relé', 'relé',
    'sensor', 'sensor',
    'multim', 'multim'
];

const jogoMemoria = document.getElementById('jogo-memoria');
const reiniciarBtn = document.getElementById('reiniciar-btn');
const iniciarBtn = document.getElementById('iniciar-btn');

let cartasViradas = [];
let cartasIguais = [];

function embaralhar(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function criarCarta(nomeCarta) {
    const carta = document.createElement('div');
    carta.classList.add('cartao');
    carta.dataset.nomeCarta = nomeCarta;

    const frente = document.createElement('div');
    frente.classList.add('frente');
    frente.style.backgroundImage = `url('IMAGENS-2/${nomeCarta}.png')`;

    const verso = document.createElement('div');
    verso.classList.add('verso');

    carta.appendChild(frente);
    carta.appendChild(verso);

    carta.addEventListener('click', virarCarta);

    return carta;
}

function virarCarta() {
    if (cartasViradas.length < 2 && !cartasViradas.includes(this) && !cartasIguais.includes(this)) {
        this.classList.add('virada');
        cartasViradas.push(this);

        if (cartasViradas.length === 2) {
            setTimeout(verificarIguais, 1000);
        }
    }
}

function verificarIguais() {
    const [carta1, carta2] = cartasViradas;
    if (carta1.dataset.nomeCarta === carta2.dataset.nomeCarta) {
        carta1.classList.add('iguais');
        carta2.classList.add('iguais');
        cartasIguais.push(carta1, carta2);
        if (cartasIguais.length === cartas.length) {
            setTimeout(() => alert('Parabéns, você venceu!'), 500);
        }
    } else {
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');
    }
    cartasViradas = [];
}

function reiniciarJogo() {
    jogoMemoria.innerHTML = '';
    cartasIguais = [];
    cartasViradas = [];
    iniciarJogo();
}

function iniciarJogo() {
    const cartasEmbaralhadas = embaralhar(cartas.slice());
    cartasEmbaralhadas.forEach(carta => {
        const novaCarta = criarCarta(carta);
        jogoMemoria.appendChild(novaCarta);
    });
    reiniciarBtn.style.display = 'block';
}

reiniciarBtn.addEventListener('click', reiniciarJogo);
iniciarBtn.addEventListener('click', iniciarJogo);

iniciarBtn.addEventListener('click', function () {
    document.getElementById('iniciar-jogo').style.display = 'none';
});
