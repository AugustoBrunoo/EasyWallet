// Script para lógica de seleção de resposta única
document.addEventListener('DOMContentLoaded', () => {
    const answerButtons = document.querySelectorAll('.btn-answer-dark');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    let selectedValue = null;

    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'selected' de todos os botões
            answerButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' apenas ao botão clicado
            button.classList.add('selected');

            // Armazena o valor selecionado (do atributo data-value)
            selectedValue = button.dataset.value;
        });
    });

    // Navegação
    btnPrev.addEventListener('click', () => {
        // Redireciona para a pergunta anterior
        window.location.href = '../Questionário 2/questionario2.html';
    });

    btnNext.addEventListener('click', () => {
        if (selectedValue) {
            console.log('Valor selecionado:', selectedValue);
            // Lógica para ir para a próxima página
            window.location.href = '../Resultado/resultado.html';
        } else {
            console.log('Por favor, selecione uma opção.');
        }
    });
});