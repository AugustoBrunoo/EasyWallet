// Script para lógica de seleção de múltipla escolha
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.btn-checkbox-answer input[type="checkbox"]');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Adiciona/remove a classe 'selected' no label pai quando o checkbox muda
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            checkbox.parentElement.classList.toggle('selected', checkbox.checked);
        });
    });

    // Navegação
    btnPrev.addEventListener('click', () => {
        // Redireciona para a pergunta anterior
        window.location.href = '../Questionário 1/questionario1.html';
    });

    btnNext.addEventListener('click', () => {
        const selectedValues = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                selectedValues.push(cb.value);
            }
        });

        console.log('Valores selecionados:', selectedValues);

        // Lógica para ir para a próxima página
        window.location.href = '../Questionário 3/questionario3.html';

        if (selectedValues.length === 0) {
            console.log('Por favor, selecione ao menos uma opção (ou clique em avançar se não possuir nenhuma).');
            // Se o usuário puder avançar sem ter nenhuma, remova este 'if'.
        }
    });
});