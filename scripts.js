
let bd = {};
let episodiosAbertos = [];

const CHAVE_FAVORITOS = "seriesApi_favoritos";
let favoritos = carregarFavoritos();

const requisicaoPesquisa = [];
let requisicaoSerie = null;

// Elementos da tela inicial e da tela principal
const formulario = document.querySelector(".Formulario");
const sitePrincipal = document.querySelector(".MainSite");

const botoesBuscar = document.querySelectorAll(".btnBuscar");
const selectsBuscar = document.querySelectorAll(".selectBuscar");
const camposBuscar = document.querySelectorAll(".txtBuscar");
const mensagensBusca = document.querySelectorAll(".mensagem-busca");

// URLs das APIs
const API_PESQUISA =
    "https://addedufa6qbaxxeh5xles4qzhy0ovvah.lambda-url.us-east-1.on.aws/";

const API_SERIE =
    "https://5gq3hyraihfvst6qq2xsbr26gu0skmws.lambda-url.us-east-1.on.aws/";

// Exibe mensagens na interface
function mostrarMensagem(elemento, mensagem = "", tipo = "") {
    if (!elemento) return;

    elemento.textContent = mensagem;
    elemento.className = "mensagem-busca";

    if (tipo) {
        elemento.classList.add(tipo);
    }
}


function mostrarMensagemFavorito(mensagem) {
    const elemento = document.querySelector(".mensagem-favorito");

    if (elemento) {
        elemento.textContent = mensagem;
    }
}

function atualizarBotaoFavorito() {
    const botao = document.querySelector(".btnFavorito");

    if (!botao || !bd || bd.id == null) return;

    const estaFavoritada = favoritos.some(
        (serie) => String(serie.id) === String(bd.id)
    );

    botao.textContent = estaFavoritada
        ? "♥ Remover dos favoritos"
        : "♡ Adicionar aos favoritos";

    botao.setAttribute("aria-pressed", String(estaFavoritada));
}


function alternarFavorito() {
    if (!bd || bd.id == null || !bd.nome) {
        mostrarMensagemFavorito("Nenhuma série selecionada.");
        return;
    }

    const id = String(bd.id);

    const indice = favoritos.findIndex(
        (serie) => String(serie.id) === id
    );

    if (indice >= 0) {
        favoritos.splice(indice, 1);
        mostrarMensagemFavorito("Série removida dos favoritos.");
    } else {
        favoritos.push({
            id: id,
            nome: bd.nome,
            fotoPoster: bd.fotoPoster || ""
        });

        mostrarMensagemFavorito("Série adicionada aos favoritos!");
    }

    if (!salvarFavoritos()) {
        if (indice >= 0) {
            favoritos.splice(indice, 0, {
                id: id,
                nome: bd.nome,
                fotoPoster: bd.fotoPoster || ""
            });
        } else {
            favoritos = favoritos.filter(
                (serie) => String(serie.id) !== id
            );
        }

        mostrarMensagemFavorito(
            "Não foi possível salvar os favoritos neste navegador."
        );

        atualizarBotaoFavorito();
        renderizarFavoritos();
        return;
    }

    atualizarBotaoFavorito();
    renderizarFavoritos();
}


function renderizarFavoritos() {
    const container = document.querySelector(".favoritos-container");

    if (!container) return;

    container.innerHTML = "";

    if (favoritos.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "favoritos-vazio";
        mensagem.textContent =
            "Você ainda não adicionou séries aos favoritos.";

        container.appendChild(mensagem);
        return;
    }

    favoritos.forEach((serie) => {
        const cartao = document.createElement("article");
        cartao.className = "favorito-card";

        const imagem = document.createElement("img");
        imagem.alt = `Pôster de ${serie.nome}`;
        imagem.loading = "lazy";

        configurarImagem(
            imagem,
            serie.fotoPoster,
            `Pôster de ${serie.nome}`
        );

        const titulo = document.createElement("h3");
        titulo.textContent = serie.nome;

        const botaoAbrir = document.createElement("button");
        botaoAbrir.type = "button";
        botaoAbrir.className = "botao";
        botaoAbrir.textContent = "Ver série";

        botaoAbrir.addEventListener("click", () => {
            pegaSerie(serie.id);
        });

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.className = "botao botao-remover";
        botaoRemover.textContent = "Remover";

        botaoRemover.addEventListener("click", () => {
            const indice = favoritos.findIndex(
                (item) => String(item.id) === String(serie.id)
            );

            if (indice === -1) return;

            const removida = favoritos.splice(indice, 1)[0];

            if (!salvarFavoritos()) {
                favoritos.splice(indice, 0, removida);
                mostrarMensagemFavorito(
                    "Não foi possível atualizar os favoritos."
                );
                return;
            }

            renderizarFavoritos();
            atualizarBotaoFavorito();
            mostrarMensagemFavorito("Série removida dos favoritos.");
        });

        cartao.append(imagem, titulo, botaoAbrir, botaoRemover);
        container.appendChild(cartao);
    });
}

