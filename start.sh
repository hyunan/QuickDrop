echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building frontend..."
npm run build

cd ..

echo "Starting the server..."
python run.py