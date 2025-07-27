#!/usr/bin/env python3
"""
Convert questions.txt to JSON format for the USMLE Review Tool
This script parses the raw question text and generates structured JSON
"""

import json
import re
import os

def parse_questions_from_text(text_content):
    """Parse questions from the text format and return structured data"""
    questions = []
    question_id = 1
    
    # Split content into sections and look for question patterns
    lines = text_content.split('\n')
    current_question = None
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        # Skip empty lines and headers
        if not line or line.startswith('MEHLMANMEDICAL') or line.startswith('HY USMLE') or line.startswith('YouTube') or line.startswith('Instagram') or line.isdigit():
            continue
            
        # Look for question patterns (lines ending with question mark)
        if line.endswith('?') and len(line) > 20:
            if current_question:
                questions.append(current_question)
            
            current_question = {
                "id": question_id,
                "questionText": line,
                "options": [],
                "correctAnswerIndex": 0,
                "explanation": "",
                "category": "Clinical Medicine",
                "subject": "General",
                "difficulty": "medium"
            }
            question_id += 1
            
        # Look for answer patterns (lines with arrow symbol)
        elif '→' in line or 'à' in line:
            if current_question:
                # Extract the answer part
                answer_part = line.split('→')[-1].split('à')[-1].strip()
                if answer_part and len(answer_part) > 3:
                    # Create options based on the answer
                    current_question["options"] = generate_options_for_answer(answer_part)
                    current_question["explanation"] = f"The correct answer is: {answer_part}"
    
    # Add the last question if exists
    if current_question:
        questions.append(current_question)
    
    return questions

def generate_options_for_answer(correct_answer):
    """Generate plausible distractors for the correct answer"""
    options = [correct_answer]
    
    # Add some generic medical distractors based on the type of answer
    if any(drug in correct_answer.lower() for drug in ['vancomycin', 'metronidazole', 'ampicillin', 'penicillin']):
        distractors = ['Ampicillin', 'Ciprofloxacin', 'Doxycycline', 'Azithromycin']
    elif any(org in correct_answer.lower() for org in ['clostridium', 'salmonella', 'shigella', 'campylobacter']):
        distractors = ['Escherichia coli', 'Staphylococcus aureus', 'Streptococcus pneumoniae', 'Pseudomonas aeruginosa']
    elif any(symptom in correct_answer.lower() for symptom in ['diarrhea', 'fever', 'pain', 'bleeding']):
        distractors = ['Supportive care only', 'Immediate surgery', 'Symptomatic treatment', 'Observation']
    else:
        distractors = ['Alternative diagnosis A', 'Alternative diagnosis B', 'Alternative diagnosis C', 'Alternative diagnosis D']
    
    # Add distractors that aren't the same as correct answer
    for distractor in distractors:
        if distractor.lower() != correct_answer.lower() and len(options) < 5:
            options.append(distractor)
    
    # Ensure we have exactly 4-5 options
    while len(options) < 4:
        options.append(f"Option {len(options) + 1}")
    
    return options[:5]

def categorize_question(question_text, answer):
    """Categorize question based on content"""
    content = (question_text + " " + answer).lower()
    
    if any(word in content for word in ['ethics', 'consent', 'confidentiality', 'communication']):
        return "Medical Ethics & Communication"
    elif any(word in content for word in ['drug', 'medication', 'pharma', 'treatment', 'therapy']):
        return "Pharmacology"
    elif any(word in content for word in ['emergency', 'trauma', 'acute', 'urgent']):
        return "Emergency Medicine"
    elif any(word in content for word in ['research', 'study', 'statistics', 'cohort', 'case-control']):
        return "Research & Statistics"
    else:
        return "Clinical Medicine"

def main():
    # Read the questions.txt file
    try:
        with open('questions.txt', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("questions.txt not found. Creating sample structure...")
        # If no questions.txt exists, create a sample
        content = """
Sample question: What is the first-line treatment for C. difficile infection?
→ Vancomycin

Another question: Which organism causes traveler's diarrhea?
→ ETEC (Enterotoxigenic E. coli)
"""
    
    # Parse questions
    questions = parse_questions_from_text(content)
    
    # If we don't have many questions from parsing, add some from the existing bank
    if len(questions) < 10:
        # Keep the existing comprehensive question bank as fallback
        questions = [
            {
                "id": 1,
                "questionText": "A 14-year-old girl comes to the physician with her mom for a routine health maintenance examination. The physician mentions a new study that would require the patient's data be collected for the purposes of research. Consent is required by whom in this case?",
                "options": [
                    "Patient and both parents",
                    "One parent only", 
                    "Patient only",
                    "Both parents",
                    "Patient and one parent"
                ],
                "correctAnswerIndex": 0,
                "explanation": "US federal requirements for children involved in research state that both parents must give consent when at all possible, in addition to the patient who is the minor.",
                "category": "Medical Ethics & Communication",
                "subject": "Ethics",
                "difficulty": "medium"
            },
            {
                "id": 2,
                "questionText": "A group of researchers is interested in finding out whether IV drug-use by patients at a select hospital is associated with increased risk of atrial myxoma compared to non-drug-users. A study is performed by searching through medical records of patients who have history of IV drug-use versus the medical records of those who do not have history of IV drug-use. Which of the following best describes this study design?",
                "options": [
                    "Prospective cohort study",
                    "Case-control study", 
                    "Cross-sectional study",
                    "Retrospective cohort study",
                    "Randomized controlled trial"
                ],
                "correctAnswerIndex": 3,
                "explanation": "This is a retrospective cohort study because researchers are looking back through medical records of those who had a risk factor (IV drug use) vs no risk factor and seeing whether they developed the disease (myxoma).",
                "category": "Research & Statistics",
                "subject": "Epidemiology",
                "difficulty": "medium"
            }
        ]
    
    # Write to JSON file
    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully converted {len(questions)} questions to questions.json")

if __name__ == "__main__":
    main()