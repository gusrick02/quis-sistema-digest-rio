const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;
let questionsWrong = []; // Array para armazenar as perguntas erradas e respostas

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    questionsWrong = []; // Resetar o array de perguntas erradas
    loadQuestion();
};

function nextQuestion(e) {
    const isCorrect = e.target.getAttribute("data-correct") === "true";
    const userAnswer = e.target.textContent;

    if (isCorrect) {
        questionsCorrect++;
    } else {
        // Adicionar a pergunta atual e a resposta escolhida ao array de perguntas erradas
        questionsWrong.push({
            question: questions[currentIndex].question,
            userAnswer: userAnswer,
            correctAnswer: questions[currentIndex].answers.find(answer => answer.correct).option
        });
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finish();
    }
}

function finish() {
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}, deseja reiniciar?`;

    if (questionsWrong.length > 0) {
        const erros = questionsWrong.map((item, index) => `
      <p>${index + 1}. ${item.question}</p>
      <p>Sua resposta: <strong>${item.userAnswer}</strong></p>
      <p>Resposta correta: <strong>${item.correctAnswer}</strong></p>
    `).join("");
        textFinish.innerHTML += `<div><h4>Perguntas que você errou:</h4>${erros}</div>`;
    }

    content.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

        answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();