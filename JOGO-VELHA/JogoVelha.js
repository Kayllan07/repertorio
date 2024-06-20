const botoes = document.querySelectorAll('.quadrado');
let jogadorAtual = '';
let jogoAtivo = true;

const checarVencedor = () => {
    const combinacoesVencedoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (
            botoes[a].classList.contains(jogadorAtual) &&
            botoes[b].classList.contains(jogadorAtual) &&
            botoes[c].classList.contains(jogadorAtual)
        ) {
            return true;
        }
    }
    return false;
};

const checarEmpate = () => {
    return Array.from(botoes).every(botao =>
        botao.classList.contains('html') || botao.classList.contains('css')
    );
};

const reiniciarJogo = () => {
    botoes.forEach(botao => {
        botao.classList.remove('html', 'css');
        botao.style.backgroundColor = '';
    });
    document.getElementById('escolherModal').style.display = 'block';
    jogoAtivo = true;
};

const escolherJogador = (jogador) => {
    jogadorAtual = jogador;
    document.getElementById('jogadorAtual').textContent = jogadorAtual.toUpperCase();
    document.getElementById('escolherModal').style.display = 'none';
};

const mostrarMensagem = (mensagem) => {
    document.getElementById('mensagem').textContent = mensagem;
    document.getElementById('mensagemModal').style.display = 'block';
    jogoAtivo = false;
};

const fecharModal = () => {
    document.getElementById('mensagemModal').style.display = 'none';
};

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        if (!jogoAtivo || document.getElementById('mensagemModal').style.display === 'block') {
            return;
        }

        if (!botao.classList.contains('html') && !botao.classList.contains('css')) {
            botao.classList.add(jogadorAtual);
            if (checarVencedor()) {
                setTimeout(() => {
                    mostrarMensagem(`Jogador ${jogadorAtual.toUpperCase()} venceu!`);
                    reiniciarJogo();
                }, 100);
            } else if (checarEmpate()) {
                setTimeout(() => {
                    mostrarMensagem('Deu velha! É um empate!');
                    reiniciarJogo();
                }, 100);
            } else {
                jogadorAtual = jogadorAtual === 'html' ? 'css' : 'html';
                document.getElementById('jogadorAtual').textContent = jogadorAtual.toUpperCase();
            }
        }
    });
});

window.addEventListener('keydown', (event) => {
    if (document.getElementById('mensagemModal').style.display === 'block') {
        event.preventDefault();
    }
});

window.onload = () => {
    reiniciarJogo();
};
