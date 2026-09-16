# 🎬 Series API

Aplicação web desenvolvida com **HTML**, **CSS** e **JavaScript** para pesquisa e consulta de informações sobre séries, incluindo gêneros, sinopse, avaliação, elenco, temporadas e episódios.

O projeto foi originalmente desenvolvido durante minha formação técnica e posteriormente revisitado e reorganizado para compor meu portfólio, recebendo melhorias na estrutura dos arquivos, na interface, na responsividade, na organização do código e na experiência de navegação.

## ✨ Funcionalidades

### 🔎 Pesquisa de séries

* Pesquisa de séries por nome;
* Exibição dos resultados encontrados;
* Seleção de uma série para consultar seus detalhes;
* Possibilidade de pesquisar outra série após a consulta.

### 📺 Informações da série

* Exibição do pôster da série;
* Nome da série;
* Gêneros;
* Sinopse;
* Avaliação;
* Imagem de fundo relacionada à série.

### 🎭 Elenco

* Exibição dos atores da série;
* Nome dos atores;
* Personagens interpretados;
* Imagens do elenco.

### 🎞️ Temporadas e episódios

* Listagem das temporadas disponíveis;
* Exibição da capa de cada temporada;
* Quantidade de episódios;
* Expansão e ocultação da lista de episódios;
* Exibição das capas dos episódios;
* Títulos e descrições dos episódios.

## 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Fetch API
* Consumo de APIs REST
* JSON
* Manipulação do DOM
* Design responsivo
* Google Fonts

## 🔌 APIs utilizadas

O projeto utiliza APIs externas para realizar pesquisas e obter informações detalhadas sobre séries, elenco, temporadas e episódios.

As requisições são realizadas utilizando a **Fetch API**, e os dados recebidos em formato **JSON** são utilizados para atualizar dinamicamente a interface da aplicação.

## 📁 Estrutura do projeto

series-api/

│
├── index.html
├── style.css
├── scripts.js
└── README.md

## ⚙️ Como executar o projeto

### 1. Clone o repositório

git clone https://github.com/laraisabelysiq/series-api.git

Entre na pasta do projeto:

cd series-api

### 2. Abra o projeto

Abra a pasta do projeto no **Visual Studio Code**.

### 3. Execute com o Live Server

Abra o arquivo `index.html` e execute utilizando a extensão **Live Server**.

A aplicação será aberta no navegador.

### 4. Utilize a aplicação

1. Digite o nome de uma série no campo de pesquisa;
2. Selecione um resultado encontrado;
3. Clique em **Buscar série**;
4. Consulte as informações, o elenco, as temporadas e os episódios disponíveis.

## 📌 Organização do código

### `index.html`

Responsável pela estrutura da aplicação, incluindo:

* Tela inicial;
* Campos de pesquisa;
* Área de informações da série;
* Seção do elenco;
* Seção de temporadas e episódios.

### `style.css`

Responsável pela estilização da aplicação, incluindo:

* Cores e tipografia;
* Layout da tela inicial;
* Cards de elenco;
* Cards de temporadas;
* Quadros de episódios;
* Responsividade para diferentes tamanhos de tela.

### `scripts.js`

Responsável pela lógica da aplicação, incluindo:

* Pesquisa de séries;
* Consumo das APIs;
* Tratamento das respostas;
* Atualização dinâmica do HTML;
* Exibição das informações da série;
* Criação dos cards de elenco;
* Criação dos cards de temporadas e episódios;
* Expansão e ocultação dos episódios.

## ⚠️ Tratamento e validações

A aplicação realiza verificações para melhorar a experiência do usuário, incluindo:

* Validação do preenchimento do campo de pesquisa;
* Verificação da existência de resultados;
* Verificação de respostas bem-sucedidas das APIs;
* Tratamento de possíveis erros nas requisições;
* Exibição de mensagens no console para auxiliar na identificação de problemas;
* Uso de `encodeURIComponent` para tratar corretamente os termos pesquisados nas URLs.

## 🚀 Possíveis melhorias

* Adicionar mensagens visuais para erros de pesquisa;
* Criar uma tela de carregamento durante as requisições;
* Adicionar paginação ou carregamento de mais resultados;
* Implementar filtros por gênero;
* Permitir favoritar séries;
* Criar uma lista de séries favoritas;
* Adicionar modo escuro e modo claro;
* Melhorar a acessibilidade da aplicação;
* Adicionar testes automatizados;
* Publicar a aplicação utilizando GitHub Pages ou outra plataforma de hospedagem.

## 👩‍💻 Autora

Desenvolvido por **Lara Isabely Alves Siqueira**.
