document.getElementById('info-button').addEventListener('click', function () {
    var kayllanInfo = document.getElementById('kayllan-info');
    var ellenInfo = document.getElementById('ellen-info');
    if (kayllanInfo.style.display === 'none') {
        kayllanInfo.style.display = 'flex';
        ellenInfo.style.display = 'none';
        this.textContent = 'Mostrar informações de Ellen';
    } else {
        kayllanInfo.style.display = 'none';
        ellenInfo.style.display = 'flex';
        this.textContent = 'Mostrar informações de Kayllan';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    var typewriterText = document.querySelector('.typewriter');
    setInterval(() => {
        typewriterText.classList.remove('typewriter');
        void typewriterText.offsetWidth;
        typewriterText.classList.add('typewriter');
    }, 7000);
});