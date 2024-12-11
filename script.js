document.addEventListener('DOMContentLoaded', () => {
    let nomePragueiro = localStorage.getItem("nomePragueiro") || "";
    let numeroPlanta = parseInt(localStorage.getItem("numeroPlanta")) || 1;
    let talhaoSelecionado = localStorage.getItem("talhaoSelecionado") || "P3";
    let dadosPragas = JSON.parse(localStorage.getItem("dadosPragas")) || [];

    // Referências aos elementos
    const nomePragueiroInput = document.getElementById('nomePragueiro');
    const talhaoSelect = document.getElementById('talhao');
    const numeroPlantaInput = document.getElementById('numeroPlanta');
    const adicionarPlantaBtn = document.getElementById('adicionarPlanta');
    const adicionarPragaBtn = document.getElementById('adicionarPraga');
    const tabelaDados = document.getElementById('tabelaDados');
    const botaoExcluirTodos = document.getElementById('btnExcliuirtudo');

    // Inicializa os valores
    nomePragueiroInput.value = nomePragueiro;
    numeroPlantaInput.value = numeroPlanta;
    talhaoSelect.value = talhaoSelecionado;

    // Atualizar visualização dos dados
    function atualizarTabela() {
        tabelaDados.innerHTML = "";
        dadosPragas.forEach((registro) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${registro.Talhao}</td>    
                <td>${registro.Planta}</td>
                <td>${registro.Pragueiro}</td>
                <td>${registro.Nome}</td>
                <td>${registro.Quantidade}</td>
                <td>${registro.Observacoes}</td>
            `;
            tabelaDados.appendChild(row);
        });
    }

    atualizarTabela();

    // Adicionar nova planta
    adicionarPlantaBtn.addEventListener('click', () => {
        numeroPlanta++;
        numeroPlantaInput.value = numeroPlanta;
        localStorage.setItem("numeroPlanta", numeroPlanta);
    });

    // Adicionar nova praga
    adicionarPragaBtn.addEventListener('click', () => {
        const nomePraga = document.getElementById('nomePraga').value.trim();
        const quantidade = parseInt(document.getElementById('quantidade').value) || 0;
        const observacoes = document.getElementById('observacoes').value.trim();

        // Verificar se o nome do pragueiro está preenchido
        nomePragueiro = nomePragueiroInput.value.trim();
        if (!nomePragueiro) {
            alert("Por favor, insira o nome do pragueiro.");
            return;
        }

        // Verificar se o nome da praga está preenchido
        if (!nomePraga) {
            alert("Por favor, insira o nome da praga.");
            return;
        }

        // Criar o registro da praga
        const registro = {
            Talhao: talhaoSelect.value,
            Planta: numeroPlanta,
            Pragueiro: nomePragueiro,
            Nome: nomePraga,
            Quantidade: quantidade,
            Observacoes: observacoes,
        };

        // Adicionar o registro aos dados
        dadosPragas.push(registro);
        localStorage.setItem("dadosPragas", JSON.stringify(dadosPragas));
        atualizarTabela();
        alert("Praga registrada!");

        // Resetar apenas os campos de praga e observações
        document.getElementById('nomePraga').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('observacoes').value = '';
    });

    // Botão para excluir todos os dados
    botaoExcluirTodos.addEventListener('click', () => {
        // Limpar a tabela visível
        tabelaDados.innerHTML = '';

        // Resetar o estado global
        dadosPragas = [];
        numeroPlanta = 1;
        nomePragueiro = "";

        // Limpar o localStorage
        localStorage.clear();

        // Atualizar campos
        numeroPlantaInput.value = numeroPlanta;
        nomePragueiroInput.value = nomePragueiro;
        talhaoSelect.value = talhaoSelecionado;

        alert('Todos os dados foram excluídos e o número da planta foi resetado para 1.');
    });
});
