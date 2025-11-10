# 🩺 Projeto Agenda Veterinária - Sistema de Gerenciamento CRUD

Este projeto foi desenvolvido como um trabalho individual para a disciplina de **Desenvolvimento Front End**. O objetivo é criar um sistema web completo para a **gestão de Pets e Agendamentos de Consultas**, integrando o frontend com uma API RESTful.

---

## ⭐️ Conformidade e Critérios de Avaliação

O projeto atende integralmente aos critérios de funcionalidade e estrutura exigidos, conforme detalhado abaixo:

- **1 para N:** Implementação da relação **Pet (1)** para **Consultas (N)**.
- **CRUD Completo:** As operações **Create, Read, Update, Delete** estão totalmente funcionais na entidade **Pets**.
- **Busca:** Implementada para filtrar a lista de Pets por **ID**.
- **Organização :** Código JavaScript modular, rotas RESTful organizadas no backend e estrutura de pastas clara.
* **Busca (GET com LIKE):** Implementada para filtrar a lista de Pets por **Nome ou Dono**, atendendo ao requisito de busca parcial.

---

## ⚙️ Stack Tecnológico

| Componente         | Tecnologia                                           | Observações                                                               |
| :----------------- | :--------------------------------------------------- | :------------------------------------------------------------------------ |
| **Frontend**       | HTML5, CSS3 (Puro), JavaScript (Puro)                | Foco em legibilidade, semântica e boas práticas de manipulação do DOM.    |
| **Backend**        | [SUA TECNOLOGIA DE BACKEND, ex: Node.js com Express] | Responsável por fornecer a API REST e a comunicação com o banco de dados. |
| **Banco de Dados** | [SEU BANCO DE DADOS, ex: MySQL, PostgreSQL]          | [Detalhe o nome do seu arquivo SQL, ex: `agenda_vet.sql`]                 |

---

## 📂 Estrutura de Pastas

A estrutura do projeto está organizada para separar o Frontend (HTML, CSS, JS) do Backend (API e Modelos):

```
AGENDA_VET/
├── backend/ <-- Rotas, Controllers e Models da API
│ ├── controllers/
│ ├── models/
│ └── routes/
├── frontend/ <-- Interface de Usuário
│ ├── cadastrar_pet/
├── agendar_consulta/
│ ├── menu.html
│ └── script.js
└── README.md
```

---

## 🚀 Como Executar o Projeto

Para visualizar a aplicação, siga os seguintes passos:

1.  **Backend:** Inicie o servidor da API na porta correta (geralmente `3000` ou `8080`).
    - Navegue até a pasta `backend/`.
    - Execute o comando de inicialização (Ex: `npm start` ou `node server.js`).
2.  **Frontend:** Abra o arquivo `frontend/menu.html` no seu navegador usando a extensão **Live Server** (recomendado no VS Code) ou similar, para evitar problemas de CORS nas requisições `fetch()`.

---

**Desenvolvido por:** Pedro Henrique França Rezende

## 🎯 Padrões de Desenvolvimento

Este projeto adere a boas práticas para garantir código limpo e manutenível:

- **Estrutura Modular:** O código JavaScript é organizado em funções com responsabilidades únicas (Ex: `listarPets()`, `cadastrarPet()`, `atualizarPet()`), facilitando a manutenção e testes.
- **Design Responsivo:** O layout foi otimizado para diferentes tamanhos de tela (Desktop e Mobile), garantindo usabilidade.
- **Tratamento de Fluxo:** Utilização de _toggles_ e validações no frontend para gerenciar o estado da aplicação (Ex: exibição de botões de Atualizar/Cadastrar) e tratamento de erros de API (Ex: 404).

---
