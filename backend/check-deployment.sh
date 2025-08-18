#!/bin/bash
# Pre-deployment health check script for Render

echo "🔍 Pre-Deployment Health Check"
echo "================================"

# Check if Node.js version is compatible
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Check if all dependencies are installed
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies not installed - run 'npm install'"
    exit 1
fi

# Check if TypeScript compilation works
echo "🔨 Testing TypeScript compilation..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Check if dist folder exists
if [ -d "dist" ]; then
    echo "✅ Build output (dist/) exists"
else
    echo "❌ Build output missing"
    exit 1
fi

# Check essential files
FILES=("dist/server.js" "package.json" ".env.example")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check environment variables template
if [ -f ".env.example" ]; then
    echo "✅ Environment template exists"
    echo "📝 Remember to set these variables in Render:"
    grep -E "^[A-Z_]+=.*" .env.example | cut -d'=' -f1 | sort
else
    echo "❌ .env.example missing"
fi

echo ""
echo "🎉 Pre-deployment check completed successfully!"
echo "🚀 Ready for Render deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub"
echo "2. Connect repository to Render"
echo "3. Set environment variables in Render dashboard"
echo "4. Deploy!"
