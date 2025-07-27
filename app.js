// USMLE Review Tool - Main Application Logic

class StudySession {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.attempts = [];
        this.incorrectQuestions = [];
        this.isReviewMode = false;
        this.selectedAnswer = null;
        this.showingAnswer = false;
        this.questionBank = null;
        
        // Load questions and initialize
        this.loadQuestions().then(() => {
            // Load saved progress
            this.loadProgress();
            
            // Initialize event listeners
            this.initializeEventListeners();
            
            // Update UI
            this.updateIncorrectCount();
        });
    }

    async loadQuestions() {
        try {
            // Try to load from questions.json first
            const response = await fetch('questions.json');
            if (response.ok) {
                const questions = await response.json();
                this.questionBank = new QuestionBank(questions);
                console.log('Loaded questions from questions.json');
                return;
            }
        } catch (error) {
            console.log('Could not load questions.json, falling back to unified-question-bank.js');
        }
        
        // Fallback to the existing question bank
        if (typeof CONSOLIDATED_QUESTION_BANK !== 'undefined') {
            this.questionBank = new QuestionBank(CONSOLIDATED_QUESTION_BANK);
            console.log('Loaded questions from unified-question-bank.js');
        } else {
            console.error('No question bank available');
        }
    }

    initializeEventListeners() {
        // Session configuration
        document.getElementById('startSession').addEventListener('click', () => this.startNewSession());
        document.getElementById('reviewIncorrect').addEventListener('click', () => this.startReviewSession());
        
        // Study session
        document.getElementById('exitSession').addEventListener('click', () => this.exitSession());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
        
        // Session complete
        document.getElementById('newSession').addEventListener('click', () => this.exitSession());
        document.getElementById('reviewIncorrectFromComplete').addEventListener('click', () => this.startReviewSession());
    }

    startNewSession() {
        const category = document.getElementById('categorySelect').value;
        
        // Get ALL questions from selected category (or all if none selected)
        if (category) {
            this.questions = this.questionBank.getQuestionsByCategory(category);
            // Shuffle them for random order
            this.questions = this.questions.sort(() => Math.random() - 0.5);
        } else {
            // If no category selected, get all questions shuffled
            this.questions = this.questionBank.getAllQuestions().sort(() => Math.random() - 0.5);
        }
        this.currentQuestionIndex = 0;
        this.attempts = [];
        this.isReviewMode = false;
        this.selectedAnswer = null;
        this.showingAnswer = false;
        
        this.showScreen('studySession');
        this.displayQuestion();
        this.updateProgress();
    }

    startReviewSession() {
        if (this.incorrectQuestions.length === 0) {
            alert('No incorrect questions to review!');
            return;
        }
        
        this.questions = [...this.incorrectQuestions].sort(() => Math.random() - 0.5);
        this.currentQuestionIndex = 0;
        this.attempts = [];
        this.isReviewMode = true;
        this.selectedAnswer = null;
        this.showingAnswer = false;
        
        this.showScreen('studySession');
        this.displayQuestion();
        this.updateProgress();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) {
            this.showSessionComplete();
            return;
        }

        // Update question display
        document.getElementById('categoryTag').textContent = question.category;
        document.getElementById('questionText').textContent = question.questionText;
        
        // Create options
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        // Hide explanation
        document.getElementById('explanationContainer').style.display = 'none';
        this.showingAnswer = false;
        this.selectedAnswer = null;
    }

    selectAnswer(answerIndex) {
        if (this.showingAnswer) return;
        
        this.selectedAnswer = answerIndex;
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = answerIndex === question.correctAnswerIndex;
        
        // Record attempt
        this.attempts.push({
            questionId: question.id,
            selectedAnswer: answerIndex,
            correctAnswer: question.correctAnswerIndex,
            isCorrect: isCorrect,
            timestamp: new Date()
        });

        // Add to incorrect questions if wrong and not already there
        if (!isCorrect && !this.incorrectQuestions.find(q => q.id === question.id)) {
            this.incorrectQuestions.push(question);
        }

        // Update option buttons
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach((button, index) => {
            button.style.pointerEvents = 'none';
            if (index === question.correctAnswerIndex) {
                button.classList.add('correct');
            } else if (index === answerIndex && !isCorrect) {
                button.classList.add('incorrect');
            }
        });

        // Show explanation
        document.getElementById('explanationText').textContent = question.explanation;
        document.getElementById('explanationContainer').style.display = 'block';
        
        // Update next button text
        const nextButton = document.getElementById('nextQuestion');
        if (this.currentQuestionIndex < this.questions.length - 1) {
            nextButton.textContent = 'Next Question';
        } else {
            nextButton.textContent = 'Complete Session';
        }
        
        this.showingAnswer = true;
        this.updateProgress();
        this.saveProgress();
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateProgress();
        } else {
            this.showSessionComplete();
        }
    }

    updateProgress() {
        const current = this.currentQuestionIndex + 1;
        const total = this.questions.length;
        const correct = this.attempts.filter(a => a.isCorrect).length;
        const attempted = this.attempts.length;
        
        document.getElementById('questionProgress').textContent = `Question ${current} of ${total}`;
        document.getElementById('scoreDisplay').textContent = `${correct}/${attempted}`;
        
        const progressPercent = (this.currentQuestionIndex / total) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
    }

    showSessionComplete() {
        const correct = this.attempts.filter(a => a.isCorrect).length;
        const total = this.attempts.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        document.getElementById('finalScore').textContent = `${correct} / ${total}`;
        document.getElementById('finalPercentage').textContent = `${percentage}%`;
        
        // Show incorrect message if any wrong answers
        const incorrectCount = total - correct;
        const incorrectMessage = document.getElementById('incorrectMessage');
        if (incorrectCount > 0) {
            incorrectMessage.textContent = `You got ${incorrectCount} question${incorrectCount !== 1 ? 's' : ''} wrong`;
            incorrectMessage.style.display = 'block';
        } else {
            incorrectMessage.style.display = 'none';
        }
        
        // Show/hide review button
        const reviewButton = document.getElementById('reviewIncorrectFromComplete');
        if (this.incorrectQuestions.length > 0) {
            reviewButton.style.display = 'block';
        } else {
            reviewButton.style.display = 'none';
        }
        
        this.showScreen('sessionComplete');
        this.updateIncorrectCount();
    }

    exitSession() {
        this.showScreen('sessionConfig');
        this.updateIncorrectCount();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    updateIncorrectCount() {
        const count = this.incorrectQuestions.length;
        document.getElementById('incorrectCount').textContent = count;
        
        const reviewButton = document.getElementById('reviewIncorrect');
        if (count > 0) {
            reviewButton.style.display = 'block';
        } else {
            reviewButton.style.display = 'none';
        }
    }

    saveProgress() {
        const data = {
            incorrectQuestions: this.incorrectQuestions,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('usmle-review-progress', JSON.stringify(data));
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('usmle-review-progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.incorrectQuestions = data.incorrectQuestions || [];
            }
        } catch (error) {
            console.log('Could not load saved progress:', error);
            this.incorrectQuestions = [];
        }
    }

    resetProgress() {
        this.incorrectQuestions = [];
        localStorage.removeItem('usmle-review-progress');
        this.updateIncorrectCount();
    }
}

// PWA Installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button if needed
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installButton.style.display = 'none';
            }
        });
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the study session
    window.studySession = new StudySession();
    
    // Add viewport height fix for mobile browsers
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});

// Prevent zoom on double tap for better mobile experience
document.addEventListener('touchend', (e) => {
    const now = new Date().getTime();
    const timeSince = now - (window.lastTouchEnd || 0);
    if (timeSince < 300 && timeSince > 0) {
        e.preventDefault();
    }
    window.lastTouchEnd = now;
}, false);