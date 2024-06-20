const perguntas = [
    {
        pergunta: "O que é uma startup?",
        alternativas: [
            { opcoes: "Uma pequena empresa familiar", correta: false },
            { opcoes: "Uma empresa inovadora em estágio inicial", correta: true },
            { opcoes: "Uma grande corporação", correta: false },
            { opcoes: "Uma ONG sem fins lucrativos", correta: false }
        ]
    },
    {
        pergunta: "Qual é o principal objetivo de uma startup?",
        alternativas: [
            { opcoes: "Gerar lucros imediatos", correta: false },
            { opcoes: "Crescimento rápido e escalável", correta: true },
            { opcoes: "Manter uma base de clientes pequena", correta: false },
            { opcoes: "Evitar riscos a todo custo", correta: false }
        ]
    },
    {
        pergunta: "O que é um MVP (Produto Mínimo Viável)?",
        alternativas: [
            { opcoes: "Um produto finalizado e pronto para o mercado", correta: false },
            { opcoes: "Uma versão básica do produto para testar hipóteses", correta: true },
            { opcoes: "Um produto que nunca será lançado", correta: false },
            { opcoes: "Um produto com todas as funcionalidades planejadas", correta: false }
        ]
    },
    {
        pergunta: "O que é pivotar em uma startup?",
        alternativas: [
            { opcoes: "Continuar com o mesmo modelo de negócio", correta: false },
            { opcoes: "Abandonar o negócio", correta: false },
            { opcoes: "Alterar a direção do negócio com base em feedback", correta: true },
            { opcoes: "Reduzir o preço do produto", correta: false }
        ]
    },
    {
        pergunta: "Qual é a importância da validação de mercado?",
        alternativas: [
            { opcoes: "Evitar o desenvolvimento de produtos desnecessários", correta: true },
            { opcoes: "Aumentar os custos de desenvolvimento", correta: false },
            { opcoes: "Manter a equipe ocupada", correta: false },
            { opcoes: "Aumentar o tempo de lançamento", correta: false }
        ]
    },
    {
        pergunta: "O que significa 'burn rate' em uma startup?",
        alternativas: [
            { opcoes: "A taxa de crescimento do negócio", correta: false },
            { opcoes: "A quantidade de dinheiro gasto mensalmente", correta: true },
            { opcoes: "O lucro gerado pela empresa", correta: false },
            { opcoes: "O número de novos clientes adquiridos", correta: false }
        ]
    },
    {
        pergunta: "Qual é o papel de um investidor-anjo?",
        alternativas: [
            { opcoes: "Gerir a empresa diretamente", correta: false },
            { opcoes: "Oferecer capital e mentoria para startups", correta: true },
            { opcoes: "Comprar ações em empresas estabelecidas", correta: false },
            { opcoes: "Evitar riscos de investimento", correta: false }
        ]
    },
    {
        pergunta: "O que é 'equity' em uma startup?",
        alternativas: [
            { opcoes: "O valor total dos ativos da empresa", correta: false },
            { opcoes: "A participação acionária dos fundadores e investidores", correta: true },
            { opcoes: "Os lucros anuais da empresa", correta: false },
            { opcoes: "O capital de giro disponível", correta: false }
        ]
    },
    {
        pergunta: "Qual é a melhor maneira de obter feedback de clientes?",
        alternativas: [
            { opcoes: "Ignorar o feedback", correta: false },
            { opcoes: "Realizar entrevistas e testes com usuários", correta: true },
            { opcoes: "Apenas ouvir críticas positivas", correta: false },
            { opcoes: "Esperar que os clientes enviem feedback por conta própria", correta: false }
        ]
    },
    {
        pergunta: "Por que é importante ter um pitch bem elaborado?",
        alternativas: [
            { opcoes: "Para confundir os investidores", correta: false },
            { opcoes: "Para apresentar de forma clara e atraente a ideia da startup", correta: true },
            { opcoes: "Para garantir que ninguém entenda a proposta", correta: false },
            { opcoes: "Para evitar investimentos", correta: false }
        ]
    }
];

const questao = document.querySelector(".questao");
const respostas = document.querySelector(".respostas");
const perguntaIndice = document.querySelector(".qtd");
const final = document.querySelector(".final");
const botaoReiniciar = document.querySelector(".final button");
var audio = new Audio("acerto.mp3");
var audio2 = new Audio("negative_beeps-6008.mp3");

let indice = 0;
let score = 0;
let audioTimeout;

botaoReiniciar.onclick = reiniciarJogo;

function reiniciarJogo() {
    final.style.display = "none";
    indice = 0;
    score = 0;
    carregarPergunta();
}

function testarResposta(botaoSelecionado, correta) {
    const cor = correta ? "#289600" : "#9e243a";
    botaoSelecionado.style.backgroundColor = cor;
    Array.from(respostas.children).forEach(button => {
        button.dataset.correta === "true" && (button.style.backgroundColor = "#289600");
        button.disabled = true;
    });

    if (correta) {
        score += 100;
        audio.play();
    } else {
        score -= 50;
        if (score < 0) {
            score = 0;
        }
        audio2.play();
    }

    document.getElementById('score-atual').textContent = score;
}

function terminarJogo() {
    final.innerHTML = '<button onclick="reiniciarJogo()">Reiniciar</button>';
    final.style.display = "flex";
    final.querySelector(".resultado").textContent = `Seu score: ${score}`;
}

function perguntaOpcao(e) {
    const botaoSelecionado = e.target;
    const correta = botaoSelecionado.dataset.correta === "true";

    clearTimeout(audioTimeout);
    audioTimeout = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        audio2.pause();
        audio2.currentTime = 0;
    }, 1000);

    testarResposta(botaoSelecionado, correta);

    indice < perguntas.length ? setTimeout(carregarPergunta, 1000) : terminarJogo();
}

function carregarPergunta() {
    if (indice < perguntas.length) {
        const { pergunta, alternativas } = perguntas[indice];
        perguntaIndice.textContent = `${indice + 1}/${perguntas.length}`;
        questao.textContent = pergunta;
        respostas.innerHTML = "";

        embaralhar([...alternativas]).forEach(({ opcoes, correta }) => {
            const button = document.createElement("button");
            button.classList.add("opcoes");
            button.dataset.correta = correta;
            button.innerHTML = `<i class="fas fa-question-circle"></i> ${opcoes}`;
            if (correta) {
                button.innerHTML = `<i class="fas fa-check"></i> ${opcoes}`;
            } else {
                button.innerHTML = `<i class="fas fa-times"></i> ${opcoes}`;
            }
            button.addEventListener("click", perguntaOpcao);
            respostas.appendChild(button);
        });
    } else {
        terminarJogo();
        return;
    }

    indice++;
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

carregarPergunta();