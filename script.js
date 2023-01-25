function infoBasicaQuizz() {
  const titulo = document.querySelector(".infoQuizzTitulo").value;
  const img = document.querySelector(".infoQuizzImg").value;
  quantidade = document.querySelector(".infoQuizzQuantidade").value;
  const niveis = document.querySelector(".infoQuizzNiveis").value;

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

function crieSuasPerguntas() {
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
            <span>Pergunta ${i + 1}</span>
            <button onclick="expandirPergunta()"><ion-icon name="create-outline"></ion-icon></button>
        </div>
    `;
  }

  const buttonPerguntas = document.querySelector(".criarQuizz2");

  buttonPerguntas.innerHTML += `
        <button class="buttonIrParaNiveis">Prosseguir pra criar níveis</button>
    `;
}

/*obtenção de quizzes*/

function obterQuizzes() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promise.then(obteveQuizzes);
  promise.catch(erroAoObterQuizzes);
}

let quizzesInfo = [];
function obteveQuizzes(resposta) {
  quizzesInfo = resposta.data;
  console.log(quizzesInfo);
  renderizarQuizzes();
}

function erroAoObterQuizzes(erro) {
  console.log(erro);
}
obterQuizzes();
console.log(quizzesInfo);
function renderizarQuizzes() {
  const containerQuizzes = document.querySelector(".todososquizzes .quizzes");
  containerQuizzes.innerHTML = " ";
  for (let i = 0; i < quizzesInfo.length; i++) {
    containerQuizzes.innerHTML += `
    <div onclick="apareceTela2()" class="quizz">
    <h4>${quizzesInfo[i].title}</h4>
    <img src="${quizzesInfo[i].image}">
    </div>      
    `;
  }
}

function apareceTela2() {
  const containerQuizzes = document.querySelector(".tela1");
  containerQuizzes.classList.add("esconde-tela");
}
