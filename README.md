# 🎬 Series API

Aplicação web desenvolvida com **HTML5, CSS3 e JavaScript** para pesquisa e consulta de informações sobre séries de televisão. A aplicação permite explorar detalhes das séries, visualizar elenco, temporadas e episódios, além de salvar produções favoritas diretamente no navegador.

O projeto foi originalmente desenvolvido durante minha formação técnica e posteriormente revisitado, refatorado e aprimorado para integrar meu portfólio de desenvolvimento. Essa evolução teve como objetivo melhorar a organização do código, a experiência do usuário, a responsividade da interface e o tratamento de erros durante as requisições às APIs.

## ✨ Funcionalidades

### 🔎 Pesquisa de séries

- Pesquisa de séries pelo nome.
- Exibição dos resultados encontrados pelas APIs.
- Seleção de uma série para consultar suas informações detalhadas.
- Possibilidade de realizar novas pesquisas após selecionar uma série.
- Codificação dos termos de pesquisa para utilização segura nas URLs.
- Mensagens de feedback durante as pesquisas e em situações de erro.

### 📺 Informações detalhadas

- Exibição do nome da série.
- Apresentação dos gêneros e da sinopse.
- Exibição da avaliação disponível.
- Pôster e imagem de fundo relacionados à série.
- Atualização dinâmica das informações conforme a série selecionada.

### 🎭 Elenco

- Listagem dos atores associados à série.
- Exibição dos nomes dos atores.
- Identificação dos personagens interpretados.
- Apresentação das imagens disponíveis do elenco.
- Organização das informações em cartões visuais.

### 🎞️ Temporadas e episódios

- Listagem das temporadas disponíveis.
- Exibição dos pôsteres das temporadas.
- Apresentação de informações sobre cada temporada, incluindo data de exibição, sinopse e quantidade de episódios, conforme os dados fornecidos pela API.
- Expansão e ocultação das listas de episódios.
- Exibição das imagens, dos títulos e das descrições dos episódios disponíveis.

### ❤️ Séries favoritas

- Adição e remoção de séries da lista de favoritos.
- Exibição das séries favoritas em uma seção dedicada.
- Armazenamento dos favoritos no `localStorage` do navegador.
- Persistência dos dados após atualizar a página, no mesmo navegador e dispositivo.
- Acesso aos detalhes de uma série diretamente pela lista de favoritos.
- Possibilidade de remover séries da lista por meio dos cartões de favoritos.

### 📱 Interface e experiência do usuário

- Layout responsivo para computadores, tablets e celulares.
- Interface organizada em seções para facilitar a navegação.
- Estados de carregamento e mensagens de feedback durante as pesquisas.
- Tratamento de falhas nas requisições.
- Tratamento visual para imagens indisponíveis.
- Elementos semânticos e atributos de acessibilidade, incluindo rótulos para campos de formulário e mensagens de status.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estrutura semântica da aplicação.
- **CSS3:** estilização, layouts, cartões, efeitos visuais e responsividade.
- **JavaScript:** lógica de programação e atualização dinâmica da interface.
- **Fetch API:** realização de requisições HTTP às APIs externas.
- **APIs REST:** obtenção de dados sobre séries e seus conteúdos.
- **JSON:** formato utilizado para receber e processar os dados das APIs.
- **DOM:** manipulação dinâmica dos elementos HTML.
- **AbortController:** cancelamento de requisições anteriores quando necessário.
- **LocalStorage:** persistência local da lista de séries favoritas.
- **Google Fonts:** utilização da fonte Roboto.

## 🔌 APIs utilizadas

A aplicação utiliza dois endpoints externos para obter os dados necessários ao funcionamento da interface:

- **API de pesquisa:** recebe o termo pesquisado e retorna os resultados correspondentes.
- **API de detalhes:** recebe o identificador de uma série e retorna informações detalhadas, incluindo dados de elenco, temporadas e episódios, conforme a disponibilidade da API.

As requisições são realizadas com a `Fetch API`. As respostas são verificadas e processadas em JavaScript, e os dados recebidos em formato JSON são utilizados para atualizar a interface dinamicamente.

Como as informações dependem de serviços externos, a disponibilidade e a quantidade de dados apresentados podem variar conforme a resposta das APIs.

## 📁 Estrutura do projeto

```text
series-api/
├── index.html
├── style.css
├── scripts.js
└── README.md
```

- **`index.html`:** estrutura e organização dos elementos da página.
- **`style.css`:** estilos visuais e regras de responsividade.
- **`scripts.js`:** lógica de pesquisa, integração com as APIs, renderização dos dados e gerenciamento dos favoritos.
- **`README.md`:** documentação do projeto, suas funcionalidades e instruções de execução.

## ⚙️ Como executar o projeto

### Pré-requisitos

- Navegador atualizado, como Google Chrome, Mozilla Firefox ou Microsoft Edge.
- Git instalado, caso deseje clonar o repositório.
- Visual Studio Code, recomendado para editar e executar o projeto.
- Extensão Live Server para facilitar a execução local.

