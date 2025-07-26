import Foundation

struct Question: Identifiable, Codable {
    let id = UUID()
    let questionText: String
    let options: [String]
    let correctAnswerIndex: Int
    let explanation: String
    let category: String
    let subject: String
    
    var correctAnswer: String {
        return options[correctAnswerIndex]
    }
}

struct QuestionAttempt: Identifiable {
    let id = UUID()
    let questionId: UUID
    let selectedAnswerIndex: Int
    let isCorrect: Bool
    let timestamp: Date
    
    init(questionId: UUID, selectedAnswerIndex: Int, correctAnswerIndex: Int) {
        self.questionId = questionId
        self.selectedAnswerIndex = selectedAnswerIndex
        self.isCorrect = selectedAnswerIndex == correctAnswerIndex
        self.timestamp = Date()
    }
}

class StudySession: ObservableObject {
    @Published var currentQuestionIndex = 0
    @Published var questions: [Question] = []
    @Published var attempts: [QuestionAttempt] = []
    @Published var showAnswer = false
    @Published var selectedAnswerIndex: Int? = nil
    @Published var reviewMode = false
    @Published var incorrectQuestions: [Question] = []
    
    var currentQuestion: Question? {
        guard currentQuestionIndex < questions.count else { return nil }
        return questions[currentQuestionIndex]
    }
    
    var progress: Double {
        guard !questions.isEmpty else { return 0 }
        return Double(currentQuestionIndex) / Double(questions.count)
    }
    
    var correctAnswersCount: Int {
        return attempts.filter { $0.isCorrect }.count
    }
    
    var totalAnswersCount: Int {
        return attempts.count
    }
    
    func startNewSession(with questions: [Question]) {
        self.questions = questions.shuffled()
        self.currentQuestionIndex = 0
        self.attempts = []
        self.showAnswer = false
        self.selectedAnswerIndex = nil
        self.reviewMode = false
        self.incorrectQuestions = []
    }
    
    func startReviewSession() {
        self.questions = incorrectQuestions.shuffled()
        self.currentQuestionIndex = 0
        self.showAnswer = false
        self.selectedAnswerIndex = nil
        self.reviewMode = true
    }
    
    func submitAnswer(_ answerIndex: Int) {
        guard let question = currentQuestion else { return }
        
        selectedAnswerIndex = answerIndex
        let attempt = QuestionAttempt(
            questionId: question.id,
            selectedAnswerIndex: answerIndex,
            correctAnswerIndex: question.correctAnswerIndex
        )
        
        attempts.append(attempt)
        
        if !attempt.isCorrect && !incorrectQuestions.contains(where: { $0.id == question.id }) {
            incorrectQuestions.append(question)
        }
        
        showAnswer = true
    }
    
    func nextQuestion() {
        currentQuestionIndex += 1
        showAnswer = false
        selectedAnswerIndex = nil
    }
    
    func resetSession() {
        currentQuestionIndex = 0
        attempts = []
        showAnswer = false
        selectedAnswerIndex = nil
        reviewMode = false
    }
}