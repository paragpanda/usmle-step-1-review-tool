import Foundation

class QuestionBank: ObservableObject {
    @Published var questions: [Question] = []
    
    init() {
        loadSampleQuestions()
    }
    
    private func loadSampleQuestions() {
        questions = [
            Question(
                questionText: "A 45-year-old man presents with chest pain and shortness of breath. ECG shows ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
                options: [
                    "Left anterior descending artery",
                    "Right coronary artery",
                    "Left circumflex artery",
                    "Left main coronary artery"
                ],
                correctAnswerIndex: 1,
                explanation: "ST-elevation in leads II, III, and aVF indicates an inferior wall MI, which is typically caused by occlusion of the right coronary artery (RCA). The RCA supplies the inferior wall of the left ventricle in most patients.",
                category: "Cardiology",
                subject: "Internal Medicine"
            ),
            
            Question(
                questionText: "Which of the following is the most common cause of acute pancreatitis in the United States?",
                options: [
                    "Alcohol abuse",
                    "Gallstones",
                    "Hypertriglyceridemia",
                    "Medications"
                ],
                correctAnswerIndex: 1,
                explanation: "Gallstones are the most common cause of acute pancreatitis in the United States, accounting for approximately 40-50% of cases. Alcohol is the second most common cause.",
                category: "Gastroenterology",
                subject: "Internal Medicine"
            ),
            
            Question(
                questionText: "A 25-year-old woman presents with fatigue, weight loss, and heat intolerance. Physical exam reveals a diffusely enlarged thyroid and exophthalmos. What is the most likely diagnosis?",
                options: [
                    "Hashimoto's thyroiditis",
                    "Toxic multinodular goiter",
                    "Graves' disease",
                    "Thyroid cancer"
                ],
                correctAnswerIndex: 2,
                explanation: "The combination of hyperthyroid symptoms (weight loss, heat intolerance), diffuse goiter, and exophthalmos (eye protrusion) is characteristic of Graves' disease, an autoimmune hyperthyroid condition.",
                category: "Endocrinology",
                subject: "Internal Medicine"
            ),
            
            Question(
                questionText: "Which enzyme is deficient in phenylketonuria (PKU)?",
                options: [
                    "Tyrosinase",
                    "Phenylalanine hydroxylase",
                    "Homogentisate oxidase",
                    "Branched-chain α-keto acid dehydrogenase"
                ],
                correctAnswerIndex: 1,
                explanation: "PKU is caused by deficiency of phenylalanine hydroxylase, which converts phenylalanine to tyrosine. This leads to accumulation of phenylalanine and its metabolites, causing intellectual disability if untreated.",
                category: "Genetics",
                subject: "Biochemistry"
            ),
            
            Question(
                questionText: "A 30-year-old man presents with sudden onset of severe headache described as 'worst headache of his life.' CT scan is normal. What is the next best step?",
                options: [
                    "MRI of the brain",
                    "Lumbar puncture",
                    "Angiography",
                    "Repeat CT in 24 hours"
                ],
                correctAnswerIndex: 1,
                explanation: "When subarachnoid hemorrhage is suspected clinically but CT is negative (especially if >24 hours after onset), lumbar puncture should be performed to look for xanthochromia and red blood cells.",
                category: "Neurology",
                subject: "Internal Medicine"
            ),
            
            Question(
                questionText: "Which of the following bacteria is the most common cause of acute otitis media in children?",
                options: [
                    "Haemophilus influenzae",
                    "Moraxella catarrhalis",
                    "Streptococcus pneumoniae",
                    "Staphylococcus aureus"
                ],
                correctAnswerIndex: 2,
                explanation: "Streptococcus pneumoniae is the most common bacterial cause of acute otitis media in children, followed by Haemophilus influenzae and Moraxella catarrhalis.",
                category: "Infectious Disease",
                subject: "Pediatrics"
            ),
            
            Question(
                questionText: "A patient with chronic kidney disease develops bone pain and muscle weakness. Laboratory shows low calcium, high phosphate, and elevated PTH. What is the most likely diagnosis?",
                options: [
                    "Primary hyperparathyroidism",
                    "Secondary hyperparathyroidism",
                    "Osteomalacia",
                    "Multiple myeloma"
                ],
                correctAnswerIndex: 1,
                explanation: "CKD leads to decreased phosphate excretion and reduced calcitriol production, causing hypocalcemia and hyperphosphatemia. This stimulates PTH release, resulting in secondary hyperparathyroidism.",
                category: "Nephrology",
                subject: "Internal Medicine"
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
                subject: "Pharmacology"
            ),
            
            Question(
                questionText: "A 2-year-old child presents with failure to thrive, chronic diarrhea, and recurrent respiratory infections. Sweat chloride test is elevated. What is the most likely diagnosis?",
                options: [
                    "Celiac disease",
                    "Cystic fibrosis",
                    "Immunodeficiency syndrome",
                    "Inflammatory bowel disease"
                ],
                correctAnswerIndex: 1,
                explanation: "The combination of failure to thrive, chronic diarrhea, recurrent respiratory infections, and elevated sweat chloride is diagnostic of cystic fibrosis, an autosomal recessive disorder affecting the CFTR gene.",
                category: "Pulmonology",
                subject: "Pediatrics"
            ),
            
            Question(
                questionText: "Which of the following is the mechanism of action of warfarin?",
                options: [
                    "Direct thrombin inhibition",
                    "Factor Xa inhibition",
                    "Vitamin K antagonism",
                    "Platelet aggregation inhibition"
                ],
                correctAnswerIndex: 2,
                explanation: "Warfarin is a vitamin K antagonist that inhibits the synthesis of vitamin K-dependent clotting factors (II, VII, IX, X) and proteins C and S by blocking vitamin K epoxide reductase.",
                category: "Hematology",
                subject: "Pharmacology"
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