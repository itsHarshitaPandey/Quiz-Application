// Quiz data object
const quizData = {
    questions: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
            hint: "It's also known as the city of love."
        },
        {
            question: "Which is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter",
            hint: "It has a famous 'Great Red Spot'."
        },
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Shakespeare", "Dickens", "Hemingway", "Tolstoy"],
            answer: "Shakespeare",
            hint: "He is often called the Bard of Avon."
        },
        {
            question: "What is the boiling point of water?",
            options: ["100°C", "0°C", "50°C", "200°C"],
            answer: "100°C",
            hint: "It's the same number as a perfect score in many exams."
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
            answer: "Oxygen",
            hint: "We breathe this element to survive."
        }
    ],
};

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Quiz class
class Quiz {
    constructor(quizData) {
        this.quizData = quizData;
        this.questions = [...quizData.questions];
        shuffleArray(this.questions); // Shuffle questions on each new quiz load
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(selectedOption) {
        const currentQuestion = this.getCurrentQuestion();
        return selectedOption === currentQuestion.answer;
    }

    showHint() {
        const hintElement = document.getElementById('hint');
        hintElement.innerText = this.getCurrentQuestion().hint;
    }

    nextQuestion() {
        // Check if an option is selected before moving to the next question
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
        alert('Please select an answer before proceeding to the next question.');
        return; // Exit the method if no option is selected
        }
       
        const isCorrect = this.checkAnswer(selectedAnswer.value);
        alert(isCorrect ? 'Correct answer!' : 'Wrong answer. Try again.');
       
        // Move to the next question
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
        alert("You've completed the quiz!");
        this.resetQuiz();
        } else {
        this.displayCurrentQuestion();
        }
    }
    resetQuiz() {
        this.currentQuestionIndex = 0;
        shuffleArray(this.questions); // Reshuffle questions for new attempt
        this.displayCurrentQuestion();
    }


    displayCurrentQuestion() {
        const currentQuestion = this.getCurrentQuestion();
        document.getElementById('question').innerText = currentQuestion.question;
       
        const optionsList = document.querySelector('.options');
        optionsList.innerHTML = ''; // Clear previous options
        currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('li'); // Create a new list item for each option
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'answer'; // Ensure all radio buttons have the same name
        radioInput.id = `option-${index}`; // Unique ID for each radio button
        radioInput.value = option; // Set value to the option
       
        const label = document.createElement('label');
        label.htmlFor = radioInput.id; // Associate label with radio button
        label.innerText = option; // Set label text to the option text
       
        optionElement.appendChild(radioInput); // Append radio button to list item
        optionElement.appendChild(label); // Append label to list item
        optionsList.appendChild(optionElement); // Append list item to the options list
        });
       
        // Reset hint display
        document.getElementById('hint').innerText = ''; // Clear previous hint
    }
}

// Initialize quiz
const quiz = new Quiz(quizData);
quiz.displayCurrentQuestion();

// Handle next question button click
document.getElementById('next-btn').addEventListener('click', () => {
    quiz.nextQuestion();
});

// Handle hint button click
document.getElementById('hint-btn').addEventListener('click', () => {
    quiz.showHint();
});
