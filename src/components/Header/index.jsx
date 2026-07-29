import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <span className="logo-mark"><i className="bi bi-wallet2"></i></span>
                    <span>EasyWallet</span>
                </Link>

                <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`} id="navMenu">
                    <nav className="nav-links">
                        <ul>
                            <li><a href="#" className="active" onClick={() => setIsMenuOpen(false)}>Produto</a></li>
                            <li><a href="#solutions" onClick={() => setIsMenuOpen(false)}>Soluções</a></li>
                            <li><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Planos</a></li>
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        <a href="#pricing" className="btn-cta-sm" onClick={() => setIsMenuOpen(false)}>Começar grátis</a>
                    </div>
                </div>

                <button 
                    className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                    id="mobileMenuBtn" 
                    aria-label="Abrir menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
