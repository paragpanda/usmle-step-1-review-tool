// USMLE Review Tool - Simple and Clean Implementation

class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.showingAnswer = false;
        this.incorrectQuestions = [];
        this.isReviewMode = false;
        this.flashcards = [];
        this.currentFlashcardIndex = 0;
        this.showingFlashcardAnswer = false;
        
        this.init();
    }

    async init() {
        await this.loadQuestions();
        await this.loadFlashcards();
        this.setupEventListeners();
        this.loadIncorrectQuestions();
        this.updateIncorrectQuestionsUI();
        this.showScreen('category-select');
    }

    async loadQuestions() {
        // First check if CONSOLIDATED_QUESTION_BANK is available (it should be)
        if (typeof CONSOLIDATED_QUESTION_BANK !== 'undefined' && CONSOLIDATED_QUESTION_BANK.length > 0) {
            // Filter out questions with clearly broken options, but be less strict
            this.allQuestions = CONSOLIDATED_QUESTION_BANK.filter(q => {
                if (!q.options || q.options.length < 2) return false;
                
                // Count how many options are just "A)", "B)", etc.
                const malformedCount = q.options.filter(opt => 
                    !opt || opt.match(/^[A-E]\)$/) || opt.trim().length < 2
                ).length;
                
                // Keep question if less than half the options are malformed
                return malformedCount < q.options.length / 2;
            });
            console.log(`Loaded ${this.allQuestions.length} valid questions from unified-question-bank.js (filtered from ${CONSOLIDATED_QUESTION_BANK.length})`);
            return;
        }
        
        // Try loading from questions.json as backup
        try {
            const response = await fetch('questions.json');
            if (response.ok) {
                const questions = await response.json();
                this.allQuestions = questions.filter(q => 
                    q.options && 
                    q.options.length >= 2 && 
                    q.options.every(opt => opt && opt.length > 3)
                );
                console.log(`Loaded ${this.allQuestions.length} valid questions from questions.json`);
                return;
            }
        } catch (error) {
            console.log('Could not load questions.json');
        }
        
        console.error('No questions available');
        this.allQuestions = [];
    }

    async loadFlashcards() {
        try {
            const response = await fetch('output_notes.csv');
            if (!response.ok) {
                console.log('Could not load flashcards CSV file');
                this.flashcards = [];
                return;
            }
            
            const csvText = await response.text();
            this.flashcards = this.parseCSV(csvText);
            console.log(`Loaded ${this.flashcards.length} flashcards from CSV`);
        } catch (error) {
            console.error('Error loading flashcards:', error);
            this.flashcards = [];
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const flashcards = [];
        
        // Skip header line
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            try {
                // Parse CSV line - handle quoted fields with commas
                const fields = this.parseCSVLine(line);
                if (fields.length >= 7) {
                    const tags = fields[5] || '';
                    const fieldContent = fields[6] || '';
                    
                    // Extract question and answer from the field content
                    const parts = fieldContent.split(' | ');
                    if (parts.length >= 1) {
                        const question = parts[0];
                        const answer = parts[1] || question; // fallback to question if no separate answer
                        
                        flashcards.push({
                            id: fields[0],
                            tags: tags.split(' ').filter(tag => tag.length > 0),
                            question: this.processClozeText(question, false), // Show with blanks
                            answer: this.processClozeText(answer, true), // Show with answers
                            category: this.getCategoryFromTags(tags)
                        });
                    }
                }
            } catch (error) {
                // Skip malformed lines
                continue;
            }
        }
        
        return flashcards;
    }

    parseCSVLine(line) {
        const fields = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"' && (i === 0 || line[i-1] === ',')) {
                inQuotes = true;
            } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
                inQuotes = false;
            } else if (char === ',' && !inQuotes) {
                fields.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        fields.push(current);
        return fields;
    }

    processClozeText(text, showAnswers) {
        if (!text) return '';
        
        // Decode HTML entities
        text = text.replace(/&nbsp;/g, ' ')
                  .replace(/&gt;/g, '>')
                  .replace(/&lt;/g, '<')
                  .replace(/&amp;/g, '&');
        
        // Handle cloze deletions like {{c1::answer}}
        return text.replace(/\{\{c\d+::([^}]+)\}\}/g, (match, answer) => {
            if (showAnswers) {
                return `<strong>${answer}</strong>`;
            } else {
                return '[___]';
            }
        });
    }

    getCategoryFromTags(tags) {
        const tagString = tags.toLowerCase();
        if (tagString.includes('pharm')) return 'Pharmacology';
        if (tagString.includes('autonomic')) return 'Pharmacology';
        if (tagString.includes('cardio')) return 'Clinical Medicine';
        if (tagString.includes('neuro')) return 'Clinical Medicine';
        if (tagString.includes('endo')) return 'Clinical Medicine';
        if (tagString.includes('ethics')) return 'Medical Ethics & Communication';
        if (tagString.includes('research') || tagString.includes('stats')) return 'Research & Statistics';
        if (tagString.includes('emergency')) return 'Emergency Medicine';
        return 'General';
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('flashcard-btn').addEventListener('click', () => this.startFlashcards());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
        document.getElementById('exit-btn').addEventListener('click', () => this.exitQuiz());
        document.getElementById('flashcard-exit-btn').addEventListener('click', () => this.exitFlashcards());
        document.getElementById('review-incorrect-btn').addEventListener('click', () => this.startReviewMode());
        document.getElementById('review-from-results-btn').addEventListener('click', () => this.startReviewMode());
        document.getElementById('show-answer-btn').addEventListener('click', () => this.showFlashcardAnswer());
        document.getElementById('prev-flashcard-btn').addEventListener('click', () => this.prevFlashcard());
        document.getElementById('next-flashcard-btn').addEventListener('click', () => this.nextFlashcard());
    }

    exitQuiz() {
        if (confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
            this.showScreen('category-select');
        }
    }

    startQuiz() {
        const selectedCategory = document.getElementById('category').value;
        
        console.log(`Starting quiz with category: "${selectedCategory}"`);
        console.log(`Total available questions: ${this.allQuestions.length}`);
        
        // Check if we have questions
        if (!this.allQuestions || this.allQuestions.length === 0) {
            alert('No questions available. Please check the console for errors.');
            return;
        }
        
        // Filter questions by category
        if (selectedCategory) {
            this.questions = this.allQuestions.filter(q => q.category === selectedCategory);
            console.log(`Filtered to ${this.questions.length} questions for category "${selectedCategory}"`);
        } else {
            this.questions = [...this.allQuestions];
            console.log(`Using all ${this.questions.length} questions`);
        }
        
        // Check if filtering resulted in questions
        if (this.questions.length === 0) {
            alert(`No questions found for category "${selectedCategory}". Try selecting "All Categories" instead.`);
            return;
        }
        
        // Shuffle questions
        this.questions = this.shuffleArray(this.questions);
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isReviewMode = false;
        this.updateStats();
        this.showScreen('question-screen');
        this.displayQuestion();
    }

    startReviewMode() {
        if (this.incorrectQuestions.length === 0) {
            alert('No incorrect questions to review! Complete a quiz first.');
            return;
        }

        this.questions = [...this.incorrectQuestions];
        this.questions = this.shuffleArray(this.questions);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isReviewMode = true;
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
        } else {
            // Add to incorrect questions if not already there and not in review mode
            if (!this.isReviewMode && !this.incorrectQuestions.find(q => q.id === question.id)) {
                this.incorrectQuestions.push(question);
                this.saveIncorrectQuestions();
                this.updateIncorrectQuestionsUI();
            }
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
        
        // Show review button if there are incorrect questions from this session
        const reviewBtn = document.getElementById('review-from-results-btn');
        const incorrectFromSession = this.questions.length - this.score;
        if (incorrectFromSession > 0 && !this.isReviewMode) {
            reviewBtn.style.display = 'inline-block';
        } else {
            reviewBtn.style.display = 'none';
        }
        
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

    loadIncorrectQuestions() {
        try {
            const saved = localStorage.getItem('usmle-incorrect-questions');
            if (saved) {
                this.incorrectQuestions = JSON.parse(saved);
            }
        } catch (error) {
            console.log('Could not load incorrect questions from storage');
            this.incorrectQuestions = [];
        }
    }

    saveIncorrectQuestions() {
        try {
            localStorage.setItem('usmle-incorrect-questions', JSON.stringify(this.incorrectQuestions));
        } catch (error) {
            console.log('Could not save incorrect questions to storage');
        }
    }

    updateIncorrectQuestionsUI() {
        const reviewBtn = document.getElementById('review-incorrect-btn');
        const countSpan = document.getElementById('incorrect-count');
        
        if (this.incorrectQuestions.length > 0) {
            reviewBtn.style.display = 'inline-block';
            countSpan.textContent = this.incorrectQuestions.length;
        } else {
            reviewBtn.style.display = 'none';
        }
    }

    startFlashcards() {
        const selectedCategory = document.getElementById('category').value;
        
        if (!this.flashcards || this.flashcards.length === 0) {
            alert('No flashcards available. Please ensure output_notes.csv is in the correct location.');
            return;
        }
        
        // Filter flashcards by category
        let filteredFlashcards;
        if (selectedCategory) {
            filteredFlashcards = this.flashcards.filter(f => f.category === selectedCategory);
            if (filteredFlashcards.length === 0) {
                alert(`No flashcards found for category "${selectedCategory}". Try selecting "All Categories" instead.`);
                return;
            }
        } else {
            filteredFlashcards = [...this.flashcards];
        }
        
        this.currentFlashcards = this.shuffleArray(filteredFlashcards);
        this.currentFlashcardIndex = 0;
        this.showingFlashcardAnswer = false;
        
        this.showScreen('flashcard-screen');
        this.displayFlashcard();
    }

    exitFlashcards() {
        this.showScreen('category-select');
    }

    displayFlashcard() {
        if (this.currentFlashcardIndex >= this.currentFlashcards.length) {
            this.currentFlashcardIndex = 0; // Loop back to start
        }
        
        const flashcard = this.currentFlashcards[this.currentFlashcardIndex];
        this.showingFlashcardAnswer = false;
        
        document.getElementById('flashcard-category').textContent = flashcard.category;
        document.getElementById('flashcard-text').innerHTML = flashcard.question;
        document.getElementById('flashcard-answer').innerHTML = flashcard.answer;
        document.getElementById('flashcard-answer').style.display = 'none';
        document.getElementById('show-answer-btn').style.display = 'block';
        document.getElementById('flashcard-nav').style.display = 'none';
    }

    showFlashcardAnswer() {
        this.showingFlashcardAnswer = true;
        document.getElementById('flashcard-answer').style.display = 'block';
        document.getElementById('show-answer-btn').style.display = 'none';
        document.getElementById('flashcard-nav').style.display = 'block';
    }

    prevFlashcard() {
        this.currentFlashcardIndex--;
        if (this.currentFlashcardIndex < 0) {
            this.currentFlashcardIndex = this.currentFlashcards.length - 1;
        }
        this.displayFlashcard();
    }

    nextFlashcard() {
        this.currentFlashcardIndex++;
        if (this.currentFlashcardIndex >= this.currentFlashcards.length) {
            this.currentFlashcardIndex = 0;
        }
        this.displayFlashcard();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});