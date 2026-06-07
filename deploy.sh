#!/bin/bash
# سكريبت النشر السريع
# Quick Deploy Script

echo ""
echo "================================"
echo "  New Graphic Website Deploy"
echo "================================"
echo ""

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "❌ ERROR: Git is not initialized!"
    echo "Please run ./setup-git.sh first"
    exit 1
fi

# Get commit message
read -p "Enter commit message (or press Enter for default): " message
if [ -z "$message" ]; then
    message="Update website"
fi

echo ""
echo "[1/3] Adding changes..."
git add .
echo "✅ Done!"
echo ""

echo "[2/3] Creating commit..."
git commit -m "$message"
if [ $? -ne 0 ]; then
    echo "ℹ️  No changes to commit"
    exit 0
fi
echo "✅ Done!"
echo ""

echo "[3/3] Pushing to GitHub..."
git push
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERROR: Push failed!"
    echo ""
    echo "Possible reasons:"
    echo "1. Remote repository not set"
    echo "2. Authentication required"
    echo "3. No internet connection"
    echo ""
    echo "To set remote: git remote add origin YOUR_REPO_URL"
    echo "To push first time: git push -u origin main"
    exit 1
fi
echo "✅ Done!"
echo ""

echo "================================"
echo "  Deploy Complete!"
echo "================================"
echo ""
echo "✨ Your website will be updated automatically on Netlify/Vercel"
echo "(if auto-deploy is configured)"
echo ""
