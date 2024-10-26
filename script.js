const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris"], answer: "Paris" },
    { question: "What is 5 x 6?", options: ["30", "36", "25"], answer: "30" },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C"], answer: "100°C" },
    { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Jupiter" }
];

let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
let score = localStorage.getItem('score') || 0;

function displayQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        q.options.forEach(option => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');

            optionInput.type = 'radio';
            optionInput.name = `question${index}`;
            optionInput.value = option;
            optionInput.checked = progress[`question${index}`] === option;

            optionInput.addEventListener('change', () => {
                progress[`question${index}`] = option;
                sessionStorage.setItem('progress', JSON.stringify(progress));
            });

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            optionsDiv.appendChild(optionLabel);
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

function calculateScore() {
    score = 0;
    questions.forEach((q, index) => {
        if (progress[`question${index}`] === q.answer) {
            score++;
        }
    });
    localStorage.setItem('score', score);
    displayScore();
}

function displayScore() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
}

document.getElementById('submit-button').addEventListener('click', calculateScore);

window.onload = function() {
    displayQuiz();
    displayScore(); // To show the score if it exists
};
