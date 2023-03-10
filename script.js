const quizzesCriados = [];
let idQuizzes = [];
let objetoPrincipal = {};
let dadosDeserializados;
let containerSeusQuizzes;
let listaSerializada;

function infoBasicaQuizz() {
  titulo = document.querySelector(".infoQuizzTitulo").value;
  img = document.querySelector(".infoQuizzImg").value;
  quantidade = document.querySelector(".infoQuizzQuantidade").value;
  niveis = document.querySelector(".infoQuizzNiveis").value;

  if (titulo.length >= 20 && 65 >= titulo.length) {
    if (img.includes("https://") || img.includes("http://")) {
      if (Number(quantidade) >= 3) {
        if (Number(niveis) >= 2) {
          crieSuasPerguntas();
        } else {
          alert("Preencha novamente a quantidade de niveis");
        }
      } else {
        alert("Preencha novamente a quantidade de perguntas");
      }
    } else {
      alert("Preencha novamente o link");
    }
  } else {
    alert("Preencha novamente o titulo");
  }
}

let quantidade;
let niveis;
let titulo;
let img;

function crieSuasPerguntas() {
  objetoPrincipal = {
    title: titulo,
    image: img,
    questions: [],
    levels: [],
  };
}

function crieSuasPerguntas() {
  objetoPrincipal = {
    title: titulo,
    image: img,
    questions: [],
    levels: [],
  };

  document.querySelector(".criarQuizz2").innerHTML = "";

  const quizzTitulo = document.querySelector(".criarQuizz2");
  quizzTitulo.innerHTML = `
        <div>
            <h1 class="criarQuizzTitulo">Crie suas perguntas</h1>
        </div>
    `;

  const quizzPerguntas = document.querySelector(".criarQuizz2");

  for (let i = 0; i < Number(quantidade); i++) {
    quizzPerguntas.innerHTML += `
        <div class="pergunta">
            <span>Pergunta <strong>${i + 1}</strong></span>
            <button onclick="expandirPergunta(this)"><ion-icon name="create-outline"></ion-icon></button>
        </div>
    `;
  }

  const buttonPerguntas = document.querySelector(".criarQuizz2");

  buttonPerguntas.innerHTML += `
        <button class="buttonIrParaNiveis" onclick="abrirJanelaCriarNiveis()">Prosseguir pra criar n??veis</button>
    `;
}

let numCerto;
let numNiveis;

function expandirPergunta(response) {
  const dadosDaPergunta = response.parentNode;
  const numPerg = dadosDaPergunta.childNodes;
  const numeroPerg = numPerg[1].childNodes;

  numCerto = numeroPerg[1].innerHTML;

  dadosDaPergunta.classList.remove("pergunta");
  dadosDaPergunta.classList.add("perguntaAberta");

  dadosDaPergunta.innerHTML = `
    <div class="secaoPergunta">
        <h1>Pergunta ${numCerto}</h1>
        <input type="text" id="titulo${numCerto}" placeholder="Texto da pergunta">
        <input type="text" id="corFundo${numCerto}" placeholder="Cor de fundo da pergunta">
    </div>
    <div class="secaoPergunta">
        <h1>Resposta Correta</h1>
        <input type="text" id="respostaCorreta${numCerto}" placeholder="Resposta correta">
        <input type="url" id="imagemCorreta${numCerto}" placeholder="URL da imagem">
    </div>
    <div class="secaoPergunta">
        <h1>Respostas Incorretas</h1>
        <div class="secaoPergunta">
            <input type="text" id="respostaIncorreta1${numCerto}" placeholder="Resposta incorreta 1">
            <input type="url" id="imagemIncorreta1${numCerto}"  placeholder="URL da imagem 1">
        </div>
        <div class="secaoPergunta">
            <input type="text" id="respostaIncorreta2${numCerto}" placeholder="Resposta incorreta 2">
            <input type="url" id="imagemIncorreta2${numCerto}" placeholder="URL da imagem 2">
        </div>
        <div class="secaoPergunta">
            <input type="text" id="respostaIncorreta3${numCerto}" placeholder="Resposta incorreta 3">
            <input type="url" id="imagemIncorreta3${numCerto}" placeholder="URL da imagem 3">
        </div>
    </div>  
    `;
}

