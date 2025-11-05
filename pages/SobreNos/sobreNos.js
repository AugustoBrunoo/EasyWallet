//Script para o Menu Mobile(Idêntico ao index.html)

// Adiciona um script simples para o menu mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navUl = navMenu.querySelector('ul');
    const loginDesktop = document.querySelector('.btn-login-desktop');

    if (menuToggleBtn && navMenu && navUl && loginDesktop) {

        // 1. Clonar o botão de login para o menu mobile
        const loginMobileBtn = loginDesktop.cloneNode(true);
        loginMobileBtn.classList.remove('btn-login-desktop');
        loginMobileBtn.classList.add('btn-login-mobile');
        loginMobileBtn.style.display = 'inline-block'; // Garante que é visível
        loginMobileBtn.style.margin = '0'; // Reseta margem

        // 2. Criar um item de lista (li) para o botão clonado
        const loginMobileLi = document.createElement('li');
        loginMobileLi.classList.add('btn-login-mobile-li'); // Classe para controlar visibilidade
        loginMobileLi.appendChild(loginMobileBtn);

        // 3. Adicionar o 'li' ao final da 'ul' do menu
        navUl.appendChild(loginMobileLi);

        // 4. Lógica do Toggle para abrir/fechar o menu
        menuToggleBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Alterna o ícone do botão
            const icon = menuToggleBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x');
            } else {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        });
    }

    // 5. Lógica de Redimensionamento (Resize)
    // Fecha o menu se a tela for redimensionada para desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggleBtn.querySelector('i');
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        }
    });
    
});
