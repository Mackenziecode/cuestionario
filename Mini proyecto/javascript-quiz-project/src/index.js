document.addEventListener("DOMContentLoaded", () => {
  /************ ELEMENTOS HTML ************/
  // Divs de las vistas
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Elementos de la vista del cuestionario
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const timeRemainingContainer = document.getElementById("timeRemaining"); // Elemento para mostrar el tiempo restante

  // Elementos de la vista final
  const resultContainer = document.querySelector("#result");
  const resultProgressBar = document.querySelector("#resultProgressBar");
  const restartButton = document.createElement("button");
  restartButton.id = "restartButton";
  restartButton.className = "button-secondary";
  restartButton.innerText = "Reiniciar Quiz";
  endView.appendChild(restartButton);


  /************ ESTABLECER VISIBILIDAD DE LAS VISTAS ************/

  quizView.style.display = "block";
  endView.style.display = "none";


  /************ DATOS DEL QUIZ ************/
  
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = mc^2"], "E = mc^2", 3),
  ];
  const quizDuration = 120;


  /************ INSTANCIA DEL QUIZ ************/
  
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();


  /************ MOSTRAR CONTENIDO INICIAL ************/

  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  showQuestion();


  /************ TEMPORIZADOR ************/

  let timer;
  let timeRemaining = quizDuration;

  function startTimer() {
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (timeRemaining % 60).toString().padStart(2, "0");
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      } else {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }


  /************ EVENT LISTENERS ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartQuiz);


  /************ FUNCIONES ************/

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerText = question.text;
    const progress = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionCount.innerText = `Pregunta ${quiz.currentQuestionIndex + 1} de ${quiz.questions.length}`;

    question.choices.forEach((choice, index) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = choice;
      radioInput.id = `choice-${index}`;
      const label = document.createElement("label");
      label.innerText = choice;
      label.htmlFor = `choice-${index}`;
      const br = document.createElement("br");
      choiceContainer.appendChild(radioInput);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(br);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;
    const choices = document.querySelectorAll('input[name="choice"]');

    choices.forEach(choice => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    } else {
      alert("Por favor, selecciona una respuesta.");
    }
  }

  function showResults() {
    clearInterval(timer); // Detiene el temporizador antes de mostrar los resultados
    quizView.style.display = "none";
    endView.style.display = "flex";
    const score = quiz.correctAnswers;
    const totalQuestions = quiz.questions.length;
    resultContainer.innerText = `¡Obtuviste ${score} de ${totalQuestions} respuestas correctas!`;
    const resultProgress = (score / totalQuestions) * 100;
    resultProgressBar.style.width = `${resultProgress}%`;
  }


  function clearTimer() {
    clearInterval(timer);
  }

  function restartQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    timeRemaining = quizDuration; // Restablece el tiempo restante
    endView.style.display = "none";
    quizView.style.display = "block";
    showQuestion();
    clearInterval(timer); // Limpia el intervalo del temporizador antes de iniciar uno nuevo
    startTimer(); // Inicia el temporizador de nuevo
  }

  startTimer();
});
