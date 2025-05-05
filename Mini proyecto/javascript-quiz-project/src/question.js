class Question {
    constructor(text, choices, answer, difficulty) {
        // El constructor inicializa las propiedades de la instancia de la clase Question.
        // text: El texto de la pregunta (cadena).
        // choices: Un array de las opciones de respuesta (array de cadenas).
        // answer: La respuesta correcta a la pregunta (cadena).
        // difficulty: El nivel de dificultad de la pregunta (número, generalmente entre 1 y 3).
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
      }
    
      shuffleChoices() {
        // Este método mezcla aleatoriamente el orden de las opciones de respuesta (this.choices).
        // Utiliza el algoritmo de Fisher-Yates para un mezclado eficiente y uniforme.
        for (let i = this.choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio j.
          [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Intercambia los elementos en las posiciones i y j.
        }
        // No es necesario devolver nada explícitamente, ya que el método modifica el array 'this.choices' directamente.
      }
}