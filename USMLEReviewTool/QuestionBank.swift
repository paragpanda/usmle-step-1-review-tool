import Foundation

class QuestionBank: ObservableObject {
    @Published var questions: [Question] = []
    
    init() {
        loadSampleQuestions()
    }
    
    private func loadSampleQuestions() {
        questions = [
            Question(
                questionText: "A 14-year-old girl comes to the physician with her mom for a routine health maintenance examination. The physician mentions a new study that would require the patient's data be collected for the purposes of research. Consent is required by whom in this case?",
                options: [
                    "Both parents",
                    "One parent only",
                    "Patient only",
                    "Patient and one parent",
                    "Patient and both parents"
                ],
                correctAnswerIndex: 4,
                explanation: "US federal requirements for children involved in research state that both parents must give consent when at all possible, in addition to the patient who is the minor. One parent may give consent if the second parent is unavailable or deceased.",
                category: "Medical Ethics & Communication",
                subject: "Ethics"
            ),
            
            Question(
                questionText: "A 25-year-old woman presents to the physician for a follow-up appointment. The physician arrives to see the patient ten minutes after the scheduled time. The patient is very angry about the wait. Which of the following is the most appropriate initial response by the physician?",
                options: [
                    "You need to calm down so we can discuss your concerns",
                    "I understand your frustration, but emergencies do come up",
                    "I'm sorry to keep you waiting. Let's discuss why you've come in today",
                    "Our office policy states that we try to stay on time",
                    "Would you like to reschedule for another time?"
                ],
                correctAnswerIndex: 2,
                explanation: "The most appropriate response acknowledges the delay with an apology and redirects to the patient's care. This shows respect for the patient's time while maintaining a professional focus on their medical needs.",
                category: "Medical Ethics & Communication",
                subject: "Communication"
            ),
            
            Question(
                questionText: "A 40-year-old man is brought to the emergency department after being found somnolent in his apartment with an empty bottle of aspirin pills. The laboratory studies show blood pH within the normal range. The HCO3- is 8 mmol/L. Which PaCO2 value would most likely be seen?",
                options: [
                    "24 mmHg",
                    "22 mmHg", 
                    "16 mmHg",
                    "20 mmHg",
                    "18 mmHg"
                ],
                correctAnswerIndex: 2,
                explanation: "Salicylate intoxication causes respiratory alkalosis and metabolic acidosis simultaneously. Winter's formula: PaCO2 = (1.5 × HCO3-) + 8 ± 2. For HCO3- of 8: PaCO2 = (1.5 × 8) + 8 = 20 ± 2, so 16 mmHg is within expected range.",
                category: "Clinical Medicine",
                subject: "Acid-Base Disorders"
            ),
            
            Question(
                questionText: "A patient is prescribed a medication with a bioavailability of 60% and a clearance of 2 L/min. If the drug has a volume of distribution of 50 L, what is the elimination half-life?",
                options: [
                    "17 minutes",
                    "25 minutes",
                    "30 minutes",
                    "35 minutes"
                ],
                correctAnswerIndex: 0,
                explanation: "Half-life = 0.693 × Vd / Clearance = 0.693 × 50 L / 2 L/min = 17.3 minutes. The bioavailability doesn't affect the elimination half-life calculation.",
                category: "Pharmacology",
                subject: "Pharmacology"
            ),
            
            Question(
                questionText: "Which pharmacologic agent is first-line treatment for anaphylaxis?",
                options: [
                    "Diphenhydramine",
                    "Methylprednisolone", 
                    "Epinephrine",
                    "Albuterol"
                ],
                correctAnswerIndex: 2,
                explanation: "Epinephrine is the first-line treatment for anaphylaxis. It should be administered intramuscularly (preferably in the anterolateral thigh) as soon as anaphylaxis is suspected.",
                category: "Emergency Medicine",
                subject: "Emergency Medicine"
            ),
            
            Question(
                questionText: "A group of researchers is interested in finding out whether IV drug-use by patients at a select hospital is associated with increased risk of atrial myxoma. A study is performed by searching through medical records. Which study design best describes this?",
                options: [
                    "Case-control study",
                    "Prospective cohort study",
                    "Retrospective cohort study",
                    "Cross-sectional study",
                    "Randomized controlled trial"
                ],
                correctAnswerIndex: 2,
                explanation: "This is a retrospective cohort study because researchers are looking at exposure (IV drug use) and following forward to outcome (myxoma) using historical records. They're searching historical records, making it retrospective.",
                category: "Research & Statistics",
                subject: "Epidemiology"
            ),
            
            Question(
                questionText: "A 28-year-old traveler returns from Southeast Asia with a 3-day history of watery diarrhea and cramping. He denies fever or blood in stool. What is the most likely causative organism?",
                options: [
                    "Campylobacter jejuni",
                    "Enterotoxigenic E. coli (ETEC)",
                    "Shigella species",
                    "Clostridioides difficile"
                ],
                correctAnswerIndex: 1,
                explanation: "Travel + self-limiting watery or brown/green diarrhea = Traveler diarrhea = ETEC HL or HS toxin. ETEC is the most common cause of traveler's diarrhea, especially in developing countries.",
                category: "Clinical Medicine",
                subject: "Infectious Disease"
            ),
            
            Question(
                questionText: "A 72-year-old hospitalized patient develops diarrhea after receiving clindamycin for pneumonia. Stool testing is positive for toxin. What is the most appropriate initial treatment?",
                options: [
                    "Metronidazole",
                    "Vancomycin", 
                    "Fidaxomicin",
                    "Rifaximin"
                ],
                correctAnswerIndex: 1,
                explanation: "Abx (clindamycin, beta-lactam, cephalosporin) + diarrhea = C. difficile. Treatment of C. diff = vancomycin, not metronidazole (updated guidelines as of Feb 2018).",
                category: "Clinical Medicine",
                subject: "Infectious Disease"
            )
        ]
    }
    
    func getQuestionsByCategory(_ category: String) -> [Question] {
        return questions.filter { $0.category == category }
    }
    
    func getQuestionsBySubject(_ subject: String) -> [Question] {
        return questions.filter { $0.subject == subject }
    }
    
    func getAllCategories() -> [String] {
        return Array(Set(questions.map { $0.category })).sorted()
    }
    
    func getAllSubjects() -> [String] {
        return Array(Set(questions.map { $0.subject })).sorted()
    }
    
    func getRandomQuestions(count: Int) -> [Question] {
        return Array(questions.shuffled().prefix(count))
    }
}