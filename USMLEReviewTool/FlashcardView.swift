import SwiftUI

struct FlashcardView: View {
    @StateObject private var studySession = StudySession()
    @StateObject private var questionBank = QuestionBank()
    @State private var showingSessionOptions = true
    @State private var selectedCategory: String? = nil
    
    var body: some View {
        NavigationView {
            if showingSessionOptions {
                sessionOptionsView
            } else {
                flashcardContentView
            }
        }
    }
    
    private var sessionOptionsView: some View {
        VStack(spacing: 30) {
            Text("USMLE Step 1 Review")
                .font(.largeTitle)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)
            
            VStack(spacing: 20) {
                Text("Choose Your Study Topic")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                VStack(alignment: .leading, spacing: 15) {
                    Text("Select Category")
                        .font(.headline)
                    
                    Picker("Category", selection: $selectedCategory) {
                        Text("All Topics").tag(nil as String?)
                        ForEach(questionBank.getAllCategories(), id: \.self) { category in
                            Text(category).tag(category as String?)
                        }
                    }
                    .pickerStyle(MenuPickerStyle())
                }
                
                Button(action: startSession) {
                    Text("Start Session")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(12)
                }
                
                if !studySession.incorrectQuestions.isEmpty {
                    Button(action: startReviewSession) {
                        Text("Review Incorrect Questions (\(studySession.incorrectQuestions.count))")
                            .font(.title3)
                            .fontWeight(.medium)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.orange)
                            .cornerRadius(12)
                    }
                }
            }
            .padding()
            
            Spacer()
        }
        .padding()
        .navigationBarHidden(true)
    }
    
    private var flashcardContentView: some View {
        VStack(spacing: 0) {
            headerView
            
            if let question = studySession.currentQuestion {
                questionCardView(question: question)
            } else {
                sessionCompleteView
            }
        }
        .navigationBarHidden(true)
    }
    
    private var headerView: some View {
        VStack(spacing: 10) {
            HStack {
                Button("Exit") {
                    showingSessionOptions = true
                    studySession.resetSession()
                }
                .foregroundColor(.blue)
                
                Spacer()
                
                Text("Question \(studySession.currentQuestionIndex + 1) of \(studySession.questions.count)")
                    .font(.headline)
                
                Spacer()
                
                Text("\(studySession.correctAnswersCount)/\(studySession.totalAnswersCount)")
                    .font(.headline)
                    .foregroundColor(studySession.totalAnswersCount > 0 ? .green : .primary)
            }
            
            ProgressView(value: studySession.progress)
                .progressViewStyle(LinearProgressViewStyle(tint: .blue))
        }
        .padding()
        .background(Color(.systemGray6))
    }
    
    private func questionCardView(question: Question) -> some View {
        ScrollView {
            VStack(spacing: 25) {
                VStack(alignment: .leading, spacing: 15) {
                    HStack {
                        Text(question.category)
                            .font(.caption)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(Color.blue.opacity(0.1))
                            .foregroundColor(.blue)
                            .cornerRadius(20)
                        
                        Spacer()
                    }
                    
                    Text(question.questionText)
                        .font(.body)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                }
                
                if !studySession.showAnswer {
                    optionsView(question: question)
                } else {
                    answerView(question: question)
                }
            }
            .padding()
        }
    }
    
    private func optionsView(question: Question) -> some View {
        VStack(spacing: 12) {
            ForEach(Array(question.options.enumerated()), id: \.offset) { index, option in
                Button(action: {
                    studySession.submitAnswer(index)
                }) {
                    HStack {
                        Text("\(Character(UnicodeScalar(65 + index)!)). \(option)")
                            .multilineTextAlignment(.leading)
                        Spacer()
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(.systemGray4), lineWidth: 1)
                    )
                }
                .foregroundColor(.primary)
                .disabled(studySession.showAnswer)
            }
        }
    }
    
    private func answerView(question: Question) -> some View {
        VStack(spacing: 20) {
            VStack(spacing: 12) {
                ForEach(Array(question.options.enumerated()), id: \.offset) { index, option in
                    HStack {
                        Text("\(Character(UnicodeScalar(65 + index)!)). \(option)")
                            .multilineTextAlignment(.leading)
                        Spacer()
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(backgroundColor(for: index, question: question))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(borderColor(for: index, question: question), lineWidth: 2)
                    )
                }
            }
            
            VStack(alignment: .leading, spacing: 15) {
                Text("Explanation")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text(question.explanation)
                    .font(.body)
                    .multilineTextAlignment(.leading)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)
            
            Button(action: {
                studySession.nextQuestion()
            }) {
                Text(studySession.currentQuestionIndex < studySession.questions.count - 1 ? "Next Question" : "Complete Session")
                    .font(.title3)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(12)
            }
        }
    }
    
    private var sessionCompleteView: some View {
        VStack(spacing: 30) {
            Text("Session Complete!")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            VStack(spacing: 15) {
                Text("Your Score")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Text("\(studySession.correctAnswersCount) / \(studySession.totalAnswersCount)")
                    .font(.system(size: 48, weight: .bold))
                    .foregroundColor(.green)
                
                Text("\(Int(Double(studySession.correctAnswersCount) / Double(studySession.totalAnswersCount) * 100))%")
                    .font(.title)
                    .foregroundColor(.secondary)
            }
            
            if !studySession.incorrectQuestions.isEmpty {
                Text("You got \(studySession.incorrectQuestions.count) questions wrong")
                    .font(.headline)
                    .foregroundColor(.orange)
            }
            
            VStack(spacing: 15) {
                Button("Start New Session") {
                    showingSessionOptions = true
                    studySession.resetSession()
                }
                .font(.title3)
                .fontWeight(.semibold)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .cornerRadius(12)
                
                if !studySession.incorrectQuestions.isEmpty {
                    Button("Review Incorrect Questions") {
                        studySession.startReviewSession()
                    }
                    .font(.title3)
                    .fontWeight(.medium)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.orange)
                    .cornerRadius(12)
                }
            }
            
            Spacer()
        }
        .padding()
    }
    
    private func backgroundColor(for index: Int, question: Question) -> Color {
        guard let selectedIndex = studySession.selectedAnswerIndex else {
            return Color(.systemGray6)
        }
        
        if index == question.correctAnswerIndex {
            return Color.green.opacity(0.3)
        } else if index == selectedIndex {
            return Color.red.opacity(0.3)
        } else {
            return Color(.systemGray6)
        }
    }
    
    private func borderColor(for index: Int, question: Question) -> Color {
        guard let selectedIndex = studySession.selectedAnswerIndex else {
            return Color(.systemGray4)
        }
        
        if index == question.correctAnswerIndex {
            return Color.green
        } else if index == selectedIndex {
            return Color.red
        } else {
            return Color(.systemGray4)
        }
    }
    
    private func startSession() {
        let questionsToUse: [Question]
        
        if let category = selectedCategory {
            questionsToUse = questionBank.getQuestionsByCategory(category)
        } else {
            questionsToUse = questionBank.questions
        }
        
        // Use ALL questions from the selected category, shuffled
        let selectedQuestions = questionsToUse.shuffled()
        studySession.startNewSession(with: selectedQuestions)
        showingSessionOptions = false
    }
    
    private func startReviewSession() {
        studySession.startReviewSession()
        showingSessionOptions = false
    }
}

struct FlashcardView_Previews: PreviewProvider {
    static var previews: some View {
        FlashcardView()
    }
}