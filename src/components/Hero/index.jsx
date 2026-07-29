import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const tickerData = [
    { desc: 'PIX recebido · Cliente A', val: '+ R$ 2.480', dir: 'in' },
    { desc: 'Boleto pago · Fornecedor B', val: '- R$ 1.120', dir: 'out' },
    { desc: 'TED recebido · Cliente C', val: '+ R$ 6.750', dir: 'in' },
    { desc: 'Folha de pagamento', val: '- R$ 14.300', dir: 'out' },
    { desc: 'PIX recebido · Cliente D', val: '+ R$ 980', dir: 'in' },
    { desc: 'Assinatura SaaS', val: '- R$ 240', dir: 'out' },
    { desc: 'PIX recebido · Cliente E', val: '+ R$ 3.150', dir: 'in' },
];

const COLOR_PRIMARY = '#10b981';
const COLOR_SECONDARY = '#0ea5e9';
const COLOR_MUTED = '#8b93a6';
const COLOR_BORDER = 'rgba(255, 255, 255, 0.08)';

export default function Hero() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [activeMode, setActiveMode] = useState('ambos');

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        
        const ctx = chartRef.current.getContext('2d');
        const gradientPrimary = ctx.createLinearGradient(0, 0, 0, 300);
        gradientPrimary.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
        gradientPrimary.addColorStop(1, 'rgba(16, 185, 129, 0)');

        const gradientSecondary = ctx.createLinearGradient(0, 0, 0, 300);
        gradientSecondary.addColorStop(0, 'rgba(14, 165, 233, 0.35)');
        gradientSecondary.addColorStop(1, 'rgba(14, 165, 233, 0)');

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
                datasets: [
                    {
                        label: 'Competência',
                        data: [42, 48, 55, 62, 58, 70, 75, 82],
                        borderColor: COLOR_SECONDARY,
                        backgroundColor: gradientSecondary,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        hidden: activeMode === 'caixa'
                    },
                    {
                        label: 'Caixa',
                        data: [35, 41, 45, 52, 59, 61, 68, 72],
                        borderColor: COLOR_PRIMARY,
                        backgroundColor: gradientPrimary,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        hidden: activeMode === 'competencia'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#171a21',
                        borderColor: COLOR_BORDER,
                        borderWidth: 1,
                        padding: 10,
                        titleColor: COLOR_MUTED,
                        bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
                        callbacks: {
                            label: (context) => ` ${context.dataset.label}: R$ ${context.parsed.y}k`
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false, drawBorder: false }, ticks: { color: COLOR_MUTED, font: { size: 10 } } },
                    y: { display: false }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []); // Run once to initialize

    // Handle mode changes
    useEffect(() => {
        if (!chartInstance.current) return;
        const chart = chartInstance.current;
        const [competencia, caixa] = chart.data.datasets;
        
        if (activeMode === 'ambos') {
            competencia.hidden = false;
            caixa.hidden = false;
        } else if (activeMode === 'caixa') {
            competencia.hidden = true;
            caixa.hidden = false;
        } else {
            competencia.hidden = false;
            caixa.hidden = true;
        }
        chart.update();
    }, [activeMode]);

    return (
        <section className="hero" id="hero">
            <div className="container hero-inner">
                <div className="hero-copy animate-up">
                    <span className="eyebrow">Inteligência financeira autônoma</span>
                    <h1>Transforme dados brutos em <span className="text-gradient">decisões estratégicas.</span></h1>
                    <p>
                        O ecossistema que preenche o abismo entre planilhas caóticas e ERPs engessados.
                        Assuma o controle do seu fluxo de caixa, preveja o futuro financeiro e escale sua operação
                        com clareza total.
                    </p>

                    <div className="hero-btns">
                        <a className="btn-cta-lg" href="#pricing">Ver planos</a>
                        <a href="#solutions" className="btn-outline"><i className="bi bi-play-circle me-2"></i> Ver como
                            funciona</a>
                    </div>

                    <div className="hero-kpis" style={{ flexDirection: 'column', gap: '1rem' }}>
                        <div className="hero-kpi">
                            <div className="kpi-label" style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}><i
                                    className="bi bi-check2-circle"
                                    style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i> <strong>Eliminar a
                                    Cegueira Financeira:</strong> Clareza total do seu cenário atual.</div>
                        </div>
                        <div className="hero-kpi">
                            <div className="kpi-label" style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}><i
                                    className="bi bi-check2-circle"
                                    style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i> <strong>Previsibilidade de
                                    Caixa (Forecasting):</strong> Antecipe cenários com precisão.</div>
                        </div>
                        <div className="hero-kpi">
                            <div className="kpi-label" style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}><i
                                    className="bi bi-check2-circle"
                                    style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i> <strong>Escalabilidade e
                                    Flexibilidade Comercial:</strong> Crescimento sustentável e organizado.</div>
                        </div>
                    </div>
                </div>

                <div className="hero-panel animate-up" style={{ transitionDelay: '0.1s' }}>
                    <div className="hero-panel-head">
                        <span className="hero-panel-title">Fluxo de caixa · em tempo real</span>
                        <div className="chip-toggle" role="group" aria-label="Alternar regime de visualização">
                            <button data-line="caixa" className={activeMode === 'caixa' ? 'active' : ''} onClick={() => setActiveMode('caixa')} type="button">Caixa</button>
                            <button data-line="competencia" className={activeMode === 'competencia' ? 'active' : ''} onClick={() => setActiveMode('competencia')} type="button">Competência</button>
                            <button data-line="ambos" className={activeMode === 'ambos' ? 'active' : ''} onClick={() => setActiveMode('ambos')} type="button">Ambos</button>
                        </div>
                    </div>
                    <div className="hero-chart-wrap">
                        <canvas ref={chartRef}
                            aria-label="Gráfico comparando regime de caixa e competência ao longo do ano"
                            role="img"></canvas>
                    </div>
                    <div className="hero-panel-foot">
                        <div className="hero-legend">
                            <span><span className="legend-dot" style={{ background: 'var(--primary)' }}></span>Caixa
                                (recebido)</span>
                            <span><span className="legend-dot" style={{ background: 'var(--secondary)' }}></span>Competência
                                (faturado)</span>
                        </div>
                        <span className="hero-gap-note">gap = a receber</span>
                    </div>

                    <div className="ticker" aria-hidden="true">
                        <div className="ticker-track">
                            {[...tickerData, ...tickerData].map((t, i) => (
                                <span className="ticker-item" key={i}>
                                    <span className={`tag ${t.dir}`}>{t.dir === 'in' ? 'IN' : 'OUT'}</span>
                                    {t.desc} <strong style={{ color: 'var(--text-main)' }}>{t.val}</strong>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
