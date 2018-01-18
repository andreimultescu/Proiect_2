(function() {
  const myQuestions = [
    {
        question: "What does Orianna's Q do?",
        answers: {
          a: "Makes a circle around the position of her ball to speed up allies and slow down enemies",
          b: "Sends her ball towards target place",
          c: "Shields an ally",
          d: "Knocks up every enemy close to the position of her ball and stunning them"
        },
        correctAnswer: "b"
      },
      {
        question: "What does Ziggs' Ultimate (R) do?",
        answers: {
          a: "Throws a small bomb towards target position and bombs after hitting something",
          b: "Places a rectangle thing that makes either Ziggs or an enemy move a bit front after defusing",
          c: "Sets a round bomb in target position and slows enemies that walk over them",
          d: "Sends a huge explosive bomb towards target position"
        },
        correctAnswer: "d"
      },
      {
        question: "What does Leblanc's E do?",
        answers: {
          a: "Throws a ball towards enemy target",
          b: "Doubles the damage of any of the above",
          c: "Throws a chain and if it hits an enemy and it stays on the enemy for 2 seconds then he will be snared",
          d: "Moves towards target position and after 2 seconds activate again to return to normal place"
        },
        correctAnswer: "c"
      },
      {
        question: "What does Annie's W do?",
        answers: {
          a: "Shields herself for armor",
          b: "Throws a big fire ball",
          c: "Blows fire to make a cylinder fire shape or whatever",
          d: "Summons her bear Tibbers and he has fire around him that enemies close to him get health lost"
        },
        correctAnswer: "c"
      },
      {
        question: "What is the before last champion called?",
        answers: {
          a: "Zyra",
          b: "Xin Zhao",
          c: "Zilean",
          d: "Ziggs",
		  e: "Xerath"
        },
        correctAnswer: "c"
      },
      {
        question: "Which champion is an archer?",
        answers: {
          a: "Amumu",
          b: "Talon",
          c: "Ashe",
          d: "Akali",
		  e: "Xerath"
        },
        correctAnswer: "c"
      },
      {
      question: "Which champion is named as The bounty hunter?",
        answers: {
          a: "Morgana",
          b: "Mordekaiser",
          c: "Malphite",
          d: "Miss Fortune",
		  e: "Xerath"
        },
        correctAnswer: "c"
      },    
      {question: "Which champion is named as The eternal nightmare?",
        answers: {
          a: "Nocturne",
          b: "Nami",
          c: "Nasus",
          d: "Nautilus",
		  e: "Xerath"
        },
        correctAnswer: "c"
      },    
      {
      question: "Which champion is named as The master tactician?",
        answers: {
          a: "Swain",
          b: "Shaco",
          c: "Syndra",
          d: "Sona",
		  e: "Xerath"
        },
        correctAnswer: "c"
      }
  
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    
    slides[currentSlide].classList.remove("active-slide");
   
    previousButton.style.display = "none";
    submitButton.style.display = "none";
    restartButton.style.display = "inline-block";
    
    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      slides[questionNumber].classList.add("active-slide");
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
      restartButton.style.display = "none";
      
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      restartButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
      restartButton.style.display = "none";
    }
  }

  function showNextSlide() {
      if(currentSlide===slides.length){
        currentSlide=-1;
    }
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  function restart(){
    location.reload();
  }
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const restartButton = document.getElementById("restart");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  restartButton.addEventListener("click",restart)
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

function newFunction(showSlide, currentSlide) {
    showSlide(currentSlide);
}