Não é necessário instalar Node.js, configurar um banco de dados ou executar um servidor de backend próprio para utilizar a versão atual da aplicação.

### 1. Clone o repositório

```bash
git clone https://github.com/laraisabelysiq/series-api.git
```

### 2. Acesse a pasta do projeto

```bash
cd series-api
```

### 3. Abra o projeto no Visual Studio Code

Abra a pasta `series-api` no Visual Studio Code.

### 4. Execute a aplicação

Com a extensão Live Server instalada, abra o arquivo `index.html` e selecione **Open with Live Server**.

A aplicação será aberta no navegador padrão.

### 5. Utilize a aplicação

1. Digite o nome de uma série no campo de pesquisa.
2. Clique no botão de busca.
3. Selecione uma das opções encontradas.
4. Consulte os detalhes, o elenco, as temporadas e os episódios disponíveis.
5. Expanda as temporadas para visualizar os episódios.
6. Utilize o botão de favoritos para adicionar ou remover séries da sua lista.
7. Atualize a página para verificar a persistência dos favoritos no navegador.

**Observação:** a aplicação depende da disponibilidade dos endpoints externos. Caso as APIs estejam indisponíveis ou retornem erros, algumas funcionalidades poderão não funcionar temporariamente.

## 🧩 Organização e implementação

### `index.html`

Responsável pela estrutura da aplicação, incluindo:

- Tela inicial e campos de pesquisa.
- Área de apresentação das informações da série.
- Seções de elenco, temporadas e episódios.
- Seção dedicada às séries favoritas.
- Elementos semânticos, rótulos e atributos de acessibilidade.

### `style.css`

Responsável pela apresentação visual da aplicação, incluindo:

- Paleta de cores, tipografia e identidade visual.
- Layout da tela inicial e da barra de pesquisa.
- Estilização do cabeçalho, pôster e informações da série.
- Cartões de elenco, temporadas, episódios e favoritos.
- Estados visuais de botões e mensagens.
- Media queries para diferentes larguras de tela.
- Ajustes de imagens, espaçamento e legibilidade em dispositivos móveis.

### `scripts.js`

Responsável pela lógica de funcionamento da aplicação, incluindo:

- Pesquisa e seleção de séries.
- Comunicação com as APIs externas.
- Validação e processamento das respostas.
- Controle das requisições assíncronas.
- Exibição dinâmica dos dados da série.
- Criação dos cartões de elenco, temporadas e episódios.
- Expansão e ocultação dos episódios.
- Adição, remoção e renderização dos favoritos.
- Persistência dos favoritos utilizando `localStorage`.
- Exibição de mensagens de carregamento, sucesso e erro.
- Tratamento de imagens indisponíveis.

## 🛡️ Tratamento de erros e validações

Para tornar a experiência de utilização mais consistente, a aplicação contempla mecanismos de tratamento e validação, incluindo:

- Verificação de campos de pesquisa vazios.
- Tratamento de pesquisas sem resultados.
- Verificação do status das respostas HTTP.
- Validação básica dos dados recebidos antes da renderização.
- Tratamento de erros durante as requisições.
- Cancelamento de requisições anteriores em determinados fluxos de pesquisa e carregamento.
- Codificação dos parâmetros de pesquisa com `encodeURIComponent`.
- Exibição de mensagens para informar o usuário sobre carregamentos e falhas.
- Tratamento de imagens indisponíveis.
- Tratamento de falhas no acesso ao armazenamento local dos favoritos.

## ♿ Acessibilidade e usabilidade

A aplicação incorpora práticas voltadas à melhoria da experiência de navegação, como:

- Uso de elementos HTML semânticos.
- Rótulos associados aos campos de formulário.
- Mensagens de status acessíveis por tecnologias assistivas.
- Estados de foco visíveis em elementos interativos.
- Layout adaptável a diferentes tamanhos de tela.
- Respeito à preferência do usuário por redução de animações.

## 🚧 Melhorias futuras

O projeto poderá receber novas funcionalidades e aprimoramentos, como:

- Implementação de filtros por gênero.
- Ordenação dos resultados por nome, avaliação ou popularidade, conforme os dados disponíveis.
- Paginação ou carregamento progressivo de resultados.
- Melhoria dos mecanismos de busca e descoberta de séries.
- Testes automatizados para funções e fluxos principais.
- Otimização adicional de desempenho e acessibilidade.
- Melhorias na documentação e nos exemplos de utilização.
- Publicação da aplicação em uma plataforma de hospedagem.
- Aprimoramentos visuais e novas opções de personalização da interface.

## 👩‍💻 Autora

**Lara Isabely Alves Siqueira**

Projeto desenvolvido e aprimorado como parte do meu portfólio de programação, com foco no desenvolvimento web, na lógica de programação, no consumo de APIs REST, na manipulação do DOM e na construção de interfaces responsivas.

**GitHub:** [@laraisabelysiq](https://github.com/laraisabelysiq)

**Repositório:** [series-api](https://github.com/laraisabelysiq/series-api)