let objetoRespostas;

function verificarRespostas() {
  for (let i = 0; i < numCerto; i++) {
    let titulo1 = document.getElementById(`titulo${i + 1}`).value;
    let corFundo1 = document.getElementById(`corFundo${i + 1}`).value;
    let respostaCorreta1 = document.getElementById(
      `respostaCorreta${i + 1}`
    ).value;
    let imagemCorreta = document.getElementById(`imagemCorreta${i + 1}`).value;
    let respostaIncorreta1 = document.getElementById(
      `respostaIncorreta1${i + 1}`
    ).value;
    let imagemIncorreta1 = document.getElementById(
      `imagemIncorreta1${i + 1}`
    ).value;
    let respostaIncorreta2 = document.getElementById(
      `respostaIncorreta2${i + 1}`
    ).value;
    let imagemIncorreta2 = document.getElementById(
      `imagemIncorreta2${i + 1}`
    ).value;
    let respostaIncorreta3 = document.getElementById(
      `respostaIncorreta3${i + 1}`
    ).value;
    let imagemIncorreta3 = document.getElementById(
      `imagemIncorreta3${i + 1}`
    ).value;

    if (titulo1.length >= 20) {
      if (corFundo1.includes("#") && corFundo1.length === 7) {
        if (
          respostaCorreta1 !== "" &&
          respostaIncorreta1 !== "" &&
          imagemCorreta.includes("https://") &&
          imagemIncorreta1.includes("https://")
        ) {
          objetoRespostas = {
            title: titulo1,
            color: corFundo1,
            answers: [],
          };

          objetoRespostas.answers.push(
            {
              text: respostaCorreta1,
              image: imagemCorreta,
              isCorrectAnswer: true,
            },
            {
              text: respostaIncorreta1,
              image: imagemIncorreta1,
              isCorrectAnswer: false,
            }
          );
          if (
            respostaIncorreta2 !== "" &&
            imagemIncorreta2.includes("https://")
          ) {
            objetoRespostas.answers.push({
              text: respostaIncorreta2,
              image: imagemIncorreta2,
              isCorrectAnswer: false,
            });
            if (
              respostaIncorreta3 !== "" &&
              imagemIncorreta3.includes("https://")
            ) {
              objetoRespostas.answers.push({
                text: respostaIncorreta3,
                image: imagemIncorreta3,
                isCorrectAnswer: false,
              });
            }
          }
          objetoPrincipal.questions.push(objetoRespostas);
        } else {
          alert("insira as respostas novamente");
          objetoPrincipal.questions.length = 0;
        }
      } else {
        alert("Insira a cor novamente");
        objetoPrincipal.questions.length = 0;
      }
    } else {
      alert("Preencha o titulo novamente");
      objetoPrincipal.questions.length = 0;
    }
  }

  if (
    objetoPrincipal.questions.length < numCerto ||
    objetoPrincipal.questions.length > numCerto
  ) {
    objetoPrincipal.questions.length = 0;
  }

  // console.log(objetoRespostas);
}

