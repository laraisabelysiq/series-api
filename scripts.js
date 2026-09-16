// Entre no site https://www.themoviedb.org
// https://5gq3hyraihfvst6qq2xsbr26gu0skmws.lambda-url.us-east-1.on.aws/?id=ID_DA_SERIE
//https://addedufa6qbaxxeh5xles4qzhy0ovvah.lambda-url.us-east-1.on.aws/?search=NOME_DA_SERIE

let bd = {};
let episodiosAbertos = [];

// Elementos da tela inicial e da tela principal
const formulario = document.querySelector(".Formulario");
const sitePrincipal = document.querySelector(".MainSite");

const botoesBuscar = document.querySelectorAll(".btnBuscar");
const selectsBuscar = document.querySelectorAll(".selectBuscar");
const camposBuscar = document.querySelectorAll(".txtBuscar");

// Eventos dos botões de pesquisa
botoesBuscar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        const nomeSerie = camposBuscar[index].value.trim();

        if (!nomeSerie) {
            alert("Digite o nome de uma série para pesquisar.");
            return;
        }

        pesquisar(nomeSerie, selectsBuscar[index]);
    });
});

// Permitir pesquisar pressionando Enter
camposBuscar.forEach((campo, index) => {
    campo.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const nomeSerie = campo.value.trim();

            if (!nomeSerie) {
                alert("Digite o nome de uma série para pesquisar.");
                return;
            }

            pesquisar(nomeSerie, selectsBuscar[index]);
        }
    });
});

// Pesquisa séries pelo nome
async function pesquisar(nomeSerie, selectElement) {
    const url =
        `https://addedufa6qbaxxeh5xles4qzhy0ovvah.lambda-url.us-east-1.on.aws/?search=${encodeURIComponent(nomeSerie)}`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao pesquisar séries.");
        }

        const dados = await resposta.json();

        selectElement.innerHTML = "";

        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";
        opcaoInicial.textContent = "Selecione uma série";
        opcaoInicial.disabled = true;
        opcaoInicial.selected = true;

        selectElement.appendChild(opcaoInicial);

        const resultados = dados.results || [];

        if (resultados.length === 0) {
            selectElement.style.display = "none";
            alert("Nenhuma série encontrada. Tente outra pesquisa.");
            return;
        }

        resultados.forEach((serie) => {
            const opcao = document.createElement("option");

            opcao.value = serie.id;
            opcao.textContent = serie.name || "Série sem nome";

            selectElement.appendChild(opcao);
        });

        selectElement.style.display = "block";
    } catch (erro) {
        console.error("Erro na pesquisa:", erro);
        alert("Não foi possível realizar a pesquisa no momento.");
    }
}

// Evento de seleção de uma série
selectsBuscar.forEach((select) => {
    select.addEventListener("change", () => {
        const id = select.value;

        if (id) {
            pegaSerie(id);
        }
    });
});

// Busca os dados completos de uma série
async function pegaSerie(id) {
    const url =
        `https://5gq3hyraihfvst6qq2xsbr26gu0skmws.lambda-url.us-east-1.on.aws/?id=${encodeURIComponent(id)}`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os dados da série.");
        }

        bd = await resposta.json();

        episodiosAbertos = new Array(
            (bd.temporadas || []).length
        ).fill(false);

        mostraSite(bd);

        formulario.style.display = "none";
        sitePrincipal.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } catch (erro) {
        console.error("Erro ao carregar a série:", erro);
        alert("A série está indisponível no momento.");
    }
}

// Mostra as informações da série na página
function mostraSite(paisagemSerie) {
    const nomeSerie = document.querySelector(".info h1");
    const generos = document.querySelector(".generos");
    const resumo = document.querySelector(".info p");
    const nota = document.querySelector(".info .nota");
    const poster = document.querySelector("header .poster img");
    const header = document.querySelector("header");

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

    poster.src = paisagemSerie.fotoPoster || "";
    poster.alt = `Pôster da série ${paisagemSerie.nome || ""}`;

    if (paisagemSerie.fotoBg) {
        header.style.backgroundImage =
            `url("${paisagemSerie.fotoBg}")`;
    } else {
        header.style.backgroundImage = "none";
    }

    mostrarElenco(paisagemSerie.elenco || []);
    mostrarTemporadas(paisagemSerie.temporadas || []);
}

// Mostra o elenco
function mostrarElenco(elenco) {
    const elencoContainer =
        document.querySelector(".elenco-container");

    elencoContainer.innerHTML = "";

    if (elenco.length === 0) {
        elencoContainer.textContent =
            "Elenco não disponível.";
        return;
    }

    elenco.forEach((ator) => {
        const card = document.createElement("div");
        card.className = "ator";

        const imagem = document.createElement("img");
        imagem.src = ator.foto || "";
        imagem.alt = `Foto de ${ator.nome || "ator"}`;

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
        imagem.src = temporada.poster || "";
        imagem.alt =
            `Pôster da temporada ${temporada.numero || index + 1}`;

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

        const episodios = document.createElement("div");
        episodios.className = "episodios";

        botao.addEventListener("click", () => {
            mostrarEpisodios(
                index,
                episodios,
                botao
            );
        });

        informacoes.append(
            titulo,
            exibicao,
            sinopse,
            botao,
            episodios
        );

        cardTemporada.append(
            poster,
            informacoes
        );

        temporadasContainer.appendChild(cardTemporada);
    });
}

// Mostra ou oculta os episódios de uma temporada
function mostrarEpisodios(index, container, botao) {
    if (!episodiosAbertos[index]) {
        const episodios =
            bd.temporadas[index].episodios || [];

        container.innerHTML = "";

        if (episodios.length === 0) {
            container.textContent =
                "Episódios não disponíveis.";
        } else {
            episodios.forEach((episodio) => {
                const card = document.createElement("div");
                card.className = "episodio";

                const foto = document.createElement("div");
                foto.className = "foto";

                const imagem = document.createElement("img");
                imagem.src = episodio.foto || "";
                imagem.alt =
                    `Imagem do episódio ${episodio.nome || ""}`;

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
        episodiosAbertos[index] = true;
    } else {
        const estaVisivel =
            container.style.display !== "none";

        container.style.display =
            estaVisivel ? "none" : "flex";

        botao.textContent =
            estaVisivel ? "Ver episódios" : "Ocultar episódios";
    }
}