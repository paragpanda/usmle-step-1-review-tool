# USMLE Step 1 Review Tool

A comprehensive iOS flashcard application designed for USMLE Step 1 exam preparation, featuring high-yield questions and intelligent review functionality.

## Features

### 📚 Study Features
- **Flashcard Interface**: Clean, intuitive question-answer format
- **Authentic Question Bank**: 114 authentic questions from Mehlman Medical content
- **Category Filtering**: Study by specific topics (Medical Ethics & Communication, Pharmacology, Clinical Medicine, etc.)
- **Category-Based Sessions**: Study all questions from your chosen topic
- **Progress Tracking**: Real-time scoring and completion tracking

### 🎯 Smart Review System
- **Incorrect Question Review**: Automatically tracks wrong answers
- **Review Mode**: Dedicated session for previously missed questions
- **Performance Analytics**: Session-by-session score tracking
- **Core Data Persistence**: Save progress across app sessions

### 🏥 Medical Content
Based on authentic Mehlman Medical high-yield USMLE Step 1 content:
- **Medical Ethics & Communication**: Patient consent, research ethics, communication skills (65 questions)
- **Pharmacology**: Drug mechanisms, pharmacokinetics, bioavailability (22 questions)
- **Clinical Medicine**: Acid-base disorders, infectious diseases, clinical scenarios (21 questions)
- **Research & Statistics**: Study design, epidemiology, research methods (4 questions)
- **Emergency Medicine**: Acute care protocols, anaphylaxis treatment (2 questions)

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
1. **Choose Topic**: Select category or study all topics
2. **Answer Questions**: Tap options to select answers (randomized options eliminate bias)
3. **Review Results**: Read detailed explanations for each question
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