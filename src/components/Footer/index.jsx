import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <Link to="/" className="logo">
                    <span className="logo-mark"><i className="bi bi-wallet2"></i></span>
                    <span>EasyWallet</span>
                </Link>

                <div className="footer-links">
                    <a href="#">Sobre a empresa</a>
                    <a href="#">Documentação da API</a>
                    <a href="#">Termos de uso</a>
                    <a href="#">Privacidade</a>
                </div>

                <div className="footer-social">
                    <a href="#" aria-label="GitHub"><i className="bi bi-github"></i></a>
                    <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                        &copy; 2026 EasyWallet. Todos os direitos reservados.
                    </div>
                    <a
                        href="https://nodasolucoes.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.85rem' }}
                        className="powered-by"
                    >
                        <span>Powered by</span>
                        <img
                            src="/logos/logoNoda-nobackground.png"
                            alt="Noda Soluções"
                            style={{ height: '60px', objectFit: 'contain' }}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
