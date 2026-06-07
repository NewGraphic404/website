#!/bin/bash
# سكريبت إعداد Git تلقائياً
# Setup Git Repository Automatically

echo "🚀 بدء إعداد Git Repository..."
echo ""

# 1. Initialize Git
echo "📦 Step 1: Initializing Git..."
git init
echo "✅ Git initialized"
echo ""

# 2. Add all files
echo "📁 Step 2: Adding all files..."
git add .
echo "✅ Files added"
echo ""

# 3. Create initial commit
echo "💾 Step 3: Creating initial commit..."
git commit -m "Initial commit - New Graphic Website"
echo "✅ Initial commit created"
echo ""

# 4. Set main branch
echo "🌿 Step 4: Setting main branch..."
git branch -M main
echo "✅ Main branch set"
echo ""

echo "✨ Git setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create a repository on GitHub"
echo "2. Copy the repository URL"
echo "3. Run: git remote add origin YOUR_REPO_URL"
echo "4. Run: git push -u origin main"
echo ""
echo "Or use the deploy script: ./deploy.sh"
