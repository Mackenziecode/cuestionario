class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
      // El constructor inicializa las propiedades de la instancia de la clase Quiz.
      // questions: Un array de objetos Question.
      // timeLimit: El límite de tiempo para el quiz en segundos.
      // timeRemaining: El tiempo restante para el quiz en segundos.
      this.questions = questions;
      this.timeLimit = timeLimit;
      this.timeRemaining = timeRemaining;
      this.correctAnswers = 0;
      this.currentQuestionIndex = 0;
    }
  
    getQuestion() {
      // Devuelve la pregunta actual del quiz.
      return this.questions[this.currentQuestionIndex];
    }
  
    moveToNextQuestion() {
      // Incrementa el índice de la pregunta actual en 1.
      this.currentQuestionIndex++;
    }
  
    shuffleQuestions() {
      // Mezcla aleatoriamente el orden de las preguntas en el array questions.
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
      }
    }
  
    checkAnswer(answer) {
      // Comprueba si la respuesta proporcionada por el usuario es correcta para la pregunta actual.
      if (answer === this.questions[this.currentQuestionIndex].answer) {
        this.correctAnswers++;
      }
    }
  
    hasEnded() {
      // Determina si el quiz ha terminado.
      return this.currentQuestionIndex >= this.questions.length;
    }
  
    filterQuestionsByDifficulty(difficulty) {
      // Filtra las preguntas del quiz por dificultad.
      // Recibe un argumento: difficulty (el nivel de dificultad a filtrar).
      // Actualiza la propiedad 'questions' del quiz para que solo contenga las preguntas que coincidan con la dificultad especificada.
      if (difficulty >= 1 && difficulty <= 3) {
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
      }
      // Si el argumento 'difficulty' no está dentro del rango válido (1-3), el array de preguntas no se modifica.
    }
  
    averageDifficulty() {
      // Calcula la dificultad promedio de las preguntas en el quiz.
      // No recibe argumentos.
      // Devuelve un número que representa la dificultad promedio.
      if (this.questions.length === 0) return 0; // Maneja el caso de que no haya preguntas.
      const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
      return totalDifficulty / this.questions.length;
    }
  }
  