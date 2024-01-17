const questions = [
       {
        questions: "which Country Will host the World Cup 2023?",
        answers:[
            {Text: "Pakistan", correct: false},
            {Text: "India", correct: true},
            {Text: "Afghanistan", correct: false},
            {Text: "Srilanka", correct: false},
        ]
       },
       {
        questions: "who is the king of bollywood?",
        answers:[
            {Text: "Salman khan", correct: false},
            {Text: "Aamir khan", correct: false},
            {Text: "sharukh khan", correct: true},
            {Text: "Akhshey kumar", correct: false},
        ]
       },
       {
        questions: "who is the God of cricket?",
        answers:[
            {Text: "sachin ", correct: true},
            {Text: "Dhoni", correct: false},
            {Text: "Rohit sharma", correct: false},
            {Text: "virat kohli", correct: false},
        ]
       },
       {
        questions: "who is the 2011 World Cup Winning Team?",
        answers:[
            {Text: "Australia", correct: false},
            {Text: "Srilanka", correct: false},
            {Text: "Pakistan", correct: false},
            {Text: "India", correct: true},
        ]
       },
       {
        questions: "who is the first team to win the world cup?",
        answers:[
            {Text: "India", correct: false},
            {Text: "Newzealand", correct: false},
            {Text: "South Africa", correct: false},
            {Text: "Westindies", correct: true},
        ]
       }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const NextButton = document.getElementById("Next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    NextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    NextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    NextButton.innerHTML = "Play Again";
    NextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

var count = 50;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    // or...
    alert("You're out of time!");
  }
}, 1000);

NextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();