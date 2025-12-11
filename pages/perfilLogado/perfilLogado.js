document.addEventListener('DOMContentLoaded', function () {
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

document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('btnOpenMenu');
    const btnClose = document.getElementById('btnCloseMenu');
    const menuOverlay = document.getElementById('dashboardMenu');

    // Verificação de segurança caso o elemento não exista na página
    if (btnOpen && menuOverlay) {
        // Abrir Menu
        btnOpen.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        });

        // Fechar Menu
        const closeMenu = () => {
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        if (btnClose) btnClose.addEventListener('click', closeMenu);

        // Fechar ao clicar fora do container (no fundo escuro)
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });

        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

    // --- CORES & CONFIGS GERAIS ---
    const corAzul = '#00adb5';
    const corCinza = '#393e46';
    const corBranco = '#eeeeee';
    Chart.defaults.color = '#c0c0c0';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.scale.grid.color = 'rgba(238, 238, 238, 0.05)';

    // =========================================================
    // 1. ESTADO DOS DADOS (Seu "Backend" simulado)
    // =========================================================

    // GASTOS
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

    // --- ALTERAÇÃO: Começamos com 'Total' como padrão
    let bancoAtivo = 'Total';

    // INVESTIMENTOS
    const investimentosData = [12000, 8500, 15000, 3000, 6000];

    // =========================================================
    // 2. INICIALIZAÇÃO DOS GRÁFICOS
    // =========================================================

    // --- GRÁFICO GASTOS (Mantido do original) ---
    let chartGastosInstance = null;
    const renderChartGastos = () => {
        const canvasGastos = document.getElementById('gastosChart');
        if (!canvasGastos) return; // Evita erro se não achar o canvas

        const ctx = canvasGastos.getContext('2d');

        const labels = [...gastosData.fixos, ...gastosData.variaveis].map(i => i.nome);
        const dataValues = [...gastosData.fixos, ...gastosData.variaveis].map(i => i.valor);

        const palette = ['#00adb5', '#eeeeee', '#5cbfc4', '#71c9ce', '#a6e3e9', '#cbbfbb'];
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
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: { color: '#eeeeee', font: { size: 11 }, boxWidth: 12 }
                    }
                },
                cutout: '65%'
            }
        });
    };

    // --- GRÁFICO PATRIMÔNIO (CORRIGIDO E ATUALIZADO) ---
    let chartPatrimonioInstance = null;

    const renderChartPatrimonio = (nomeBanco) => {
        const canvasPatrimonio = document.getElementById('patrimonioChart');
        if (!canvasPatrimonio) return; // Segurança

        const ctx = canvasPatrimonio.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 173, 181, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 173, 181, 0.0)');

        if (chartPatrimonioInstance) chartPatrimonioInstance.destroy();

        // --- ALTERAÇÃO: Lógica de Soma dos Bancos ---
        let dadosParaExibir = [];

        if (nomeBanco === 'Total') {
            // Assume 6 meses de histórico. Cria um array [0, 0, 0, 0, 0, 0]
            const numMeses = 6;
            dadosParaExibir = new Array(numMeses).fill(0);

            // Percorre cada banco e soma mês a mês
            Object.values(bancosData).forEach(bancoArray => {
                bancoArray.forEach((valor, index) => {
                    if (index < numMeses) {
                        dadosParaExibir[index] += valor;
                    }
                });
            });
        } else {
            // Pega apenas o banco específico. Se não existir, retorna array vazio
            dadosParaExibir = bancosData[nomeBanco] || [];
        }

        chartPatrimonioInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    // Muda o label dependendo se é Total ou Específico
                    label: nomeBanco === 'Total' ? 'Patrimônio Total (R$)' : 'Saldo (R$)',
                    data: dadosParaExibir,
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

        // Atualiza o valor total exibido no texto
        const valorDisplay = document.getElementById('valorTotalDisplay');
        if (valorDisplay && dadosParaExibir.length > 0) {
            const ultimoValor = dadosParaExibir[dadosParaExibir.length - 1];
            valorDisplay.innerText = ultimoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    };

    // --- GRÁFICO INVESTIMENTOS (Mantido) ---
    const canvasInvest = document.getElementById('investimentosChart');
    if (canvasInvest) {
        new Chart(canvasInvest.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Ações', 'FIIs', 'Tesouro', 'Cripto', 'Ext.'],
                datasets: [{
                    label: 'Valor',
                    data: investimentosData,
                    backgroundColor: [corAzul, corAzul, corBranco, '#9b59b6', corAzul],
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
    }

    // Inicializa gráficos
    renderChartGastos();
    renderChartPatrimonio(bancoAtivo);

    // =========================================================
    // 3. LÓGICA DE GERENCIAMENTO (OFF-CANVAS: Gastos e Investimentos)
    // =========================================================

    const btnsVerMais = document.querySelectorAll('.btn-ver-mais');
    const offcanvasContent = document.getElementById('offcanvasContent');
    const offcanvasTitle = document.getElementById('offcanvasTitle');
    const offcanvasPanel = document.getElementById('offcanvasPanel');
    const offcanvasOverlay = document.getElementById('offcanvasOverlay');

    // Funções auxiliares para HTML do Offcanvas
    const renderGastosList = () => {
        let html = `<div class="section-title"><i class="bi bi-pin-angle-fill"></i> Gastos Fixos</div>`;
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

    const renderInvestimentosList = () => {
        return `
            <div class="section-title"><i class="bi bi-briefcase-fill"></i> Seu Portfólio</div>
            <div class="detail-item"><div class="detail-info"><strong>PETR4 (Petrobras)</strong><small style="color:#aaa">Ações BR</small></div><strong style="color: #00adb5;">R$ 5.000,00</strong></div>
            <div class="detail-item"><div class="detail-info"><strong>Tesouro Selic 2029</strong><small style="color:#aaa">Renda Fixa</small></div><strong style="color: #eeeeee;">R$ 15.000,00</strong></div>
            <div class="detail-item"><div class="detail-info"><strong>Bitcoin (BTC)</strong><small style="color:#aaa">Criptomoedas</small></div><strong style="color: #9b59b6;">R$ 3.000,00</strong></div>
        `;
    };

    // Funções Globais (window) para acesso via onclick no HTML gerado
    window.adicionarGasto = () => {
        const nome = document.getElementById('newGastoNome').value;
        const valor = parseFloat(document.getElementById('newGastoValor').value);
        const tipo = document.getElementById('newGastoTipo').value;
        if (nome && valor) {
            gastosData[tipo].push({ id: Date.now(), nome, valor });
            if (offcanvasContent) offcanvasContent.innerHTML = renderGastosList();
            renderChartGastos();
        }
    };

    window.removerGasto = (tipo, index) => {
        gastosData[tipo].splice(index, 1);
        if (offcanvasContent) offcanvasContent.innerHTML = renderGastosList();
        renderChartGastos();
    };

    window.editarGasto = (tipo, index) => {
        const novoValor = prompt(`Novo valor para ${gastosData[tipo][index].nome}:`, gastosData[tipo][index].valor);
        if (novoValor && !isNaN(novoValor)) {
            gastosData[tipo][index].valor = parseFloat(novoValor);
            if (offcanvasContent) offcanvasContent.innerHTML = renderGastosList();
            renderChartGastos();
        }
    };

    window.iniciarNovoMes = () => {
        if (confirm("Deseja iniciar um novo mês? Isso excluirá todos os gastos variáveis.")) {
            gastosData.variaveis = [];
            if (offcanvasContent) offcanvasContent.innerHTML = renderGastosList();
            renderChartGastos();
            alert("Novo mês iniciado! Gastos fixos mantidos.");
        }
    };

    // Eventos botões "Gerenciar/Ver Detalhes"
    if (btnsVerMais) {
        btnsVerMais.forEach(btn => {
            btn.addEventListener('click', function () {
                const tipo = this.getAttribute('data-type');
                if (offcanvasOverlay) offcanvasOverlay.classList.add('active');
                if (offcanvasPanel) offcanvasPanel.classList.add('active');

                if (tipo === 'gastos') {
                    if (offcanvasTitle) offcanvasTitle.innerText = "Gerenciar Gastos";
                    if (offcanvasContent) offcanvasContent.innerHTML = renderGastosList();
                } else if (tipo === 'investimentos') {
                    if (offcanvasTitle) offcanvasTitle.innerText = "Detalhes de Investimentos";
                    if (offcanvasContent) offcanvasContent.innerHTML = renderInvestimentosList();
                }
            });
        });
    }

    // =========================================================
    // 4. LÓGICA DE GERENCIAMENTO DE PATRIMÔNIO (ADD/DEL CONTAS)
    // =========================================================

    const tabsContainer = document.getElementById('patrimonioTabs');
    const btnAddBank = document.getElementById('btnAddBank');
    const btnDeleteBank = document.getElementById('btnDeleteBank');
    const modalAddBank = document.getElementById('modalAddBank');
    const confirmAddBank = document.getElementById('confirmAddBank');
    const inputBankName = document.getElementById('inputBankName');

    // Função que desenha as abas (Tabs)
    const renderTabs = () => {
        if (!tabsContainer) return;
        tabsContainer.innerHTML = '';

        // --- ALTERAÇÃO: Adiciona botão "Geral (Total)" ---
        const btnTotal = document.createElement('button');
        btnTotal.innerText = 'Geral (Total)';
        if (bancoAtivo === 'Total') btnTotal.classList.add('active');
        btnTotal.addEventListener('click', () => {
            bancoAtivo = 'Total';
            renderTabs();
            renderChartPatrimonio('Total');
        });
        tabsContainer.appendChild(btnTotal);

        Object.keys(bancosData).forEach(banco => {
            const btn = document.createElement('button');
            btn.innerText = banco;

            // Lógica da classe active
            if (banco === bancoAtivo) btn.classList.add('active');

            btn.addEventListener('click', () => {
                bancoAtivo = banco;
                renderTabs(); // Redesenha para atualizar quem está active
                renderChartPatrimonio(banco);
            });

            tabsContainer.appendChild(btn);
        });
    };
    renderTabs(); // Render inicial

    // Abrir Modal
    if (btnAddBank && modalAddBank) {
        btnAddBank.addEventListener('click', () => {
            modalAddBank.style.display = 'flex';
            if (inputBankName) {
                inputBankName.value = '';
                inputBankName.focus();
            }
        });
    }

    // Confirmar Adição
    if (confirmAddBank && inputBankName) {
        confirmAddBank.addEventListener('click', () => {
            const nome = inputBankName.value.trim();
            if (nome) {
                if (bancosData[nome]) {
                    alert("Este banco já existe!");
                    return;
                }
                if (nome.toLowerCase() === 'total') {
                    alert("Nome reservado pelo sistema.");
                    return;
                }

                // Gera dados aleatórios para o novo banco
                const dadosAleatorios = Array.from({ length: 6 }, () => Math.floor(Math.random() * 5000) + 1000);
                bancosData[nome] = dadosAleatorios;
                bancoAtivo = nome; // Já muda para o novo banco

                renderTabs();
                renderChartPatrimonio(nome);
                modalAddBank.style.display = 'none';
            }
        });
    }

    // Excluir Banco
    if (btnDeleteBank) {
        btnDeleteBank.addEventListener('click', () => {
            // --- ALTERAÇÃO: Bloqueia exclusão da aba Total
            if (bancoAtivo === 'Total') {
                alert("Você não pode excluir a visualização Geral.");
                return;
            }

            const bancos = Object.keys(bancosData);
            if (bancos.length <= 1) {
                alert("Você precisa ter pelo menos uma conta ativa.");
                return;
            }

            if (confirm(`Tem certeza que deseja excluir a conta "${bancoAtivo}" e todos os seus dados?`)) {
                delete bancosData[bancoAtivo];
                // Define o novo ativo como "Total"
                bancoAtivo = 'Total';
                renderTabs();
                renderChartPatrimonio(bancoAtivo);
            }
        });
    }

    // =========================================================
    // 5. FUNCIONALIDADES GERAIS (Fechar Modais e Offcanvas)
    // =========================================================

    const closeOffcanvasFunc = () => {
        if (offcanvasOverlay) offcanvasOverlay.classList.remove('active');
        if (offcanvasPanel) offcanvasPanel.classList.remove('active');
    };

    const btnCloseOff = document.getElementById('closeOffcanvas');
    if (btnCloseOff) btnCloseOff.addEventListener('click', closeOffcanvasFunc);
    if (offcanvasOverlay) offcanvasOverlay.addEventListener('click', closeOffcanvasFunc);

    // Fechar modal AddBank ao clicar fora
    window.onclick = (event) => {
        if (event.target == modalAddBank) {
            modalAddBank.style.display = "none";
        }
    };

    // Lembretes
    const listaLembretes = document.getElementById('listaLembretes');
    const formLembrete = document.getElementById('formLembrete');

    if (formLembrete && listaLembretes) {
        formLembrete.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = document.getElementById('inputLembrete');
            if (input && input.value) {
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
            if (e.target.closest('.btn-delete')) {
                e.target.closest('li').remove();
            }
            if (e.target.closest('.btn-hide')) {
                const li = e.target.closest('li');
                li.classList.toggle('lembrete-oculto');
                const i = li.querySelector('.btn-hide i');
                if (i) {
                    i.classList.toggle('bi-eye');
                    i.classList.toggle('bi-eye-slash');
                }
            }
        });
    }
});