function infoBasicaQuizz(){
    const titulo = document.querySelector(".infoQuizzTitulo").value;
    const img = document.querySelector(".infoQuizzImg").value;
    quantidade = document.querySelector(".infoQuizzQuantidade").value;
    const niveis = document.querySelector(".infoQuizzNiveis").value;

    if (titulo.length >= 20 && 65 >= titulo.length){
        if (img.includes("https://") || img.includes("http://")){
            if (Number(quantidade) >= 3){
                if(Number(niveis) >= 2){
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

function crieSuasPerguntas(){
    document.querySelector(".criarQuizz2").innerHTML = "";

    const quizzTitulo = document.querySelector(".criarQuizz2");
    quizzTitulo.innerHTML = `
        <div>
            <h1 class="criarQuizzTitulo">Crie suas perguntas</h1>
        </div>
    `;

    const quizzPerguntas = document.querySelector(".criarQuizz2");

    for (let i = 0; i < Number(quantidade); i++){
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