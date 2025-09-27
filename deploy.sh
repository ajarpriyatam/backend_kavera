#!/bin/bash

echo "🚀 Starting deployment process..."

# Build frontend
echo "📦 Building frontend..."
cd SoleStyle
npm run build
cd ..

echo "✅ Frontend build complete!"
echo ""
echo "🌐 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway/Render"
echo "3. Deploy frontend to Vercel"
echo "4. Update REACT_APP_API_URL with your backend URL"
echo ""
echo "See DEPLOYMENT.md for detailed instructions"
