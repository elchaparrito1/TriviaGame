// (function () {

var questionObject = [
    {
        question: "In which year did the demolition of the Berlin Wall begin?",
        answers: {
            A: '1982',
            B: '1989',
            C: '1975',
            D: '1994'
        },
        correctAnswer: 'B'
    },

    {
        question: "Southern Rhodesia became what country in 1980?",
        answers: {
            A: 'Angola',
            B: 'Zambia',
            C: 'Zimbabwe',
            D: 'Kosovo'
        },
        correctAnswer: 'C'
    },
    {
        question: "Who became president after the assassination of Abraham Lincoln?",
        answers: {
            A: 'Andrew Jackson',
            B: 'Ulysses S. Grant',
            C: 'Franklin Pierce',
            D: 'Andrew Johnson'
        },
        correctAnswer: 'D'
    },
    {
        question: "Which Egyptian president ordered the seizure of the Suez Canal in 1956?",
        answers: {
            A: 'Anwar Sadat',
            B: 'Hosni Mubarak',
            C: 'President Nassar',
            D: 'Muhammad'
        },
        correctAnswer: 'C'
    },
    {
        question: "Who discovered the vaccination against smallpox in 1796?",
        answers: {
            A: 'Edward Jenner',
            B: 'Jonas Salk',
            C: 'Alexander Fleming',
            D: 'Benjamin Franklin'
        },
        correctAnswer: 'A'
    },
    {
        question: "Which is the oldest University in the USA?",
        answers: {
            A: 'Brown University',
            B: 'Dartmouth college',
            C: 'Harvard University',
            D: 'Yale University'
        },
        correctAnswer: 'C'
    },
    {
        question: "In which war was The Battle of Agincourt?",
        answers: {
            A: 'War of the Roses',
            B: 'Hundred Years War',
            C: 'Napoleonic Wars',
            D: 'French Revolution'
        },
        correctAnswer: 'B'
    },
    {
        question: "What nationality was Karl Marx?",
        answers: {
            A: 'Russian',
            B: 'Ukranian',
            C: 'Swiss',
            D: 'German'
        },
        correctAnswer: 'D'
    },
    {
        question: "In which year did the Titanic sink?",
        answers: {
            A: '1912',
            B: '1920',
            C: '1885',
            D: '1906'
        },
        correctAnswer: 'A'
    },
    {
        question: "What Apollo 13 astronaut contacted Mission Control with the words, \“Houston, we’ve had A problem here..\”?",
        answers: {
            A: 'James A. Lovell Jr.',
            B: 'John L. Swigert Jr.',
            C: 'Fred W. Haise Jr.',
            D: 'L. Gordon Cooper Jr.'
        },
        correctAnswer: 'B'
    }
];



var quizContainer = $("#quiz-container");

function stopTimer() {
    clearInterval(timer);
    console.log("Did this run?");
}

function startTimer (duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            stopTimer();
            // alert("Times up!!");
            //reference endgame function here
            showResults();
        }
    }, 1000);
    
}

function showQuiz () {
   document.getElementById("hidden").style.display = "block";
   document.getElementById("start").style.display = "none";
}

 function startQuiz () {


    // we'll need a place to store the HTML output
    var output = [];
  
    // for each question...
    questionObject.forEach(
      (currentQuestion, questionNumber) => {
        //   console.log("current-question", currentQuestion);
        //   console.log("question-number", questionNumber);
  
        // we'll want to store the list of answer choices
        var answers = [];
  
        // and for each available answer...
        for(var letter in currentQuestion.answers){
            // console.log("letter", letter);
          // ...add an HTML radio button
          answers.push(
            "<label>" + 
              `<input type="radio" name="question${questionNumber}" value="${letter}">` + 
              `${letter}: ` +
              `${currentQuestion.answers[letter]}` + 
            "</label>" 
          );
        }
        // console.log("answers", answers);
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>` +
          `<div class="answers"> ${answers.join('')} </div>`
          
        );
        // console.log("Is this working?", currentQuestion.correctAnswer);
      });
    
    // console.log("output", output.join(''));
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.append(output.join(''));

    var twoMinutes = 60 * 1.5,
    display = document.querySelector('#time');
    console.log(twoMinutes);
    startTimer(twoMinutes, display);

    showQuiz();

  }

function showResults () {
    
    // document.getElementById("time").style.display = "none";
    document.getElementById("time-remaining").style.display = "none";
    //I need to gather answer containers from the trivia game
    var answerContainers = quizContainer.querySelectorAll('answers');
  
    //Then I will need a variable for keeping track of the user's choices
    var numCorrect = 0;

    //Using a loop, I want to go through and check the answers
    questionObject.forEach(
        (currentQuestion, questionNumber) => {
    //Find the selected answer through assigned variables that pull the data
    //This makes sure that I am looking inside the answer for the current question
    var answerContainer = answerContainers[questionNumber];
    //This is a CSS selector that will let me find which radio button is checked
    var selector = `input[name=question${questionNumber}]:checked`;
    /*Then I use the querySelector to search for the CSS selector in the previoulsy defined answerContainer.
    This way I will find which radio button was checked.*/
    /*Also, .value would cause an error, if someone missed a question. || with {} is an empty object, which states
    get a reference to our selected answer || or use an empty object if it doesn't exist*/
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //if answer is correct:
    if(userAnswer === currentQuestion.correctAnswer) {
        numCorrect++
        answerContainers[questionNumber].style.color = 'lightgreen';
    } else {
        answerContainers[questionNumber].style.color = 'red';
    }
});

// show number of correct answers out of total

var resultsContainer = $("#results-container");
resultsContainer.innerHTML = numCorrect + 'out of' + myQuestions.length;
console.log("results", numCorrect);

}

// })();
