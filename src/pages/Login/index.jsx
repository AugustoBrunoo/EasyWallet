import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page-container">
            {/* Elementos de Fundo */}
            <div className="bg-glow bg-glow-1"></div>
            <div className="bg-glow bg-glow-2"></div>

            <Link to="/" className="back-link">
                <i className="bi bi-arrow-left"></i> Voltar ao início
            </Link>

            <div className="login-wrapper">
                <div className="login-glass">
                    <div className="login-header">
                        <Link to="/" className="logo">
                            <span className="logo-mark"><i className="bi bi-wallet2"></i></span>
                            <span>EasyWallet</span>
                        </Link>
                        <h1>Bem-vindo de volta</h1>
                        <p>Insira seus dados para acessar o seu painel.</p>
                    </div>

                    <form action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="email">E-mail corporativo</label>
                            <input type="email" id="email" className="form-control" placeholder="voce@empresa.com.br" required />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <div className="input-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    className="form-control" 
                                    placeholder="••••••••" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    aria-label="Mostrar senha"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked />
                                <span>Lembrar de mim</span>
                            </label>
                            <a href="#" className="forgot-pass">Esqueceu a senha?</a>
                        </div>

                        <button type="submit" className="btn-submit">Entrar na plataforma</button>
                    </form>

                    <div className="login-footer">
                        Ainda não tem uma conta? <Link to="/#pricing">Comece grátis</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
