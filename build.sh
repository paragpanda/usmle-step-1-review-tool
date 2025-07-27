#!/bin/bash
# Build script for USMLE Review Tool

echo "🔨 Building USMLE Review Tool..."

# Convert questions.txt to questions.json
echo "📚 Converting questions..."
python3 scripts/convert-questions.py

# Verify files exist
if [ ! -f "questions.json" ]; then
    echo "❌ Error: questions.json not generated"
    exit 1
fi

if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found"
    exit 1
fi

echo "✅ Build complete!"
echo "📁 Files ready for deployment:"
echo "   - index.html"
echo "   - app.js"
echo "   - styles.css"
echo "   - questions.json"
echo "   - unified-question-bank.js (fallback)"

# Count questions
question_count=$(grep -o '"id"' questions.json | wc -l)
echo "📊 $question_count questions loaded"