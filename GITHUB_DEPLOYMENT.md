# GitHub Pages Deployment Instructions

## 🚀 Step-by-Step GitHub Pages Setup

Your project is now ready for GitHub Pages deployment! Follow these steps to get your USMLE Review Tool live on the web.

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**

### Step 2: Repository Configuration

**Repository Settings:**
- **Repository name**: `usmle-review-tool` (or any name you prefer)
- **Description**: `USMLE Step 1 Review Tool - Progressive Web App for medical exam preparation`
- **Visibility**: Choose **Public** (required for free GitHub Pages)
- **Initialize**: Leave unchecked (we already have files)

**Click "Create repository"**

### Step 3: Connect Local Repository to GitHub

Copy the commands GitHub shows you after creating the repository, or use these with your repository URL:

```bash
# Set your remote repository (replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/usmle-review-tool.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub.com
2. **Click the "Settings" tab** (far right in the repository navigation)
3. **Scroll down to "Pages"** in the left sidebar
4. **Under "Source"**, select **"Deploy from a branch"**
5. **Choose branch**: **main**
6. **Choose folder**: **/ (root)**
7. **Click "Save"**

### Step 5: Access Your Live App

After 5-10 minutes, your app will be live at:
```
https://YOUR_USERNAME.github.io/usmle-review-tool
```

GitHub will show you the exact URL in the Pages settings.

## 📱 Testing Your Deployed App

### On iPhone/iPad:
1. Open Safari and visit your GitHub Pages URL
2. Tap the Share button 
3. Select "Add to Home Screen"
4. Your app will install like a native app!

### On Desktop:
1. Visit the URL in Chrome or Edge
2. Look for the install icon in the address bar
3. Click to install as a desktop app

## 🔧 Making Updates

To update your app after deployment:

```bash
# Make your changes to the files
# Then commit and push:
git add .
git commit -m "Update: describe your changes"
git push origin main
```

Changes will be live within a few minutes!

## 🌐 Custom Domain (Optional)

To use your own domain instead of GitHub Pages URL:

1. **Buy a domain** from any registrar
2. **In your repository**, go to Settings → Pages
3. **Add your domain** in the "Custom domain" field
4. **Create a CNAME file** in your repository with your domain
5. **Configure DNS** at your domain registrar to point to GitHub Pages

## 📊 Analytics Setup (Optional)

Add Google Analytics to track usage:

1. **Create Google Analytics account**
2. **Get your tracking ID**
3. **Add tracking code** to `index.html`:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Sharing Your App

Once live, share your app with:
- **Medical students** in study groups
- **Social media** with screenshots
- **QR codes** for easy mobile access
- **Medical forums** and communities

## 🐛 Troubleshooting

### Common Issues:

**Pages not showing up:**
- Check that repository is public
- Verify main branch is selected in Pages settings
- Wait 10-15 minutes for initial deployment

**PWA features not working:**
- Ensure you're accessing via HTTPS (GitHub Pages provides this)
- Test on mobile devices for best PWA experience
- Check browser console for any errors

**App not updating:**
- Clear browser cache
- Check that your changes were pushed to GitHub
- Verify commit appears in repository

## 📈 Next Steps

### Promote Your App:
1. **Create social media accounts** for your app
2. **Share on medical student forums** (Reddit, Student Doctor Network)
3. **Create TikTok/Instagram content** showing the app in use
4. **Reach out to medical education influencers**

### Enhance Features:
1. **Add more questions** by editing `questions.js`
2. **Create new categories** for different medical specialties
3. **Implement user accounts** for progress sync
4. **Add spaced repetition algorithms**

### Monitor Success:
1. **Track GitHub repository stars** and forks
2. **Monitor web analytics** for user engagement
3. **Collect feedback** via GitHub Issues
4. **Update content** based on user requests

## 🎉 Congratulations!

Your USMLE Review Tool is now live and accessible to medical students worldwide - no App Store required!

**Your live URL will be:**
`https://YOUR_USERNAME.github.io/usmle-review-tool`

Share this URL and help medical students succeed on their USMLE Step 1 exams!