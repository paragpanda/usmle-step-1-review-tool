// USMLE Step 1 High-Yield Questions Database
const QUESTION_BANK = [
    {
        id: 1,
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
    },
    {
        id: 2,
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
    },
    {
        id: 3,
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
    },
    {
        id: 4,
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
    },
    {
        id: 5,
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
    },
    {
        id: 6,
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
    },
    {
        id: 7,
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
    },
    {
        id: 8,
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
    },
    {
        id: 9,
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
    },
    {
        id: 10,
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
    },
    {
        id: 11,
        questionText: "A 65-year-old woman with diabetes presents with a painless ulcer on her foot. Which of the following complications is she most at risk for?",
        options: [
            "Malignant transformation",
            "Osteomyelitis",
            "Compartment syndrome",
            "Deep vein thrombosis"
        ],
        correctAnswerIndex: 1,
        explanation: "Diabetic foot ulcers have a high risk of progressing to osteomyelitis due to poor circulation, neuropathy, and impaired immune function. This is a serious complication requiring prompt treatment.",
        category: "Endocrinology",
        subject: "Internal Medicine"
    },
    {
        id: 12,
        questionText: "What is the most common cause of viral meningitis in adults?",
        options: [
            "Herpes simplex virus",
            "Enteroviruses",
            "Epstein-Barr virus",
            "Cytomegalovirus"
        ],
        correctAnswerIndex: 1,
        explanation: "Enteroviruses (including coxsackievirus and echovirus) are the most common cause of viral meningitis in adults, particularly during summer and fall months.",
        category: "Infectious Disease",
        subject: "Neurology"
    },
    {
        id: 13,
        questionText: "A 28-year-old pregnant woman at 32 weeks gestation develops severe hypertension and proteinuria. What is the definitive treatment?",
        options: [
            "Antihypertensive medications",
            "Bed rest and monitoring",
            "Delivery of the baby",
            "Corticosteroids"
        ],
        correctAnswerIndex: 2,
        explanation: "The definitive treatment for preeclampsia with severe features is delivery of the baby and placenta. This is the only way to halt the progression of the disease process.",
        category: "Obstetrics",
        subject: "Obstetrics & Gynecology"
    },
    {
        id: 14,
        questionText: "Which of the following is the most common cause of sudden cardiac death in young athletes?",
        options: [
            "Hypertrophic cardiomyopathy",
            "Long QT syndrome",
            "Aortic stenosis",
            "Coronary artery disease"
        ],
        correctAnswerIndex: 0,
        explanation: "Hypertrophic cardiomyopathy is the most common cause of sudden cardiac death in young athletes under 35 years old. It can cause ventricular arrhythmias during intense physical activity.",
        category: "Cardiology",
        subject: "Internal Medicine"
    },
    {
        id: 15,
        questionText: "A patient presents with jaundice, clay-colored stools, and dark urine. Which type of bilirubin would be elevated?",
        options: [
            "Unconjugated bilirubin only",
            "Conjugated bilirubin only",
            "Both conjugated and unconjugated",
            "Neither type would be elevated"
        ],
        correctAnswerIndex: 1,
        explanation: "Clay-colored stools and dark urine indicate obstructive jaundice, where conjugated bilirubin is elevated due to impaired drainage into the intestines. The conjugated bilirubin backs up into the bloodstream.",
        category: "Gastroenterology",
        subject: "Internal Medicine"
    },
    {
        id: 16,
        questionText: "What is the first-line treatment for mild to moderate ulcerative colitis?",
        options: [
            "Oral corticosteroids",
            "5-aminosalicylic acid (5-ASA)",
            "Azathioprine",
            "Infliximab"
        ],
        correctAnswerIndex: 1,
        explanation: "5-aminosalicylic acid (5-ASA) compounds like mesalamine are first-line treatment for mild to moderate ulcerative colitis. They have anti-inflammatory effects and help maintain remission.",
        category: "Gastroenterology",
        subject: "Internal Medicine"
    },
    {
        id: 17,
        questionText: "A 3-year-old child presents with fever, sore throat, and a sandpaper-like rash. What is the most likely diagnosis?",
        options: [
            "Scarlet fever",
            "Kawasaki disease",
            "Roseola",
            "Fifth disease"
        ],
        correctAnswerIndex: 0,
        explanation: "Scarlet fever, caused by group A Streptococcus, presents with fever, sore throat, and a characteristic sandpaper-like rash that typically starts on the chest and spreads.",
        category: "Infectious Disease",
        subject: "Pediatrics"
    },
    {
        id: 18,
        questionText: "Which of the following is a contraindication to thrombolytic therapy in acute MI?",
        options: [
            "Age over 75 years",
            "Previous stroke within 3 months",
            "Diabetes mellitus",
            "Hypertension"
        ],
        correctAnswerIndex: 1,
        explanation: "Previous stroke within 3 months is an absolute contraindication to thrombolytic therapy due to the high risk of intracranial hemorrhage. Age over 75 is a relative contraindication.",
        category: "Cardiology",
        subject: "Emergency Medicine"
    },
    {
        id: 19,
        questionText: "What is the most common cause of nephrotic syndrome in children?",
        options: [
            "Focal segmental glomerulosclerosis",
            "Minimal change disease",
            "Membranous nephropathy",
            "IgA nephropathy"
        ],
        correctAnswerIndex: 1,
        explanation: "Minimal change disease is the most common cause of nephrotic syndrome in children, accounting for about 90% of cases in children under 6 years old. It typically responds well to corticosteroids.",
        category: "Nephrology",
        subject: "Pediatrics"
    },
    {
        id: 20,
        questionText: "A patient with a history of peptic ulcer disease should avoid which class of medications?",
        options: [
            "ACE inhibitors",
            "Beta-blockers",
            "NSAIDs",
            "Calcium channel blockers"
        ],
        correctAnswerIndex: 2,
        explanation: "NSAIDs (non-steroidal anti-inflammatory drugs) should be avoided in patients with peptic ulcer disease as they inhibit COX enzymes, reducing protective prostaglandin production in the gastric mucosa.",
        category: "Gastroenterology",
        subject: "Pharmacology"
    }
];

// Utility functions for question management
class QuestionBank {
    constructor() {
        this.questions = QUESTION_BANK;
    }

    getAllQuestions() {
        return this.questions;
    }

    getQuestionsByCategory(category) {
        if (!category) return this.questions;
        return this.questions.filter(q => q.category === category);
    }

    getQuestionsBySubject(subject) {
        return this.questions.filter(q => q.subject === subject);
    }

    getRandomQuestions(count, category = null) {
        const sourceQuestions = category ? this.getQuestionsByCategory(category) : this.questions;
        const shuffled = [...sourceQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, sourceQuestions.length));
    }

    getQuestionById(id) {
        return this.questions.find(q => q.id === id);
    }

    getAllCategories() {
        const categories = [...new Set(this.questions.map(q => q.category))];
        return categories.sort();
    }

    getAllSubjects() {
        const subjects = [...new Set(this.questions.map(q => q.subject))];
        return subjects.sort();
    }
}

// Global question bank instance
const questionBank = new QuestionBank();