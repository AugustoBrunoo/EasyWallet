import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const COLOR_PRIMARY = '#10b981';
const COLOR_SECONDARY = '#0ea5e9';
const COLOR_MUTED = '#8b93a6';
const COLOR_BORDER = 'rgba(255, 255, 255, 0.08)';

export default function Solutions() {
    const [activeTab, setActiveTab] = useState('hibrido');
    
    // Hibrido Chart State
    const [hybridMode, setHybridMode] = useState('ambos');
    const hybridChartRef = useRef(null);
    const hybridChartInstance = useRef(null);

    // Conciliacao State
    const [isReconRunning, setIsReconRunning] = useState(false);
    const [reconProgress, setReconProgress] = useState(0);
    const [reconData, setReconData] = useState([
        { desc: 'TED · CLIENTE ALPHA LTDA', amount: 4820, category: 'Receita de vendas', categorized: false },
        { desc: 'BOLETO · DISTRIB. NORTE SA', amount: -2150, category: 'Fornecedores', categorized: false },
        { desc: 'PIX · BETA COMERCIO', amount: 1290, category: 'Receita de vendas', categorized: false },
        { desc: 'DEB AUTOMATICO · AWS', amount: -430, category: 'Infraestrutura', categorized: false },
        { desc: 'TED · FOLHA PAGAMENTO', amount: -9800, category: 'Folha & encargos', categorized: false },
    ]);

    // Break-Even State
    const [price, setPrice] = useState(120);
    const [varCost, setVarCost] = useState(55);
    const [fixedCost, setFixedCost] = useState(18000);
    const breakevenChartRef = useRef(null);
    const breakevenChartInstance = useRef(null);
    
    const margin = Math.max(price - varCost, 1);
    const beUnits = fixedCost / margin;
    const beRevenue = beUnits * price;

    // Initialize Hybrid Chart
    useEffect(() => {
        if (activeTab === 'hibrido' && hybridChartRef.current) {
            if (hybridChartInstance.current) return; // already initialized
            const ctx = hybridChartRef.current.getContext('2d');
            const gradientPrimary = ctx.createLinearGradient(0, 0, 0, 400);
            gradientPrimary.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
            gradientPrimary.addColorStop(1, 'rgba(16, 185, 129, 0)');

            const gradientSecondary = ctx.createLinearGradient(0, 0, 0, 400);
            gradientSecondary.addColorStop(0, 'rgba(14, 165, 233, 0.35)');
            gradientSecondary.addColorStop(1, 'rgba(14, 165, 233, 0)');

            hybridChartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        {
                            label: 'Competência',
                            data: [120, 140, 160, 150, 180, 210, 205, 220, 240, 250, 280, 310],
                            borderColor: COLOR_SECONDARY,
                            backgroundColor: gradientSecondary,
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 4,
                            hidden: hybridMode === 'caixa'
                        },
                        {
                            label: 'Caixa',
                            data: [90, 110, 130, 125, 140, 165, 190, 195, 200, 220, 240, 260],
                            borderColor: COLOR_PRIMARY,
                            backgroundColor: gradientPrimary,
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 4,
                            hidden: hybridMode === 'competencia'
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
                            callbacks: {
                                label: (ctx) => ` ${ctx.dataset.label}: R$ ${ctx.parsed.y}k`
                            }
                        }
                    },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: COLOR_MUTED } },
                        y: { grid: { color: COLOR_BORDER }, ticks: { color: COLOR_MUTED, callback: (v) => 'R$ ' + v + 'k' } }
                    }
                }
            });
        }
    }, [activeTab]);

    useEffect(() => {
        if (hybridChartInstance.current) {
            const chart = hybridChartInstance.current;
            const [competencia, caixa] = chart.data.datasets;
            competencia.hidden = hybridMode === 'caixa';
            caixa.hidden = hybridMode === 'competencia';
            chart.update();
        }
    }, [hybridMode]);

    // Initialize/Update BreakEven Chart
    useEffect(() => {
        if (activeTab === 'breakeven' && breakevenChartRef.current) {
            const maxUnits = Math.max(beUnits * 2, 50);
            const steps = 10;
            const labels = [];
            const revenueLine = [];
            const costLine = [];
            for (let i = 0; i <= steps; i++) {
                const units = (maxUnits / steps) * i;
                labels.push(Math.round(units));
                revenueLine.push(Math.round(units * price));
                costLine.push(Math.round(fixedCost + units * varCost));
            }

            if (!breakevenChartInstance.current) {
                const ctx = breakevenChartRef.current.getContext('2d');
                breakevenChartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Receita',
                                data: revenueLine,
                                borderColor: COLOR_SECONDARY,
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                pointRadius: 0,
                                tension: 0.15
                            },
                            {
                                label: 'Custo total',
                                data: costLine,
                                borderColor: COLOR_PRIMARY,
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                pointRadius: 0,
                                tension: 0.15
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                align: 'end',
                                labels: { boxWidth: 10, boxHeight: 10, font: { size: 10 }, color: COLOR_MUTED }
                            },
                            tooltip: {
                                backgroundColor: '#171a21',
                                borderColor: COLOR_BORDER,
                                borderWidth: 1,
                                padding: 10,
                                callbacks: { label: (ctx) => ` ${ctx.dataset.label}: R$ ${ctx.parsed.y.toLocaleString('pt-BR')}` }
                            }
                        },
                        scales: {
                            x: { grid: { display: false }, ticks: { font: { size: 9 }, color: COLOR_MUTED }, title: { display: true, text: 'unidades vendidas', font: { size: 9 }, color: COLOR_MUTED } },
                            y: { grid: { color: COLOR_BORDER }, ticks: { font: { size: 9 }, color: COLOR_MUTED, callback: (v) => 'R$ ' + (v / 1000) + 'k' } }
                        }
                    }
                });
            } else {
                const chart = breakevenChartInstance.current;
                chart.data.labels = labels;
                chart.data.datasets[0].data = revenueLine;
                chart.data.datasets[1].data = costLine;
                chart.update();
            }
        }
    }, [activeTab, price, varCost, fixedCost, beUnits]);


    const runReconciliation = () => {
        if (isReconRunning) return;
        setIsReconRunning(true);
        setReconProgress(0);
        
        // Reset all categorized flags
        setReconData(prev => prev.map(item => ({ ...item, categorized: false })));

        reconData.forEach((r, i) => {
            setTimeout(() => {
                setReconData(prev => {
                    const newData = [...prev];
                    newData[i].categorized = true;
                    return newData;
                });
                setReconProgress(((i + 1) / reconData.length) * 100);
                
                if (i === reconData.length - 1) {
                    setTimeout(() => {
                        setIsReconRunning(false);
                    }, 300);
                }
            }, 450 * (i + 1));
        });
    };

    return (
        <section className="solutions" id="solutions">
            <div className="container">
                <div className="section-header centered animate-up" style={{ marginInline: 'auto' }}>
                    <span className="eyebrow">O fim da cegueira financeira</span>
                    <h2>Três motores, um único painel</h2>
                    <p>Arquitetura de dados limpa projetada para entregar respostas vitais em tempo real. Interaja com
                        os painéis abaixo — são os mesmos motores que rodam dentro do produto.</p>
                </div>

                <div className="tabs-nav animate-up" role="tablist">
                    <button className={`tab-btn ${activeTab === 'hibrido' ? 'active' : ''}`} onClick={() => setActiveTab('hibrido')} role="tab">
                        <i className="bi bi-arrow-left-right"></i> Visão Híbrida
                    </button>
                    <button className={`tab-btn ${activeTab === 'conciliacao' ? 'active' : ''}`} onClick={() => setActiveTab('conciliacao')} role="tab">
                        <i className="bi bi-file-earmark-bar-graph"></i> Conciliação Automática
                    </button>
                    <button className={`tab-btn ${activeTab === 'breakeven' ? 'active' : ''}`} onClick={() => setActiveTab('breakeven')} role="tab">
                        <i className="bi bi-bullseye"></i> Break-Even Interativo
                    </button>
                </div>

                <div className="tab-panels animate-up">
                    {/* PAINEL 1: VISÃO HÍBRIDA */}
                    <div className={`tab-panel ${activeTab === 'hibrido' ? 'active' : ''}`}>
                        <div className="panel-grid">
                            <div className="panel-text">
                                <span className="eyebrow">Regime de caixa vs. competência</span>
                                <h3>Saiba exatamente quando o dinheiro vai entrar</h3>
                                <p>Acompanhe simultaneamente o Regime de Caixa (dinheiro de hoje) e o Regime de
                                    Competência (faturamento futuro). A área entre as duas curvas é o seu "a receber" —
                                    dinheiro já faturado que ainda vai cair na conta.</p>
                                <ul className="panel-list">
                                    <li><i className="bi bi-check2-circle"></i> Conciliação bancária semimanual por OFX ou
                                        PDF</li>
                                    <li><i className="bi bi-check2-circle"></i> Alternância instantânea entre Regime de
                                        Caixa e Competência</li>
                                    <li><i className="bi bi-check2-circle"></i> Projeção de recebíveis por vencimento</li>
                                </ul>
                            </div>
                            <div className="panel-visual">
                                <div className="panel-visual-head">
                                    <span className="panel-visual-title">Caixa x Competência · 12 meses</span>
                                    <div className="chip-toggle" role="group">
                                        <button data-line="caixa" className={hybridMode === 'caixa' ? 'active' : ''} onClick={() => setHybridMode('caixa')} type="button">Caixa</button>
                                        <button data-line="competencia" className={hybridMode === 'competencia' ? 'active' : ''} onClick={() => setHybridMode('competencia')} type="button">Competência</button>
                                        <button data-line="ambos" className={hybridMode === 'ambos' ? 'active' : ''} onClick={() => setHybridMode('ambos')} type="button">Ambos</button>
                                    </div>
                                </div>
                                <div className="big-chart-wrap">
                                    <canvas ref={hybridChartRef}></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PAINEL 2: CONCILIAÇÃO AUTOMÁTICA */}
                    <div className={`tab-panel ${activeTab === 'conciliacao' ? 'active' : ''}`}>
                        <div className="panel-grid">
                            <div className="panel-text">
                                <span className="eyebrow">Upload de OFX ou PDF</span>
                                <h3>Conciliação Bancária Semimanual</h3>
                                <p>Faça o upload do seu arquivo OFX ou PDF do extrato bancário. O sistema processa os
                                    dados com alta performance e realiza a leitura inteligente das transações para
                                    apoiar suas finanças.</p>
                                <ul className="panel-list">
                                    <li><i className="bi bi-check2-circle"></i> Leitura inteligente e higienização das
                                        descrições</li>
                                    <li><i className="bi bi-check2-circle"></i> Categorização em um plano de contas
                                        estruturado</li>
                                    <li><i className="bi bi-check2-circle"></i> Separação clara entre Custo Fixo, Variável e
                                        Investimento</li>
                                </ul>
                            </div>
                            <div className="panel-visual">
                                <div className="panel-visual-head">
                                    <span className="panel-visual-title">Extrato bruto importado</span>
                                </div>

                                <div className="recon-row">
                                    {reconData.map((r, i) => (
                                        <div key={i} className={`recon-line ${r.categorized ? 'done' : ''}`}>
                                            <span className="desc">{r.desc}</span>
                                            <span className={`amount ${r.amount < 0 ? 'neg' : 'pos'}`}>
                                                {r.amount < 0 ? '-' : '+'} R$ {Math.abs(r.amount).toLocaleString('pt-BR')}
                                            </span>
                                            <span className="recon-tag">
                                                {r.categorized ? r.category : 'não categorizado'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="recon-actions">
                                    <div className="progress-ring-wrap">
                                        <div className="progress-ring" style={{ background: `conic-gradient(${COLOR_PRIMARY} ${(reconProgress / 100) * 360}deg, var(--bg-elevated) 0deg)` }}>
                                            <span>{Math.round(reconProgress)}%</span>
                                        </div>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>categorizado automaticamente</span>
                                    </div>
                                    <button className="btn-run" onClick={runReconciliation} disabled={isReconRunning}>
                                        {isReconRunning ? 'Conciliando…' : 'Rodar conciliação'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PAINEL 3: BREAK-EVEN INTERATIVO */}
                    <div className={`tab-panel ${activeTab === 'breakeven' ? 'active' : ''}`}>
                        <div className="panel-grid">
                            <div className="panel-text">
                                <span className="eyebrow">Ponto de equilíbrio</span>
                                <h3>Cálculo Automático do Break-Even</h3>
                                <p>Ajuste o preço médio de venda e o custo fixo mensal para ver o cálculo automático do
                                    Ponto de Equilíbrio (Break-Even), indicando visualmente quando a operação passa a
                                    lucrar.</p>
                                <ul className="panel-list">
                                    <li><i className="bi bi-check2-circle"></i> Simulação instantânea de cenários (Receita x
                                        Custo)</li>
                                    <li><i className="bi bi-check2-circle"></i> Cálculo automático do Ponto de Equilíbrio
                                    </li>
                                    <li><i className="bi bi-check2-circle"></i> Indicador visual de virada para a
                                        lucratividade</li>
                                </ul>
                            </div>
                            <div className="panel-visual">
                                <div className="slider-group">
                                    <div className="slider-label">
                                        <span>Preço médio de venda</span>
                                        <span className="val mono">R$ {price.toLocaleString('pt-BR')}</span>
                                    </div>
                                    <input type="range" min="40" max="300" step="5" value={price} onChange={e => setPrice(Number(e.target.value))} />
                                </div>
                                <div className="slider-group">
                                    <div className="slider-label">
                                        <span>Custo variável por unidade</span>
                                        <span className="val mono">R$ {varCost.toLocaleString('pt-BR')}</span>
                                    </div>
                                    <input type="range" min="10" max="200" step="5" value={varCost} onChange={e => setVarCost(Number(e.target.value))} />
                                </div>
                                <div className="slider-group">
                                    <div className="slider-label">
                                        <span>Custo fixo mensal</span>
                                        <span className="val mono">R$ {fixedCost.toLocaleString('pt-BR')}</span>
                                    </div>
                                    <input type="range" min="2000" max="60000" step="500" value={fixedCost} onChange={e => setFixedCost(Number(e.target.value))} />
                                </div>

                                <div className="big-chart-wrap" style={{ height: '200px' }}>
                                    <canvas ref={breakevenChartRef}></canvas>
                                </div>

                                <div className="breakeven-result">
                                    <div>
                                        <div className="r-value">{Math.round(beUnits).toLocaleString('pt-BR')} un</div>
                                        <div className="r-label">unidades para o equilíbrio</div>
                                    </div>
                                    <div>
                                        <div className="r-value">R$ {Math.round(beRevenue).toLocaleString('pt-BR')}</div>
                                        <div className="r-label">receita no ponto de equilíbrio</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
