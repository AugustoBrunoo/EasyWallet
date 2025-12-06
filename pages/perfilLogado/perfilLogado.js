document.addEventListener('DOMContentLoaded', function () {

    // --- Outros scripts do dashboard (ex: fechar alerta) ---
    const alertBox = document.querySelector('.alert-box');
    if (alertBox) {
        const closeBtn = alertBox.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                alertBox.style.display = 'none';
            });
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {

    // --- CORES & CONFIGS ---
    const corAzul = '#00adb5';
    const corCinza = '#393e46';
    const corBranco = '#eeeeee';
    Chart.defaults.color = '#c0c0c0';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.scale.grid.color = 'rgba(238, 238, 238, 0.05)';

    // =========================================================
    // 1. ESTADO DOS DADOS (Simulando "Backend")
    // =========================================================

    // GASTOS (Separados por Tipo)
    let gastosData = {
        fixos: [
            { id: 1, nome: 'Aluguel', valor: 1200 },
            { id: 2, nome: 'Internet', valor: 100 },
            { id: 3, nome: 'Assinaturas', valor: 150 }
        ],
        variaveis: [
            { id: 101, nome: 'Supermercado', valor: 800 },
            { id: 102, nome: 'Lazer', valor: 300 },
            { id: 103, nome: 'Transporte', valor: 450 }
        ]
    };

    // BANCOS (Patrimônio)
    let bancosData = {
        'Itaú': [15000, 16200, 15800, 17500, 19000, 21500],
        'Nubank': [5000, 5500, 6200, 7000, 7800, 8500],
        'Bradesco': [10000, 9800, 9500, 9900, 10200, 10500]
    };
    let bancoAtivo = 'Itaú';

    // INVESTIMENTOS (Estático para exemplo)
    const investimentosData = [12000, 8500, 15000, 3000, 6000];

    // =========================================================
    // 2. INICIALIZAÇÃO DOS GRÁFICOS
    // =========================================================

    // --- GRÁFICO GASTOS (Doughnut) ---
    let chartGastosInstance = null;
    const renderChartGastos = () => {
        const ctx = document.getElementById('gastosChart').getContext('2d');

        // Consolida dados para o gráfico
        const labels = [...gastosData.fixos, ...gastosData.variaveis].map(i => i.nome);
        const dataValues = [...gastosData.fixos, ...gastosData.variaveis].map(i => i.valor);

        // --- NOVAS CORES (Paleta do Site) ---
        // Vamos usar tons derivados do tema:
        // #00adb5 (Azul Neon Principal)
        // #eeeeee (Branco Gelo)
        // #393e46 (Cinza Médio - mas precisa ser visível, então usaremos um tom clareado)
        // #222831 (Azul Marinho - muito escuro, usar com cuidado)
        // Alternativas: Azul mais claro, Cinza azulado.

        const palette = [
            '#00adb5', // Azul Principal
            '#eeeeee', // Branco
            '#5cbfc4', // Azul Claro
            '#71c9ce', // Turquesa Suave
            '#a6e3e9', // Ciano Pálido
            '#cbbfbb'  // Cinza Quente (para contraste suave)
        ];

        // Atribui cores ciclicamente
        const bgColors = labels.map((_, i) => palette[i % palette.length]);

        if (chartGastosInstance) chartGastosInstance.destroy();

        chartGastosInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: bgColors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // --- LEGENDA REATIVADA ---
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            color: '#eeeeee',
                            font: {
                                size: 11
                            },
                            boxWidth: 12
                        }
                    }
                },
                cutout: '65%'
            }
        });
    };

    // --- GRÁFICO PATRIMÔNIO (Line) ---
    let chartPatrimonioInstance = null;
    const renderChartPatrimonio = (nomeBanco) => {
        const ctx = document.getElementById('patrimonioChart').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 173, 181, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 173, 181, 0.0)');

        if (chartPatrimonioInstance) chartPatrimonioInstance.destroy();

        chartPatrimonioInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Saldo (R$)',
                    data: bancosData[nomeBanco] || [],
                    borderColor: corAzul,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: corBranco,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } }
                }
            }
        });
    };

    // --- GRÁFICO INVESTIMENTOS (Bar) ---
    new Chart(document.getElementById('investimentosChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Ações', 'FIIs', 'Tesouro', 'Cripto', 'Ext.'],
            datasets: [{
                label: 'Valor',
                data: investimentosData,
                backgroundColor: [
                    corAzul,    // Ações (Azul)
                    corAzul,    // FIIs (Azul)
                    corBranco,  // Tesouro (Branco - Renda Fixa)
                    '#9b59b6',  // Cripto (Roxo - Destaque Nova Cor)
                    corAzul     // Exterior (Azul)
                ],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(238, 238, 238, 0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // Inicializa gráficos
    renderChartGastos();
    renderChartPatrimonio(bancoAtivo);

    // =========================================================
    // 3. LÓGICA DE GERENCIAMENTO (OFF-CANVAS GERAL)
    // =========================================================

    // Seleciona TODOS os botões ver mais
    const btnsVerMais = document.querySelectorAll('.btn-ver-mais');
    const offcanvasContent = document.getElementById('offcanvasContent');
    const offcanvasTitle = document.getElementById('offcanvasTitle');

    // Renderiza a lista de edição de gastos
    const renderGastosList = () => {
        let html = '';
        html += `<div class="section-title"><i class="bi bi-pin-angle-fill"></i> Gastos Fixos</div>`;
        gastosData.fixos.forEach((gasto, index) => {
            html += `
                        <div class="detail-item">
                            <div class="detail-info">
                                <strong>${gasto.nome}</strong>
                                <small style="color:#aaa">R$ ${gasto.valor.toFixed(2)}</small>
                            </div>
                            <div class="detail-actions">
                                <button onclick="editarGasto('fixos', ${index})" title="Editar"><i class="bi bi-pencil-fill"></i></button>
                                <button class="btn-delete" onclick="removerGasto('fixos', ${index})" title="Excluir"><i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>`;
        });

        html += `<div class="section-title"><i class="bi bi-graph-up-arrow"></i> Gastos Variáveis</div>`;
        if (gastosData.variaveis.length === 0) {
            html += `<p style="color:#666; font-style:italic; text-align:center;">Nenhum gasto variável neste mês.</p>`;
        }
        gastosData.variaveis.forEach((gasto, index) => {
            html += `
                        <div class="detail-item">
                            <div class="detail-info">
                                <strong>${gasto.nome}</strong>
                                <small style="color:#aaa">R$ ${gasto.valor.toFixed(2)}</small>
                            </div>
                            <div class="detail-actions">
                                <button onclick="editarGasto('variaveis', ${index})" title="Editar"><i class="bi bi-pencil-fill"></i></button>
                                <button class="btn-delete" onclick="removerGasto('variaveis', ${index})" title="Excluir"><i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>`;
        });

        html += `
                    <div class="add-expense-form">
                        <h4 style="margin-bottom:10px; color:#fff;">Adicionar Novo Gasto</h4>
                        <input type="text" id="newGastoNome" placeholder="Descrição (ex: Padaria)">
                        <input type="number" id="newGastoValor" placeholder="Valor (R$)">
                        <select id="newGastoTipo">
                            <option value="variaveis">Variável (Zera todo mês)</option>
                            <option value="fixos">Fixo (Mensal)</option>
                        </select>
                        <button class="btn-add-expense" onclick="adicionarGasto()">Salvar Gasto</button>
                    </div>
                    <button class="btn-new-month" onclick="iniciarNovoMes()">
                        <i class="bi bi-calendar-check"></i> Simular Início de Novo Mês
                    </button>
                `;
        return html;
    };

    // --- Renderiza Detalhes de Investimentos (Restaurado) ---
    const renderInvestimentosList = () => {
        return `
                    <div class="section-title"><i class="bi bi-briefcase-fill"></i> Seu Portfólio</div>
                    
                    <div class="detail-item">
                        <div class="detail-info">
                            <strong>PETR4 (Petrobras)</strong>
                            <small style="color:#aaa">Ações BR</small>
                        </div>
                        <strong style="color: #00adb5;">R$ 5.000,00</strong>
                    </div>

                    <div class="detail-item">
                        <div class="detail-info">
                            <strong>VALE3 (Vale)</strong>
                            <small style="color:#aaa">Ações BR</small>
                        </div>
                        <strong style="color: #00adb5;">R$ 7.000,00</strong>
                    </div>

                    <div class="detail-item">
                        <div class="detail-info">
                            <strong>HGLG11 (Logística)</strong>
                            <small style="color:#aaa">Fundos Imobiliários</small>
                        </div>
                        <strong style="color: #00adb5;">R$ 8.500,00</strong>
                    </div>

                    <div class="detail-item">
                        <div class="detail-info">
                            <strong>Tesouro Selic 2029</strong>
                            <small style="color:#aaa">Renda Fixa</small>
                        </div>
                        <strong style="color: #eeeeee;">R$ 15.000,00</strong>
                    </div>

                    <div class="detail-item">
                        <div class="detail-info">
                            <strong>Bitcoin (BTC)</strong>
                            <small style="color:#aaa">Criptomoedas</small>
                        </div>
                        <strong style="color: #9b59b6;">R$ 3.000,00</strong>
                    </div>

                    <div class="detail-item">
                        <div class="detail-info">
                            <strong>IVVB11 (S&P 500)</strong>
                            <small style="color:#aaa">Exterior</small>
                        </div>
                        <strong style="color: #00adb5;">R$ 6.000,00</strong>
                    </div>
                `;
    };

    // Funções Globais para Gastos
    window.adicionarGasto = () => {
        const nome = document.getElementById('newGastoNome').value;
        const valor = parseFloat(document.getElementById('newGastoValor').value);
        const tipo = document.getElementById('newGastoTipo').value;
        if (nome && valor) {
            gastosData[tipo].push({ id: Date.now(), nome, valor });
            offcanvasContent.innerHTML = renderGastosList(); // Re-renderiza conteúdo
            renderChartGastos(); // Atualiza gráfico
        }
    };

    window.removerGasto = (tipo, index) => {
        gastosData[tipo].splice(index, 1);
        offcanvasContent.innerHTML = renderGastosList();
        renderChartGastos();
    };

    window.editarGasto = (tipo, index) => {
        const novoValor = prompt(`Novo valor para ${gastosData[tipo][index].nome}:`, gastosData[tipo][index].valor);
        if (novoValor && !isNaN(novoValor)) {
            gastosData[tipo][index].valor = parseFloat(novoValor);
            offcanvasContent.innerHTML = renderGastosList();
            renderChartGastos();
        }
    };

    window.iniciarNovoMes = () => {
        if (confirm("Deseja iniciar um novo mês? Isso excluirá todos os gastos variáveis.")) {
            gastosData.variaveis = [];
            offcanvasContent.innerHTML = renderGastosList();
            renderChartGastos();
            alert("Novo mês iniciado! Gastos fixos mantidos.");
        }
    };

    // Event Listener Único para botões Ver Mais
    btnsVerMais.forEach(btn => {
        btn.addEventListener('click', function () {
            const tipo = this.getAttribute('data-type');

            document.getElementById('offcanvasOverlay').classList.add('active');
            document.getElementById('offcanvasPanel').classList.add('active');

            if (tipo === 'gastos') {
                offcanvasTitle.innerText = "Gerenciar Gastos";
                offcanvasContent.innerHTML = renderGastosList();
            } else if (tipo === 'investimentos') {
                offcanvasTitle.innerText = "Detalhes de Investimentos";
                offcanvasContent.innerHTML = renderInvestimentosList();
            }
        });
    });

    // =========================================================
    // 4. LÓGICA DE GERENCIAMENTO DE PATRIMÔNIO (ADD/DEL CONTAS)
    // =========================================================

    const tabsContainer = document.getElementById('patrimonioTabs');
    const btnAddBank = document.getElementById('btnAddBank');
    const btnDeleteBank = document.getElementById('btnDeleteBank');
    const modalAddBank = document.getElementById('modalAddBank');
    const confirmAddBank = document.getElementById('confirmAddBank');
    const inputBankName = document.getElementById('inputBankName');

    // Renderiza as abas (tabs)
    const renderTabs = () => {
        tabsContainer.innerHTML = '';
        Object.keys(bancosData).forEach(banco => {
            const btn = document.createElement('button');
            btn.innerText = banco;
            if (banco === bancoAtivo) btn.classList.add('active');
            btn.addEventListener('click', () => {
                bancoAtivo = banco;
                renderTabs();
                renderChartPatrimonio(banco);
            });
            tabsContainer.appendChild(btn);
        });
    };
    renderTabs(); // Renderiza inicial

    // Abrir Modal
    btnAddBank.addEventListener('click', () => {
        modalAddBank.style.display = 'flex';
        inputBankName.value = '';
        inputBankName.focus();
    });

    // Confirmar Adição
    confirmAddBank.addEventListener('click', () => {
        const nome = inputBankName.value.trim();
        if (nome) {
            if (bancosData[nome]) {
                alert("Este banco já existe!");
                return;
            }
            // Gera dados aleatórios para o novo banco
            const dadosAleatorios = Array.from({ length: 6 }, () => Math.floor(Math.random() * 5000) + 1000);
            bancosData[nome] = dadosAleatorios;
            bancoAtivo = nome; // Muda para o novo banco

            renderTabs();
            renderChartPatrimonio(nome);
            modalAddBank.style.display = 'none';
        }
    });

    // Excluir Banco
    btnDeleteBank.addEventListener('click', () => {
        const bancos = Object.keys(bancosData);
        if (bancos.length <= 1) {
            alert("Você precisa ter pelo menos uma conta ativa.");
            return;
        }

        if (confirm(`Tem certeza que deseja excluir a conta "${bancoAtivo}" e todos os seus dados?`)) {
            delete bancosData[bancoAtivo];
            // Muda o ativo para o primeiro disponível
            bancoAtivo = Object.keys(bancosData)[0];
            renderTabs();
            renderChartPatrimonio(bancoAtivo);
        }
    });

    // =========================================================
    // 5. FUNCIONALIDADES GERAIS (Fechar Modais e Offcanvas)
    // =========================================================

    const closeOffcanvas = () => {
        document.getElementById('offcanvasOverlay').classList.remove('active');
        document.getElementById('offcanvasPanel').classList.remove('active');
    };

    document.getElementById('closeOffcanvas').addEventListener('click', closeOffcanvas);
    document.getElementById('offcanvasOverlay').addEventListener('click', closeOffcanvas);

    // Fechar modal ao clicar fora
    window.onclick = (event) => {
        if (event.target == modalAddBank) {
            modalAddBank.style.display = "none";
        }
    };

    // Lembretes (Mantido do anterior)
    const listaLembretes = document.getElementById('listaLembretes');
    document.getElementById('formLembrete').addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.getElementById('inputLembrete');
        if (input.value) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${input.value}</span>
                        <div class="lembretes-actions">
                            <button class="btn-hide"><i class="bi bi-eye"></i></button>
                            <button class="btn-delete"><i class="bi bi-trash-fill"></i></button>
                        </div>`;
            listaLembretes.appendChild(li);
            input.value = '';
        }
    });

    listaLembretes.addEventListener('click', function (e) {
        if (e.target.closest('.btn-delete')) e.target.closest('li').remove();
        if (e.target.closest('.btn-hide')) {
            const li = e.target.closest('li');
            li.classList.toggle('lembrete-oculto');
            const i = li.querySelector('.btn-hide i');
            i.classList.toggle('bi-eye');
            i.classList.toggle('bi-eye-slash');
        }
    });

});