function abrirJanelaCriarNiveis() {
  verificarRespostas();

  if (objetoPrincipal.questions.length !== 0) {
    document.querySelector(".criarQuizz2").innerHTML = "";

    const quizzTitulo = document.querySelector(".criarQuizz2");
    quizzTitulo.innerHTML = `
            <div>
                <h1 class="criarQuizzTitulo">Agora, deicda os n??veis!</h1>
            </div>
        `;

    const quizzPerguntas = document.querySelector(".criarQuizz2");

    for (let i = 0; i < Number(niveis); i++) {
      quizzPerguntas.innerHTML += `
            <div class="pergunta">
                <span>N??vel <strong>${i + 1}</strong></span>
                <button onclick="expandirNivel(this)"><ion-icon name="create-outline"></ion-icon></button>
            </div>
        `;
    }

    const buttonPerguntas = document.querySelector(".criarQuizz2");

    buttonPerguntas.innerHTML += `
            <button class="buttonIrParaNiveis" onclick="abrirJanelaSucesso()">Prosseguir pra criar n??veis</button>
        `;
  }
}

function expandirNivel(nivel) {
  const dadosDaPergunta = nivel.parentNode;
  const numPerg = dadosDaPergunta.childNodes;
  const numeroPerg = numPerg[1].childNodes;

  numNiveis = numeroPerg[1].innerHTML;

  dadosDaPergunta.classList.remove("pergunta");
  dadosDaPergunta.classList.add("perguntaAberta");

  dadosDaPergunta.innerHTML = `
    <div class="secaoPergunta">
        <h1>N??vel ${numNiveis}</h1>
        <input type="text" id="tituloNivel${numNiveis}" placeholder="T??tulo do n??vel">
        <input type="text" id="porcentagemNivel${numNiveis}" placeholder="% de acerto m??nima">
        <input type="url" id="imagemNivel${numNiveis}" placeholder="URL da imagem do n??vel">
        <input type="text" id="descricaoNivel${numNiveis}" placeholder="Descri????o do n??vel">
    </div>  
    `;
}

function verificarRespostasNiveis() {
  for (let i = 0; i < numNiveis; i++) {
    let tituloNivel = document.getElementById(`tituloNivel${i + 1}`).value;
    let porcentagemNivel = document.getElementById(
      `porcentagemNivel${i + 1}`
    ).value;
    let imagemNivel = document.getElementById(`imagemNivel${i + 1}`).value;
    let descricaoNivel = document.getElementById(
      `descricaoNivel${i + 1}`
    ).value;

    if (
      tituloNivel.length >= 10 &&
      Number(porcentagemNivel) >= 0 &&
      100 >= Number(porcentagemNivel) &&
      imagemNivel.includes("https://") &&
      descricaoNivel.length >= 30
    ) {
      objetoPrincipal.levels.push({
        title: tituloNivel,
        image: imagemNivel,
        text: descricaoNivel,
        minValue: Number(porcentagemNivel),
      });
    } else {
      alert("Preencha os dados novamente");
      objetoPrincipal.levels.length = 0;
    }
  }
}

/*obten????o de quizzes*/

function obterQuizzes() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  promise.then(obteveQuizzes);
  promise.catch(erroAoObterQuizzes);
}

let quizzesInfo = [];
function obteveQuizzes(resposta) {
  quizzesInfo = resposta.data
  console.log(quizzesInfo);
  renderizarQuizzes();
}

function erroAoObterQuizzes(erro) {
  console.log(erro);
}
obterQuizzes();


let containerQuizzes;

function renderizarQuizzes(lista) { 

    containerQuizzes = document.querySelector(".todososquizzes .quizzes");
    containerQuizzes.innerHTML = " ";
    for (let i = 0; i < quizzesInfo.length; i++) {
        containerQuizzes.innerHTML += `
        <div onclick="apareceTela2(this)" class="quizz" data-id="${quizzesInfo [i].id}">
        <h4 class="titulo-quizz">${quizzesInfo [i].title}</h4>
        <img class="img-quizz" src="${quizzesInfo[i].image}">
        </div>      
        `;
        idQuizzes.push(quizzesInfo [i].id);
    }
    return idQuizzes;
  
}

