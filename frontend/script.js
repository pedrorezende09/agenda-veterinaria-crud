const API_BASE = 'http://localhost:3000/api';
const API_URL_PETS = `${API_BASE}/pets`;
const API_URL_CONSULTAS = `${API_BASE}/consultas`;

document.addEventListener("DOMContentLoaded", () => {
    const cadastroPetForm = document.getElementById("cadastroPetForm");
    if (cadastroPetForm) {
        cadastroPetForm.addEventListener("submit", submeterFormularioPet);
        document.getElementById("btnBuscarPet")?.addEventListener("click", iniciarBuscaPetNoCadastro);
        document.getElementById("btnAtualizarPet")?.addEventListener("click", atualizarPet); 
        document.getElementById("btnCadastrarPet")?.addEventListener("click", cadastrarPet); 
        listarPets();
    }


    const agendarConsultaForm = document.getElementById("agendarConsultaForm");
    if (agendarConsultaForm) {
        agendarConsultaForm.addEventListener("submit", cadastrarConsulta);
        document.getElementById("btnBuscarConsulta")?.addEventListener("click", iniciarBuscaConsulta);
        document.getElementById("btnBuscarPorId")?.addEventListener("click", buscarPetParaAgendamento); 
        listarConsultas();
    }
    

    toggleBotoesPet(true);
});


function toggleBotoesPet(isCadastroMode) {
    const btnCadastrar = document.getElementById("btnCadastrarPet");
    const btnAtualizar = document.getElementById("btnAtualizarPet");
    const idInput = document.getElementById("id_pet_oculto");

    if (btnCadastrar && btnAtualizar) {
        if (isCadastroMode) {
            btnCadastrar.style.display = 'inline-block';
            btnAtualizar.style.display = 'none';
            idInput.value = ''; 
        } else {
            btnCadastrar.style.display = 'none';
            btnAtualizar.style.display = 'inline-block';
        }
    }
}


function submeterFormularioPet(e) {
    e.preventDefault();
   
}


async function iniciarBuscaPetNoCadastro() {
    const input = document.getElementById("inputBuscaNome"); 
    const valorBusca = input.value.trim();

    if (!valorBusca) {
        listarPets();
        return;
    }

    const idBusca = parseInt(valorBusca, 10);
    const isId = !isNaN(idBusca) && idBusca > 0;

    if (isId) {
        try {

            const res = await fetch(`${API_URL_PETS}/${idBusca}`);

            if (res.status === 404) {
                alert(`Pet com ID ${idBusca} não encontrado.`);
                return;
            }
            if (!res.ok) throw new Error("Erro ao buscar pet por ID.");

            const pet = await res.json();
            

            preencherFormularioPetParaEdicao(pet);
            alert(`✅ Pet "${pet.nome}" (ID: ${pet.id_pet}) encontrado! Pronto para edição.`);
            
            exibirPetsNaTabela([pet]); 

        } catch (err) {
            console.error(err);
            alert("Erro ao buscar pet por ID. Veja console.");
        }
    } else {

        try {
            const res = await fetch(`${API_URL_PETS}/buscar?nome=${encodeURIComponent(valorBusca)}&dono=${encodeURIComponent(valorBusca)}`);
            
            if (!res.ok) throw new Error("Erro ao buscar pet.");

            const pets = await res.json();
            exibirPetsNaTabela(pets);

            if (pets.length === 1) {
                preencherFormularioPetParaEdicao(pets[0]);
            } else if (pets.length > 1) {
                alert(`Encontrados ${pets.length} pets. Refine a busca.`);
            } else {
                alert("Nenhum pet encontrado com esse nome/dono.");
            }

        } catch (err) {
            console.error(err);
            alert("Erro ao buscar pet. Veja console.");
        }
    }
}



function preencherFormularioPetParaEdicao(pet) {
    const form = document.getElementById("cadastroPetForm");
    if (!form) return;


    document.getElementById("id_pet_oculto").value = pet.id_pet;
    
    form.nome.value = pet.nome;
    form.especie.value = pet.especie;
    form.raca.value = pet.raca;
    form.idade.value = pet.idade;
    form.dono.value = pet.dono;


    toggleBotoesPet(false);
}


