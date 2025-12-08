document.addEventListener('DOMContentLoaded', () => {

    // Seleção dos elementos
    const modal = document.getElementById('logoutModal');
    const openBtn = document.getElementById('btn-open-logout');
    const cancelBtn = document.getElementById('btn-cancel-logout');
    const confirmBtn = document.getElementById('btn-confirm-logout');

    const openModal = () => {
        modal.classList.add('active');
    };

    
    const closeModal = () => {
        modal.classList.remove('active');
    };

    
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            // Lógica de logout
            console.log("Usuário desconectado");
            window.location.href = '../../index.html';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});