function apareceTela2(elemento) {
  const tituloQuizzSelecionado = elemento.querySelector(".titulo-quizz");
  const imgQuizzSelecionado = elemento.querySelector(".img-quizz");
  const imgQuirzzSelecionadoSRC = imgQuizzSelecionado.getAttribute("src");
  const containerPaginaDoQuizz = document.querySelector("body");

  containerPaginaDoQuizz.innerHTML = "";
  containerPaginaDoQuizz.innerHTML += `
  <header>
    <h1>Buzzquizz</h1>
  </header>
  <main class="paginaDeUmQuizz tela2">  
    <div class="banner">
      <div class="layer"></div>
      <img src="${imgQuirzzSelecionadoSRC}"/>
      <h1>${tituloQuizzSelecionado.innerHTML}</h1>
    </div>
  </main>
  `;
  //  console.log(elemento.getAttribute("data-id"));
  const pegarQuizzSelecionado = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.getAttribute(
      "data-id"
    )}`
  );
  arrayGabi.push(elemento.getAttribute("data-id"));
  pegarQuizzSelecionado.then(pegouQuizz);
  pegarQuizzSelecionado.catch(naoPegouQuizz);
}

let arrayGabi = [];

/* gab aqui: aqui abaixo \/ tem as altera????es
 que fiz pra que as respostas se comportem. isso aqui faz com que:
  a resposta clicada fique opaca, as nao clicadas fiquem um pouco translucidas,
  os textos das corretas fiquem verdes, o das erradas vermelhos,
  tem um scroll automatico para a proxima pergunta, e nao da pra mudar a resposta apos clicado*/
  let contagemDeAcerto = 0;
  let resultadoPorcentagem =0; // ESSE VAI SER A PORCENTAGEM USADA
  
function mostrarResultado(resposta){

    console.log(resposta.data.id)

    let container = document.querySelector('.paginaDeUmQuizz');
    for (let n = 0; n < resposta.data.levels.length; n++){
        console.log(resposta.data.levels);
        console.log(resposta.data.levels[n].minValue);
        console.log(resposta.data.levels[n+1].minValue);
        if (porcentagemFinal >= resposta.data.levels[n].minValue && porcentagemFinal <= resposta.data.levels[n+1].minValue){
          container.innerHTML +=
          `
          
          <div class="resultado">
              <div>
                  <div class="tituloH2Resultado"> 
                  <h2>${porcentagemFinal.toFixed(0)}% de acertos: ${resposta.data.levels[n].title} !!</h2>
                  </div>
              </div>
              <div class="containerImg">
                <div class="flex"> 
                    <img  src="${resposta.data.levels[n].image}"> 
                    <p >${resposta.data.levels[n].text}</p>
                </div>
              </div>
          </div>
            <button onclick="listaQuizzUsuario()" class="botaoIrParaHome"><h3>Voltar para home</h3></button>
          
          `
        };

       /*  porcentagemFinal = 0; */
    }
}

function testerespostas(respostaclicada) {
  
  let caixaDasRespostas = respostaclicada.parentNode;
  caixaDasRespostas.classList.add("teste");
  respostaclicada.classList.remove("resposta");
  if (respostaclicada.classList.contains("resposta_false") == true) {
    respostaclicada.classList.add("respostaerrada");
  } else {
    respostaclicada.classList.add("respostacerta");
    contagemDeAcerto += 1;
    console.log(contagemDeAcerto)
  }
  caixaDasRespostas.classList.add("desabilitado");
  let proximo = caixaDasRespostas.parentNode;
  let ultimo = proximo.parentNode;
  let proximaPergunta = ultimo.nextElementSibling;
 /*  setTimeout(() => {
    proximaPergunta.scrollIntoView();
  }, 2000);
 */

  porcentagemFinal = Number(contagemDeAcerto/numeroDeRespostas[0])*100;
  let resultadoPorcentagem =+ porcentagemFinal;
  console.log(resultadoPorcentagem);

  if (proximaPergunta == null){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${arrayGabi[0]}`);
    promise.then(mostrarResultado);
  }
}

