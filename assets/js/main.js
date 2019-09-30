//Seletores
const img = document.querySelector('img');
const input = document.querySelector('input');
const formulario = document.querySelector('form');
const div = document.querySelector('div');
const span = document.querySelector('span');



//funções
const gerarPokemon = () => {

        fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 149 + 1)}`)
            .then((resposta) => { return resposta.json() })
            .then((pokemon) => {
                img.setAttribute('src', pokemon.sprites.front_default);
                localStorage.setItem('pokemon', pokemon.name);


            })


    }
    //Quando ele enviar o formulario, esse codigo vai parar o comando e retornar o focu
const validarResposta = (evt) => {
    evt.preventDefault();

    if (input.value === localStorage.getItem('pokemon')) {
        div.style.backgroundColor = '#4caf50';
        localStorage.setItem(
            'pontucao',
            String(parseInt(localStorage.getItem('pontucao')) + 100)
        );
    } else {
        div.style.backgroundColor = '#ff5722';
        localStorage.setItem(
            'pontucao',
            String(parseInt(localStorage.getItem('pontucao')) - 100)
        );
    }

    input.value = "";
    input.focus();
    img.style.filter = 'none';
    // setTimeout vai fazer a contagem de tempo para trocar a imagem
    setTimeout(() => {
        div.style.backgroundColor = '#f9f9f9';
        img.style.filter = 'brightness(0)';
        gerarPokemon();
        mostrarPontuacao();
    }, 1000);

}



const mostrarPontuacao = () => {
        if (localStorage.getItem('pontuacao') == null) {
            localStorage.setItem('pontuacao', '0');
        }
        span.innerHTML = localStorage.getItem('pontuacao');
    }
    //Eventos
window.onload = () => {
    gerarPokemon();
    mostrarPontuacao();
}

formulario.onsubmit = validarResposta;