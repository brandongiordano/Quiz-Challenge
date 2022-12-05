const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is JavaScript?",
        choice1: "A programming language that allows developers to create dynamic and interactive web content",
        choice2: "A standardized system for tagging text files to structure World Wide Web pages",
        choice3: "A language for styling the presentation of Web pages, including colors, layout, and fonts",
        choice4: "A written version of a play or movie",
        answer: 1,
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<js>",
        choice3: "<scripting>",
        choice4: "<javascript>",
        answer: 1,
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "alertBox('Hello World');",
        choice2: "msgBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: "How can you add a comment in a JavaScript?",
        choice1: "//This is a comment",
        choice2: "<!--This is a comment-->",
        choice3: "'This is a comment",
        choice4: "|This is a comment|",
        answer: 1,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions()
}

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selctedAnswer = selectedChoice.dataset['number'];
        let classToApply = selctedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame()