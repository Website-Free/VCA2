//Start 
let start = document.querySelector("#start");

//Explicare
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Intrebari
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Alegeri
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");

//corect + urmatorul
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//resultat
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quiz2 = document.querySelector("#quiz2");
let startAgain = document.querySelector("#startAgain");

//alege totul de la 'H4' din intrebari (MCQS)
let choice_que = document.querySelectorAll(".choice_que");
let index = 0;
let timer = 0;
let interval = 0;

//puncte totale
let correct = 0;

//valuarea intrebari
let UserAns = undefined;

//ce se intampla cand apesi pe start
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//timpul 
let countDown = () => {
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            for (i = 0; i <= 3; i++) {
                quiz.style.display = "none";
                points.innerHTML = `Ai ${correct} din ${MCQS.length}`;
                result.style.display = "block";
            }
        }
    }, 1000);
}
window.onload = function () {
    var fiveMinutes = 60 * 60,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

//interval

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
}

//continue
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    dezactiveaza clasa cand dau click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} Ai ${MCQS.length} intrebari`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        //verifica raspunsul
        if (choiceNo === MCQS[index].answer) {
            choices.classList.add("correct");
            correct++;
        } else {
            choices.classList.add("wrong");
            choice_que[MCQS[index].answer].classList.add("correct");
            correct += 0;
        }

        //dezactiveaza toate optiunile cand este selectat
        for (i = 0; i <= 2; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////urmatorul
next_question.addEventListener("click", () => {
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("correct");
            removeActive.classList.remove("wrong");
        })
        //intrebari
        loadData();
        //rezultat
        total_correct.innerHTML = `${correct} Din ${MCQS.length} intrebari`;
    } else {
        index = 0;

        //arata rezultatul
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `Ai ${correct} din ${MCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 2; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//incepe din nou Start
startAgain.addEventListener("click", () => {
    window.location.reload();
});
