document.addEventListener('DOMContentLoaded', () => {
    const answerButtons = document.querySelectorAll('.btn-answer');
    const nextButton = document.querySelector('.btn-next');
    let selectedValue = null;

    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'selected' de todos os botões
            answerButtons.forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' apenas ao botão clicado
            button.classList.add('selected');

            // Armazena o valor selecionado (do atributo data-value)
            selectedValue = button.dataset.value;

            // Opcional: Habilita o botão 'próximo'
            // nextButton.disabled = false; 
        });
    });

    nextButton.addEventListener('click', () => {
        if (selectedValue) {
            console.log('Valor selecionado:', selectedValue);
            // Lógica para ir para a próxima página
            // window.location.href = './pergunta-2.html'; // Exemplo
        } else {
            // Opcional: Avisar o usuário para selecionar uma opção
            console.log('Por favor, selecione uma opção.');
        }
    });
});