async function cadastrarPet() {
    const form = document.getElementById("cadastroPetForm");
    const data = {
        nome: form.nome.value,
        especie: form.especie.value,
        raca: form.raca.value,
        idade: parseInt(form.idade.value),
        dono: form.dono.value
    };

    try {
        const res = await fetch(API_URL_PETS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Erro ao cadastrar pet");
        alert("✅ Pet cadastrado com sucesso!");
        form.reset();
        toggleBotoesPet(true); 
        listarPets();
    } catch (err) {
        console.error(err);
        alert("Erro ao cadastrar pet. Veja console.");
    }
}


async function buscarPetParaEdicao(id) {
    if (!id) {
        alert("ID do Pet não fornecido para edição.");
        return;
    }

    try {
        const res = await fetch(`${API_URL_PETS}/${id}`); 
        
        if (res.status === 404) {
            alert("Pet não encontrado no banco de dados.");
            return;
        }
        if (!res.ok) throw new Error("Erro ao buscar dados do pet para edição.");

        const pet = await res.json();
        

        preencherFormularioPetParaEdicao(pet);
        
    } catch (err) {
        console.error(err);
        alert("Falha ao carregar dados do pet. Veja console.");
    }
}


async function atualizarPet() {
    const form = document.getElementById("cadastroPetForm");
    const id = document.getElementById("id_pet_oculto").value;

    if (!id) {
        alert("Selecione um pet para atualizar usando a busca.");
        return;
    }

    const data = {
        nome: form.nome.value,
        especie: form.especie.value,
        raca: form.raca.value,
        idade: parseInt(form.idade.value),
        dono: form.dono.value
    };

    try {
        const res = await fetch(`${API_URL_PETS}/${id}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Erro ao atualizar pet");
        alert("✅ Pet atualizado com sucesso!");
        form.reset();
        document.getElementById("inputBuscaNome").value = '';
        toggleBotoesPet(true); 
        listarPets();
    } catch (err) {
        console.error(err);
        alert("Erro ao atualizar pet. Veja console.");
    }
}

async function listarPets() {
    try {
        const res = await fetch(API_URL_PETS);
        const pets = await res.json();
        exibirPetsNaTabela(pets);
    } catch (err) {
        console.error(err);
    }
}


function exibirPetsNaTabela(pets) {
    const tbody = document.getElementById("petsBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    pets.forEach(pet => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-label="ID">${pet.id_pet}</td>
            <td data-label="Nome">${pet.nome}</td>
            <td data-label="Espécie">${pet.especie}</td>
            <td data-label="Raça">${pet.raca}</td>
            <td data-label="Dono">${pet.dono}</td> 
            <td data-label="Idade">${pet.idade}</td> 
            <td data-label="Ações">
                <button onclick="buscarPetParaEdicao(${pet.id_pet})" style="background-color: #003366; color:white; margin-right: 5px;">Editar</button>
                <button onclick="deletarPet(${pet.id_pet})" style="background-color: #d9534f; color:white;">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


async function deletarPet(id) {

    if (!confirm("Deseja realmente excluir este pet?")) return;
    try {
        const res = await fetch(`${API_URL_PETS}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao deletar pet");
        listarPets();
        alert("Pet excluído com sucesso!");
    } catch (err) {
        console.error(err);
        alert("Erro ao deletar pet. Veja console.");
    }
}


async function buscarPet(nomeOuDono) {
    if (!nomeOuDono) return listarPets();
    try {
        const res = await fetch(`${API_URL_PETS}/buscar?nome=${encodeURIComponent(nomeOuDono)}&dono=${encodeURIComponent(nomeOuDono)}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}


async function buscarPetParaAgendamento() {
    const idInput = document.getElementById("idPet").value.trim();
    const id = parseInt(idInput, 10);
    if (!id) { 
        alert("Digite um ID válido."); 
        return; 
    }

    try {
        const res = await fetch(`${API_URL_PETS}/${id}`); 
        if (!res.ok) {
            if (res.status === 404) alert("Pet não encontrado. Cadastre primeiro.");
            else throw new Error("Erro ao buscar pet");
            return;
        }

        const pet = await res.json();
        

        document.getElementById("nomePet").value = pet.nome;
        document.getElementById("nomeDono").value = pet.dono;
        

        document.getElementById("agendarConsultaForm").dataset.idPet = pet.id_pet;
        
        alert(`Pet [${pet.nome}] encontrado e pronto para agendar!`);
    } catch (err) {
        console.error(err);
        alert("Erro ao buscar pet.");
    }
}


async function cadastrarConsulta(e) {
    e.preventDefault();
    const form = e.target;

    const idPet = form.dataset.idPet;
    if (!idPet) {
        alert("Busque o pet antes de agendar pelo ID.");
        return;
    }
    

    const consulta = {
        id_pet: idPet,
        veterinario: "Dr. Veterinário",
        data: form.dataConsulta.value,
        hora: form.horaConsulta.value,
        motivo: form.motivo.value,
        status: "Pendente"
    };

    try {
        const res = await fetch(API_URL_CONSULTAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(consulta)
        });
        if (!res.ok) throw new Error("Erro ao agendar consulta");
        alert("✅ Consulta agendada com sucesso!");
        

        form.reset();
        form.dataset.idPet = "";
        
        listarConsultas();
    } catch (err) {
        console.error(err);
        alert("Erro ao cadastrar consulta.");
    }
}

async function listarConsultas() {
    try {
        const res = await fetch(API_URL_CONSULTAS);
        const consultas = await res.json();
        exibirConsultasNaTabela(consultas);
    } catch (err) {
        console.error(err);
    }
}

function exibirConsultasNaTabela(consultas) {
    const tbody = document.getElementById("consultasBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    consultas.forEach(c => {
        const dataFormat = c.data ? new Date(c.data).toLocaleDateString() : "";
        const horaFormat = c.hora ? c.hora.slice(0,5) : "";
        const nomePet = c.Pet?.nome || "N/A";
        const nomeDono = c.Pet?.dono || "N/A"; 

        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-label="ID">${c.id_consulta}</td>
            <td data-label="Nome do Pet">${nomePet}</td>
            <td data-label="Dono">${nomeDono}</td>
            <td data-label="Data">${dataFormat}</td>
            <td data-label="Hora">${horaFormat}</td> 
            <td data-label="Motivo">${c.motivo}</td> 
            <td data-label="Ações">
                <button onclick="deletarConsulta(${c.id_consulta})" style="background-color: #d9534f; color:white;">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function deletarConsulta(id) {
    if (!confirm("Deseja realmente excluir esta consulta?")) return;
    try {
        const res = await fetch(`${API_URL_CONSULTAS}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao deletar consulta");
        listarConsultas();
    } catch (err) {
        console.error(err);
    }
}


async function buscarConsultaPorNome(nomeOuDono) {
    if (!nomeOuDono) return listarConsultas();
    try {
        const res = await fetch(`${API_URL_CONSULTAS}/buscar?nome=${encodeURIComponent(nomeOuDono)}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function iniciarBuscaConsulta() {
    const nome = document.getElementById("inputBuscaConsulta").value.trim();
    const consultas = await buscarConsultaPorNome(nome);
    exibirConsultasNaTabela(consultas);
}