function carregarFavoritos() {
    try {
        const dados = localStorage.getItem(CHAVE_FAVORITOS);

        if (!dados) {
            return [];
        }

        const seriesSalvas = JSON.parse(dados);

        return Array.isArray(seriesSalvas)
            ? seriesSalvas.filter(
                (serie) =>
                    serie &&
                    serie.id != null &&
                    typeof serie.nome === "string"
            )
            : [];
    } catch (erro) {
        console.error("Erro ao carregar favoritos:", erro);
        return [];
    }
}


function salvarFavoritos() {
    try {
        localStorage.setItem(
            CHAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );

        return true;
    } catch (erro) {
        console.error("Erro ao salvar favoritos:", erro);
        return false;
    }
}
 
// Configura uma imagem com tratamento para falhas de carregamento
function configurarImagem(imagem, url, textoAlternativo) {
    imagem.alt = textoAlternativo;
    imagem.loading = "lazy";

    // Evita manter uma imagem quebrada quando não há URL.
    if (!url || typeof url !== "string") {
        imagem.removeAttribute("src");
        imagem.classList.add("imagem-indisponivel");
        return;
    }

    imagem.classList.remove("imagem-indisponivel");

    imagem.onerror = () => {
        imagem.removeAttribute("src");
        imagem.classList.add("imagem-indisponivel");
    };

    imagem.src = url;
}

// Limpa mensagens e resultados anteriores
function limparPesquisa(index) {
    const select = selectsBuscar[index];

    mostrarMensagem(mensagensBusca[index]);
    select.innerHTML = "";
    select.style.display = "none";
    select.disabled = true;
}

// Realiza a pesquisa ao clicar no botão
botoesBuscar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        pesquisar(camposBuscar[index].value, index);
    });
});

// Permite pesquisar pressionando Enter
camposBuscar.forEach((campo, index) => {
    campo.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            pesquisar(campo.value, index);
        }
    });
});

// Pesquisa séries pelo nome
async function pesquisar(nomeSerie, index) {
    nomeSerie = nomeSerie.trim();

    const campo = camposBuscar[index];
    const botao = botoesBuscar[index];
    const select = selectsBuscar[index];
    const mensagem = mensagensBusca[index];
    requisicaoPesquisa[index]?.abort();

    if (!nomeSerie) {
        limparPesquisa(index);
        mostrarMensagem(
            mensagem,
            "Digite o nome de uma série para pesquisar.",
            "erro"
        );

        campo.focus();
        return;
    }

    // Cancela uma pesquisa anterior da mesma área
    requisicaoPesquisa[index]?.abort();

    const controller = new AbortController();
    requisicaoPesquisa[index] = controller;

    limparPesquisa(index);
    mostrarMensagem(mensagem, "Pesquisando séries...", "carregando");

    botao.disabled = true;
    campo.disabled = true;

    const url =
        `${API_PESQUISA}?search=${encodeURIComponent(nomeSerie)}`;

    try {
        const resposta = await fetch(url, {
            signal: controller.signal
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados.results)) {
            throw new Error("Formato de resposta inesperado.");
        }

        // Evita exibir resultados de uma pesquisa antiga
        if (requisicaoPesquisa[index] !== controller) return;

        if (dados.results.length === 0) {
            mostrarMensagem(
                mensagem,
                "Nenhuma série encontrada. Tente outro nome.",
                "erro"
            );
            return;
        }

        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";
        opcaoInicial.textContent = "Selecione uma série";
        opcaoInicial.disabled = true;
        opcaoInicial.selected = true;

        select.appendChild(opcaoInicial);

        dados.results.forEach((serie) => {
            if (serie.id == null) return;

            const opcao = document.createElement("option");
            opcao.value = serie.id;
            opcao.textContent = serie.name || "Série sem nome";

            select.appendChild(opcao);
        });

        if (select.options.length <= 1) {
            mostrarMensagem(
                mensagem,
                "Não foi possível encontrar séries válidas.",
                "erro"
            );
            return;
        }

        select.disabled = false;
        select.style.display = "block";

        mostrarMensagem(
            mensagem,
            `${select.options.length - 1} resultado(s) encontrado(s).`,
            "sucesso"
        );
    } catch (erro) {
        if (erro.name === "AbortError") return;

        console.error("Erro na pesquisa:", erro);

        if (requisicaoPesquisa[index] === controller) {
            mostrarMensagem(
                mensagem,
                "Não foi possível pesquisar agora. Verifique sua conexão e tente novamente.",
                "erro"
            );
        }
    } finally {
        if (requisicaoPesquisa[index] === controller) {
            botao.disabled = false;
            campo.disabled = false;
        }
    }
}

