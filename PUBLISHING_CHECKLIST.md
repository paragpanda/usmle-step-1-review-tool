# App Store Publishing Checklist

## Pre-Submission Requirements ✅

### Developer Account Setup
- [ ] **Apple Developer Program Enrollment** ($99/year)
  - Visit: https://developer.apple.com/programs/
  - Complete enrollment with valid payment method
  - Verify identity and organization details

- [ ] **App Store Connect Account**
  - Access at: https://appstoreconnect.apple.com/
  - Agree to latest developer agreements
  - Set up banking and tax information

### Code Signing & Certificates
- [ ] **Development Team ID**
  - Add your Team ID to Xcode project settings
  - Update `DEVELOPMENT_TEAM = ""` in project.pbxproj with your team ID

- [ ] **Distribution Certificate**
  - Create iOS Distribution certificate in Apple Developer portal
  - Download and install in Xcode/Keychain

- [ ] **Provisioning Profile**
  - Create App Store Distribution provisioning profile
  - Include your app's Bundle ID: `com.usmle.reviewtool`
  - Update `PROVISIONING_PROFILE_SPECIFIER = ""` with profile name

### App Icons & Assets ✅
- [x] **App Icon Configuration** - All required sizes configured
- [ ] **Actual Icon Files** - Create and add icon images:
  - 1024x1024 (App Store)
  - 180x180 (iPhone @3x)
  - 120x120 (iPhone @2x)
  - 152x152 (iPad @2x)
  - 76x76 (iPad @1x)
  - And all other required sizes per Contents.json

### App Store Listing ✅
- [x] **App Metadata** - Complete description and keywords ready
- [x] **Privacy Policy** - Created and will need hosting URL
- [ ] **Screenshots** - Create for all required device sizes
- [ ] **App Preview Video** (Optional but recommended)

## Technical Preparation

### Project Configuration ✅
- [x] **Bundle Identifier** - Set to `com.usmle.reviewtool`
- [x] **Version Number** - Set to 1.0
- [x] **Display Name** - "USMLE Step 1 Review"
- [x] **iOS Deployment Target** - 17.0
- [x] **Supported Devices** - iPhone and iPad universal

### Code Quality
- [ ] **Remove Development Code**
  - Remove any test/debug code
  - Disable development logging
  - Remove hardcoded test data if any

- [ ] **Performance Testing**
  - Test on various device sizes
  - Verify smooth scrolling and transitions
  - Check memory usage and performance

- [ ] **Functionality Testing**
  - Test all features thoroughly
  - Verify offline functionality
  - Test edge cases (no questions, completed sessions)

## App Store Guidelines Compliance

### Content Guidelines ✅
- [x] **Educational Content** - Medical education approved
- [x] **Age Rating** - 4+ appropriate for educational content
- [x] **No Objectionable Content** - Clean, professional medical content

### Technical Guidelines ✅
- [x] **Native iOS App** - SwiftUI implementation
- [x] **No Third-party Dependencies** - Uses only iOS frameworks
- [x] **Privacy Compliant** - No data collection, local storage only
- [x] **Accessibility** - SwiftUI provides basic accessibility

## Submission Process

### Final Build Preparation
- [ ] **Archive Build**
  1. Select "Any iOS Device" in Xcode
  2. Product → Archive
  3. Wait for successful archive

- [ ] **Upload to App Store Connect**
  1. In Xcode Organizer, select archive
  2. Click "Distribute App"
  3. Select "App Store Connect"
  4. Upload and wait for processing

### App Store Connect Setup
- [ ] **Create App Record**
  - App name: "USMLE Step 1 Review Tool"
  - Primary language: English
  - Bundle ID: com.usmle.reviewtool
  - SKU: usmle-step1-review-001

- [ ] **App Information**
  - Category: Education
  - Content rights: You own or have licensed all content
  - Age rating: 4+
  - Price: Free

- [ ] **App Store Listing**
  - Upload screenshots for all device types
  - Add app description from AppStoreMetadata.md
  - Set keywords: USMLE, Step 1, medical, flashcards, study
  - Add support URL and privacy policy URL

- [ ] **Version Information**
  - Select uploaded build
  - Add release notes
  - Set release option (automatic/manual)

## Post-Submission

### Review Process
- [ ] **Submit for Review**
  - Review all information one final time
  - Submit app for Apple review
  - Expect 24-48 hour review time

- [ ] **Monitor Status**
  - Check App Store Connect for review status
  - Respond to any reviewer questions promptly
  - Address any rejection reasons if necessary

### Launch Preparation
- [ ] **Marketing Materials**
  - Prepare announcement posts
  - Create social media content
  - Reach out to medical student communities

- [ ] **Support Infrastructure**
  - Set up email for user support
  - Prepare FAQ documentation
  - Plan for user feedback collection

## Common Issues & Solutions

### Code Signing Problems
- **Solution**: Ensure Team ID and provisioning profiles are correctly set
- **Check**: Xcode → Preferences → Accounts → Your Apple ID

### Missing Icons
- **Solution**: Generate all required icon sizes from 1024x1024 master
- **Tools**: Use online icon generators or Xcode asset catalog

### App Store Rejection
- **Common Issues**: Missing privacy policy, incomplete metadata, functionality bugs
- **Solution**: Address specific reviewer feedback and resubmit

## Next Steps After Approval

1. **Monitor Downloads** - Track initial user adoption
2. **Collect Feedback** - Read user reviews and ratings
3. **Plan Updates** - Gather feature requests and improvement ideas
4. **Analytics** - Consider adding basic usage analytics (privacy-compliant)
5. **Marketing** - Promote to target medical student audience

---

## Quick Reference Links

- **Apple Developer Portal**: https://developer.apple.com/
- **App Store Connect**: https://appstoreconnect.apple.com/
- **App Store Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/

**Estimated Timeline**: 2-3 weeks from developer account setup to app approval