document.addEventListener('DOMContentLoaded', function () {

    // --- Outros scripts do dashboard (ex: fechar alerta) ---
    const alertBox = document.querySelector('.alert-box');
    if (alertBox) {
        const closeBtn = alertBox.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                alertBox.style.display = 'none';
            });
        }
    }

});