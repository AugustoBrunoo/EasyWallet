// --- NOVO SCRIPT: Mostrar Senha ---
const showPasswordCheckbox = document.getElementById('show-password');
const passwordInput = document.getElementById('password');

if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener('change', function () {
        // Se o checkbox estiver marcado, mude o tipo para 'text', senão, para 'password'
        passwordInput.type = this.checked ? 'text' : 'password';
    });
}