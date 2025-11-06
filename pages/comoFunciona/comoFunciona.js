document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-link-btn');
    const feedbackSpan = document.getElementById('copy-feedback');
    const linkToCopy = 'https://easy-wallet-pi.vercel.app/';

    if (copyButton) {
        copyButton.addEventListener('click', () => {
            // Cria um elemento de textarea temporário
            const textArea = document.createElement('textarea');
            textArea.value = linkToCopy;

            // Evita que a página role ao colar
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.opacity = '0';

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                // Tenta copiar o texto
                const successful = document.execCommand('copy');
                if (successful) {
                    // Feedback visual
                    feedbackSpan.textContent = 'Link copiado!';
                    feedbackSpan.classList.add('show');
                    copyButton.classList.add('copied');
                    copyButton.innerHTML = '<i class="bi bi-check-lg"></i> Link Copiado!';

                    // Remove o feedback após 3 segundos
                    setTimeout(() => {
                        feedbackSpan.textContent = '';
                        feedbackSpan.classList.remove('show');
                        copyButton.classList.remove('copied');
                        copyButton.innerHTML = '<i class="bi bi-clipboard-check"></i> Copiar Link do Site';
                    }, 3000);
                } else {
                    feedbackSpan.textContent = 'Falha ao copiar.';
                    feedbackSpan.classList.add('show', 'error');
                    setTimeout(() => {
                        feedbackSpan.textContent = '';
                        feedbackSpan.classList.remove('show', 'error');
                    }, 3000);
                }
            } catch (err) {
                console.error('Erro ao copiar o link: ', err);
                feedbackSpan.textContent = 'Erro ao copiar.';
                feedbackSpan.classList.add('show', 'error');
                setTimeout(() => {
                    feedbackSpan.textContent = '';
                    feedbackSpan.classList.remove('show', 'error');
                }, 3000);
            }

            // Remove o textarea temporário
            document.body.removeChild(textArea);
        });
    }
});