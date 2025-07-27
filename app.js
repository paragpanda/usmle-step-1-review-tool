// USMLE Review Tool - Simple and Clean Implementation

class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.showingAnswer = false;
        
        this.init();
    }

    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
        this.showScreen('category-select');
    }

    async loadQuestions() {
        try {
            // Try loading from questions.json first
            const response = await fetch('questions.json');
            if (response.ok) {
                this.allQuestions = await response.json();
                console.log('Loaded questions from questions.json');
                return;
            }
        } catch (error) {
            console.log('Loading from fallback...');
        }
        
        // Fallback to unified-question-bank.js
        if (typeof CONSOLIDATED_QUESTION_BANK !== 'undefined') {
            this.allQuestions = CONSOLIDATED_QUESTION_BANK;
            console.log('Loaded questions from unified-question-bank.js');
        } else {
            console.error('No questions available');
            this.allQuestions = [];
        }
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }

    startQuiz() {
        const selectedCategory = document.getElementById('category').value;
        
        // Filter questions by category
        if (selectedCategory) {
            this.questions = this.allQuestions.filter(q => q.category === selectedCategory);
        } else {
            this.questions = [...this.allQuestions];
        }
        
        // Shuffle questions
        this.questions = this.shuffleArray(this.questions);
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.updateStats();
        this.showScreen('question-screen');
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.selectedAnswer = null;
        this.showingAnswer = false;

        // Update UI
        document.getElementById('current-category').textContent = question.category || 'General';
        document.getElementById('question-text').textContent = question.questionText;
        document.getElementById('explanation').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';

        // Create options
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        this.updateStats();
    }

    selectAnswer(selectedIndex) {
        if (this.showingAnswer) return;

        this.selectedAnswer = selectedIndex;
        this.showingAnswer = true;
        
        const question = this.questions[this.currentQuestionIndex];
        const correct = selectedIndex === question.correctAnswerIndex;
        
        if (correct) {
            this.score++;
        }

        // Show feedback
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correctAnswerIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !correct) {
                btn.classList.add('incorrect');
            }
        });

        // Show explanation
        if (question.explanation) {
            const explanationDiv = document.getElementById('explanation');
            explanationDiv.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
            explanationDiv.style.display = 'block';
        }

        document.getElementById('next-btn').style.display = 'block';
        this.updateStats();
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        document.getElementById('final-score').innerHTML = `
            <div class="score-large">${this.score}/${this.questions.length}</div>
            <div class="score-percent">${percentage}%</div>
        `;
        this.showScreen('results-screen');
    }

    restart() {
        this.showScreen('category-select');
    }

    updateStats() {
        document.getElementById('score').textContent = `Score: ${this.score}/${this.questions.length}`;
        document.getElementById('progress').textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});