// Evento de seleção de uma série
selectsBuscar.forEach((select) => {
    select.addEventListener("change", () => {
        if (select.value) {
            pegaSerie(select.value);
        }
    });
});

// Busca os dados completos de uma série
async function pegaSerie(id) {
    if (requisicaoSerie) {
        requisicaoSerie.abort();
    }

    const controller = new AbortController();
    requisicaoSerie = controller;

    // Oculta os dados anteriores durante o carregamento
    sitePrincipal.style.display = "none";
    formulario.style.display = "block";

    const selectAtual = Array.from(selectsBuscar).find(
        (select) => select.value === id
    );

    try {
        // Informa que os detalhes estão sendo carregados
        if (selectAtual) {
            selectAtual.disabled = true;
        }

        const resposta = await fetch(
            `${API_SERIE}?id=${encodeURIComponent(id)}`,
            { signal: controller.signal }
        );

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!dados || typeof dados !== "object" || !dados.nome) {
            throw new Error("Dados da série inválidos.");
        }

        if (requisicaoSerie !== controller) return;

        bd = {
            ...dados,
            id: dados.id ?? id
        };

        episodiosAbertos = new Array(
            Array.isArray(bd.temporadas) ? bd.temporadas.length : 0
        ).fill(false);

        mostraSite(bd);

        formulario.style.display = "none";
        sitePrincipal.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } catch (erro) {
        if (erro.name === "AbortError") return;

        console.error("Erro ao carregar a série:", erro);

        
    if (requisicaoSerie === controller) {
        const indiceBusca = Array.from(selectsBuscar).findIndex(
            (select) => select === selectAtual
        );

        const mensagem = indiceBusca >= 0
            ? mensagensBusca[indiceBusca]
            : null;

        if (mensagem) {
            mostrarMensagem(
                mensagem,
                "Não foi possível carregar os detalhes da série. Tente novamente.",
                "erro"
            );
        }
    }
    } finally {
        if (requisicaoSerie === controller && selectAtual) {
            selectAtual.disabled = false;
        }
    }
}

// Mostra as informações da série
function mostraSite(paisagemSerie) {
    const nomeSerie = document.querySelector(".info h1");
    const generos = document.querySelector(".generos");
    const resumo = document.querySelector(".cabecalho-serie .info p");
    const nota = document.querySelector(".cabecalho-serie .info .nota");
    const poster = document.querySelector("header .poster img");
    const header = document.querySelector(".cabecalho-serie");

    nomeSerie.textContent =
        paisagemSerie.nome || "Nome não informado";

    generos.textContent =
        (paisagemSerie.generos || []).join(" | ") ||
        "Gêneros não informados";

    resumo.textContent =
        paisagemSerie.resumo || "Sinopse não disponível.";

    nota.textContent =
        typeof paisagemSerie.nota === "number"
            ? paisagemSerie.nota.toFixed(1)
            : "N/A";

    configurarImagem(
        poster,
        paisagemSerie.fotoPoster,
        `Pôster da série ${paisagemSerie.nome || ""}`
    );

    if (paisagemSerie.fotoBg) {
        header.style.backgroundImage =
            `url("${paisagemSerie.fotoBg}")`;
    } else {
        header.style.backgroundImage = "none";
    }

    mostrarElenco(
        Array.isArray(paisagemSerie.elenco)
            ? paisagemSerie.elenco
            : []
    );

    mostrarTemporadas(
        Array.isArray(paisagemSerie.temporadas)
            ? paisagemSerie.temporadas
            : []
    );

    atualizarBotaoFavorito();
}