let porcentagemFinal;



let numeroDeRespostas = [];
const randomizaRespostas = [];
function pegouQuizz(resposta) {
  let respostasNumero = Number(resposta.data.questions.length);
  numeroDeRespostas.push(respostasNumero);
  console.log(Number(resposta.data.questions.length))
  let container = document.querySelector("body .paginaDeUmQuizz");

  
  for (let i = 0; i < resposta.data.questions.length; i++) {
    const aux = resposta.data.questions[i].answers.sort(comparador);
    container.innerHTML += `
    <div class="perguntas ">
        <div class="perguntaTela2">
            <div style="background-color: ${resposta.data.questions[i].color};" class="tituloH2Quizz"><h2>${resposta.data.questions[i].title}</h2></div>
            <div class="opcoes" id="opcoes${i + 1}">
            </div>
        </div>
    </div>
    `;

    for (let j = 0; j < resposta.data.questions[i].answers.length; j++) {
      // console.log(j);  LETICIA
      let containerOpcoes = document.getElementById(`opcoes${i + 1}`);
      containerOpcoes.innerHTML += `
            <div onclick="testerespostas(this)" class="resposta_${aux[j].isCorrectAnswer} resposta">
                <img src="${aux[j].image}">
                <p>${aux[j].text}</p>
            </div>
      `;
    }
  }

console.log(resultadoPorcentagem)
   
  
}



function reiniciarQuizz(esse){

  console.log("vamos recarregar");
  let url = window.location.href;
  location.reload(true)
}
/* gab aqui: aqui acaba as baguncinhas que fiz no codigo /\  */
function naoPegouQuizz(erro) {
  console.log(erro);
}

function comparador() {
  return Math.random() - 0.5;
}

let arrayTeste = [];

function abrirJanelaSucesso() {
  verificarRespostasNiveis();

  for (let indice = 0; indice < objetoPrincipal.levels.length; indice++) {
    arrayTeste.push(objetoPrincipal.levels[indice].minValue);
  }

  if (arrayTeste.includes(0)) {
    document.querySelector(".criarQuizz2").innerHTML = "";

    let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",objetoPrincipal);
    promise.then(sucesso);
    promise.catch(fail);
  } else {
    alert("deu tudo errado");
    objetoPrincipal.levels.length = 0;
  }
}

/* parte de renderizar as respostas criadas pelo usuario */


let dadosSerializados;

function sucesso(resposta) {
  quizzesCriados.push(resposta.data);
  dadosSerializados = JSON.stringify(quizzesCriados);
  localStorage.setItem("lista", dadosSerializados);

  const quizzTitulo = document.querySelector(".criarQuizz2");
    quizzTitulo.innerHTML = `
            <div>
                <h1 class="criarQuizzTitulo">Seu quizz est?? pronto</h1>
            </div>
            <div onclick="apareceTela2(this)" class="sucessoImagemQuizz" data-id="${resposta.data.id}">
                <h4 class="titulo-quizz">${objetoPrincipal.title}</h4>
                <img class="img-quizz" src="${objetoPrincipal.image}">
            </div>  
            <button class="buttonIrParaQuizz" onclick="apareceTela2Botao(this)" data-id="${resposta.data.id}">Acessar Quizz</button>
            <button onclick="listaQuizzUsuario()" class="botaoIrParaHome"><h3>Voltar para home</h3></button>

        `;

}

