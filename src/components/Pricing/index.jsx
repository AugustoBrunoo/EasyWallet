export default function Pricing() {
    return (
        <section className="pricing" id="pricing">
            <div className="container">
                <div className="section-header centered animate-up" style={{ marginInline: 'auto' }}>
                    <span className="eyebrow">Planos</span>
                    <h2>Escalabilidade em camadas</h2>
                    <p>Do substituto definitivo da planilha ao core financeiro corporativo customizado.</p>
                </div>

                <div className="pricing-grid">
                    {/* Lite */}
                    <div className="pricing-card animate-up">
                        <div className="pricing-header">
                            <h3>Lite</h3>
                            <p>O substituto definitivo da planilha para organizar o passado e o presente.</p>
                            <div
                                style={{ marginTop: '1.5rem', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '0.3rem', lineHeight: 1.1 }}>
                                    R$ 49,90 <span
                                        style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>/
                                        mês</span>
                                </div>
                                <div
                                    style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, marginTop: '0.4rem' }}>
                                    Experimente 2 meses grátis</div>
                            </div>
                        </div>
                        <ul className="pricing-features">
                            <li><i className="bi bi-check2-circle"></i> Fluxo de caixa direto diário</li>
                            <li><i className="bi bi-check2-circle"></i> Contas a pagar e receber</li>
                            <li><i className="bi bi-check2-circle"></i> Categorização por plano de contas</li>
                            <li><i className="bi bi-check2-circle"></i> Geração automática de DRE simplificado</li>
                        </ul>
                        <a href="#" className="btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Iniciar teste gratuito</a>
                    </div>

                    {/* Basic */}
                    <div className="pricing-card popular animate-up" style={{ transitionDelay: '0.08s' }}>
                        <div className="badge-popular">Mais escolhido</div>
                        <div className="pricing-header">
                            <h3 className="text-gradient">Basic Pack</h3>
                            <p>Inteligência de negócios e BI avançado para gerar insights estratégicos.</p>
                            <div
                                style={{ marginTop: '1.5rem', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.6, lineHeight: 1 }}>
                                    R$ 149,00
                                </div>
                                <div
                                    style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginTop: '0.2rem', lineHeight: 1.1 }}>
                                    <span className="text-gradient"
                                        style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2rem', fontWeight: 700 }}>R$
                                        129,90</span>
                                    <span
                                        style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>/
                                        mês</span>
                                </div>
                            </div>
                        </div>
                        <ul className="pricing-features">
                            <li><i className="bi bi-check2-circle"></i> <strong>Tudo do plano Lite, mais:</strong></li>
                            <li><i className="bi bi-check2-circle"></i> Conciliação bancária por OFX/PDF</li>
                            <li><i className="bi bi-check2-circle"></i> Visão híbrida (caixa vs. competência)</li>
                            <li><i className="bi bi-check2-circle"></i> Dashboards analíticos de margem de contribuição</li>
                            <li><i className="bi bi-check2-circle"></i> Cálculo de break-even e forecasting</li>
                        </ul>
                        <a href="#" className="btn-cta-lg" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Assinar Basic</a>
                    </div>

                    {/* Pro */}
                    <div className="pricing-card animate-up" style={{ transitionDelay: '0.16s' }}>
                        <div className="pricing-header">
                            <h3>Pro</h3>
                            <p>A Porta de Entrada da Consultoria financeira avançada e demandas complexas.</p>
                            <div
                                style={{ marginTop: '1.5rem', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                                    Sob Consulta
                                </div>
                                <div
                                    style={{ fontSize: '0.85rem', color: 'transparent', fontWeight: 500, marginTop: '0.4rem', userSelect: 'none' }}>
                                    -</div>
                            </div>
                        </div>
                        <ul className="pricing-features">
                            <li><i className="bi bi-check2-circle"></i> <strong>Tudo do Basic Pack, mais:</strong></li>
                            <li><i className="bi bi-check2-circle"></i> Integração completa via API com ERPs</li>
                            <li><i className="bi bi-check2-circle"></i> Emissão automatizada de NFS-e</li>
                            <li><i className="bi bi-check2-circle"></i> Consolidação de múltiplas filiais (holding)</li>
                            <li><i className="bi bi-check2-circle"></i> Relatórios contábeis customizados</li>
                        </ul>
                        <button className="btn-outline" style={{ width: '100%' }}>Falar com consultor</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
