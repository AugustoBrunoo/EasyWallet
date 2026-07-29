export default function FinalCTA() {
    return (
        <section className="final-cta">
            <div className="container">
                <div className="final-cta-inner animate-up">
                    <div>
                        <h2>O fim da confusão nas finanças da sua empresa começa agora.</h2>
                        <p>Abandone as planilhas manuais caóticas e os cadernos de anotações. Assuma o controle do seu
                            fluxo de caixa com 60 dias de acesso 100% gratuito.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <a href="#" className="btn-cta-lg" style={{ textAlign: 'center', display: 'inline-block' }}>Garantir meus 2 meses grátis</a>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>Leva
                            menos de 3 minutos para configurar</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
