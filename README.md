# USMLE Step 1 Review Tool

A comprehensive iOS flashcard application designed for USMLE Step 1 exam preparation, featuring high-yield questions and intelligent review functionality.

## Features

### 📚 Study Features
- **Flashcard Interface**: Clean, intuitive question-answer format
- **Multiple Question Banks**: 10 high-yield questions across major medical categories
- **Category Filtering**: Study by specific topics (Cardiology, Gastroenterology, Endocrinology, etc.)
- **Customizable Sessions**: Choose 5-25 questions per study session
- **Progress Tracking**: Real-time scoring and completion tracking

### 🎯 Smart Review System
- **Incorrect Question Review**: Automatically tracks wrong answers
- **Review Mode**: Dedicated session for previously missed questions
- **Performance Analytics**: Session-by-session score tracking
- **Core Data Persistence**: Save progress across app sessions

### 🏥 Medical Content
Based on high-yield USMLE Step 1 topics including:
- **Cardiology**: MI diagnosis, ECG interpretation
- **Gastroenterology**: Pancreatitis, liver disease
- **Endocrinology**: Thyroid disorders, diabetes
- **Neurology**: Headache evaluation, CNS disorders
- **Infectious Disease**: Common pathogens and treatments
- **Nephrology**: CKD complications, electrolyte disorders
- **Pharmacology**: Drug mechanisms and interactions
- **Pediatrics**: Common childhood conditions
- **Emergency Medicine**: Acute care protocols

## Technical Architecture

### 🏗️ App Structure
- **SwiftUI** for modern, responsive UI
- **Core Data** for persistent data storage
- **MVVM Architecture** with ObservableObject pattern
- **iOS 17.0+** deployment target

### 📱 Components
- `FlashcardView`: Main study interface
- `QuestionModel`: Data structures and study session logic
- `QuestionBank`: Question repository and filtering
- `PersistenceController`: Core Data management

## App Store Distribution

### Requirements Met
- ✅ iOS Universal app (iPhone + iPad)
- ✅ App Store category: Education
- ✅ Clean bundle identifier: `com.usmle.reviewtool`
- ✅ Proper Info.plist configuration
- ✅ Asset catalog with app icons
- ✅ Launch screen support

### Distribution Steps
1. **Developer Setup**:
   - Enroll in Apple Developer Program ($99/year)
   - Create App Store Connect account

2. **App Preparation**:
   - Add app icons (1024x1024 required)
   - Configure signing certificates
   - Set up provisioning profiles

3. **Upload Process**:
   - Archive build in Xcode
   - Upload via Xcode Organizer or Application Loader
   - Complete App Store Connect metadata

4. **Store Listing**:
   - App description emphasizing educational value
   - Screenshots showing key features
   - Keywords: USMLE, Step 1, medical, flashcards, study

## Installation & Usage

### Development Setup
1. Open `USMLEReviewTool.xcodeproj` in Xcode 15+
2. Select target device/simulator
3. Build and run (⌘+R)

### Study Workflow
1. **Configure Session**: Choose question count and category
2. **Answer Questions**: Tap options to select answers
3. **Review Results**: Read explanations for each question
4. **Track Progress**: Monitor correct/total scores
5. **Review Mistakes**: Use dedicated review mode for incorrect answers

## Future Enhancements

### Content Expansion
- Integration with Mehlman Medical API
- Additional question banks (Step 2, Subject-specific)
- Spaced repetition algorithms
- Custom question import

### Features
- Study streak tracking
- Performance analytics dashboard
- Question difficulty ratings
- Collaborative study features
- Offline content caching

### Platform Expansion
- macOS version
- Apple Watch companion
- Widget support
- Siri Shortcuts integration

## License

Educational use only. Question content inspired by standard USMLE preparation materials.

## Support

For technical issues or feature requests, please contact the development team.