function apareceTela2Botao(elementos){
  const tituloQuizzSelecionado = document.querySelector(".titulo-quizz");
  const imgQuizzSelecionado = document.querySelector(".img-quizz");
  const imgQuirzzSelecionadoSRC = imgQuizzSelecionado.getAttribute("src");
  const containerPaginaDoQuizz = document.querySelector("body");

  containerPaginaDoQuizz.innerHTML = "";
  containerPaginaDoQuizz.innerHTML += `
  <header>
    <h1>Buzzquizz</h1>
  </header>
  <main class="paginaDeUmQuizz tela2">  
    <div class="banner">
      <div class="layer"></div>
      <img src="${imgQuirzzSelecionadoSRC}"/>
      <h1>${tituloQuizzSelecionado.innerHTML}</h1>
    </div>
  </main>
  `;
  //  console.log(elemento.getAttribute("data-id"));
  const pegarQuizzSelecionado = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elementos.getAttribute(
      "data-id"
    )}`
  );
  pegarQuizzSelecionado.then(pegouQuizz);
  pegarQuizzSelecionado.catch(naoPegouQuizz);
}


const fail = () => console.log("deu errrado o axios");

function criarQuizz() {
  const body = document.querySelector("body");
  body.innerHTML = `
  <header>
    <h1>Buzzquizz</h1>
  </header>
  <main class="criarQuizz tela3">
      <div class="criarQuizz2">
        <div>
          <h1 class="criarQuizzTitulo">Comece pelo come??o</h1>
        </div>
        <div class="criarQuizzPerguntas">
          <input
            class="infoQuizzTitulo"
            type="text"
            placeholder="Titulo do seu quizz"
          />
          <input
            class="infoQuizzImg"
            type="text"
            placeholder="URL da imagem do quizz"
          />
          <input
            class="infoQuizzQuantidade"
            type="text"
            placeholder="Quantidade de perguntas do quizz"
          />
          <input
            class="infoQuizzNiveis"
            type="text"
            placeholder="Qunatidades de niveis do quizz"
          />
        </div>
        <button class="infoBasica" onclick="infoBasicaQuizz()">
          Prosseguir pra criar perguntas
        </button>
      </div>
    </main>
  
  `;
}

function listaQuizzUsuario() {
    listaSerializada = localStorage.getItem("lista");
    dadosDeserializados = JSON.parse(listaSerializada);
    console.log(dadosDeserializados);

  

  if (dadosDeserializados != null || dadosDeserializados != undefined) {
    
    containerSeusQuizzes = document.querySelector("body");
    console.log(containerSeusQuizzes);
    containerSeusQuizzes.innerHTML = " ";


    for (let i = 0; i < dadosDeserializados.length; i++) {
        containerSeusQuizzes.innerHTML += `
        <header>
          <h1>Buzzquizz</h1>
        </header>
        <main class="tela1" on>
          <div class="seusquizzes">
            <div class="h3">
              <h3>Seus Quizzes</h3>
              <div class="adicionar" onclick="criarQuizz()">
                <ion-icon name="add-circle"></ion-icon>
              </div>
            </div>
            <div class="quizzes">
                <div onclick="apareceTela2(this)" class="quizz" data-id="${dadosDeserializados[i].id}">
                    <h4 class="titulo-quizz">${dadosDeserializados[i].title}</h4>
                    <img class="img-quizz" src="${dadosDeserializados[i].image}">
                </div>
            </div>
          </div>
          <div class="todososquizzes column">
            <h3>Todos os Quizzes</h3>
            <div class="quizzes">
            
            </div>
          </div>
        </main>     
        `;
    
    }

    
    obterQuizzes();
    
  idQuizzes.push(dadosDeserializados[i].id);
  } else {
    obterQuizzes();
  }

  
}

listaQuizzUsuario()
 function renderizarMeusQuizzes(){
    let meusQuizzesCriados = document.querySelector(".quizzes");
    for(let i = 0; i < dadosDeserializados.length; i++){
        meusQuizzesCriados.innerHTML += `
        <div onclick="apareceTela2(this)" class="quizz" data-id="${dadosDeserializados[i].id}">
            <h4 class="titulo-quizz">${dadosDeserializados[i].title}</h4>
            <img class="img-quizz" src="${dadosDeserializados[i].image}">
        </div>
    `;
    }
}

renderizarMeusQuizzes() 