// Mostra o elenco
function mostrarElenco(elenco) {
    const elencoContainer =
        document.querySelector(".elenco-container");

    elencoContainer.innerHTML = "";

    if (elenco.length === 0) {
        elencoContainer.textContent = "Elenco não disponível.";
        return;
    }

    elenco.forEach((ator) => {
        const card = document.createElement("div");
        card.className = "ator";

        const imagem = document.createElement("img");
        configurarImagem(
            imagem,
            ator.foto,
            `Foto de ${ator.nome || "ator"}`
        );

        const nome = document.createElement("span");
        nome.className = "nome";
        nome.textContent = ator.nome || "Nome não informado";

        const personagem = document.createElement("span");
        personagem.className = "personagem";
        personagem.textContent =
            ator.personagem || "Personagem não informado";

        card.append(imagem, nome, personagem);
        elencoContainer.appendChild(card);
    });
}

// Mostra as temporadas
function mostrarTemporadas(temporadas) {
    const temporadasContainer =
        document.querySelector(".temporadas-container");

    temporadasContainer.innerHTML = "";

    if (temporadas.length === 0) {
        temporadasContainer.textContent =
            "Temporadas não disponíveis.";
        return;
    }

    temporadas.forEach((temporada, index) => {
        const cardTemporada = document.createElement("div");
        cardTemporada.className = "temporada";

        const poster = document.createElement("div");
        poster.className = "poster";

        const imagem = document.createElement("img");
        configurarImagem(
            imagem,
            temporada.poster,
            `Pôster da temporada ${temporada.numero || index + 1}`
        );

        poster.appendChild(imagem);

        const informacoes = document.createElement("div");
        informacoes.className = "info";

        const titulo = document.createElement("h3");
        titulo.textContent =
            `Temporada ${temporada.numero || index + 1}`;

        const exibicao = document.createElement("div");
        exibicao.className = "subtitulo";
        exibicao.textContent =
            temporada.exibicao || "Data de exibição não informada";

        const sinopse = document.createElement("p");
        sinopse.className = "sinopse";
        sinopse.textContent =
            temporada.resumo || "Sinopse não disponível.";

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao";
        botao.textContent = "Ver episódios";
        botao.setAttribute("aria-expanded", "false");

        const episodios = document.createElement("div");
        episodios.className = "episodios";

        botao.addEventListener("click", () => {
            mostrarEpisodios(index, episodios, botao);
        });

        informacoes.append(
            titulo,
            exibicao,
            sinopse,
            botao,
            episodios
        );

        cardTemporada.append(poster, informacoes);
        temporadasContainer.appendChild(cardTemporada);
    });
}

// Mostra ou oculta os episódios
function mostrarEpisodios(index, container, botao) {
    if (!episodiosAbertos[index]) {
        const episodios = bd.temporadas[index]?.episodios || [];

        container.innerHTML = "";

        if (episodios.length === 0) {
            container.textContent = "Episódios não disponíveis.";
        } else {
            episodios.forEach((episodio) => {
                const card = document.createElement("div");
                card.className = "episodio";

                const foto = document.createElement("div");
                foto.className = "foto";

                const imagem = document.createElement("img");
                configurarImagem(
                    imagem,
                    episodio.foto,
                    `Imagem do episódio ${episodio.nome || ""}`
                );

                foto.appendChild(imagem);

                const informacoes = document.createElement("div");
                informacoes.className = "info";

                const titulo = document.createElement("h4");
                titulo.textContent =
                    episodio.nome || "Episódio sem nome";

                const resumo = document.createElement("p");
                resumo.textContent =
                    episodio.resumo || "Resumo não disponível.";

                informacoes.append(titulo, resumo);
                card.append(foto, informacoes);
                container.appendChild(card);
            });
        }

        container.style.display = "flex";
        botao.textContent = "Ocultar episódios";
        botao.setAttribute("aria-expanded", "true");
        episodiosAbertos[index] = true;
    } else {
        const estaVisivel = container.style.display !== "none";

        container.style.display = estaVisivel ? "none" : "flex";

        botao.textContent = estaVisivel
            ? "Ver episódios"
            : "Ocultar episódios";

        botao.setAttribute(
            "aria-expanded",
            String(!estaVisivel)
        );
    }
}


document.querySelector(".btnFavorito")?.addEventListener(
    "click",
    alternarFavorito
);

renderizarFavoritos();
