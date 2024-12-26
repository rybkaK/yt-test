# youtube-search

# Run the frontend

npm install to install deps
npm run dev to run the frontend

# Run the backend

npm install to install deps
copy the env.example file and create .env file
npm run start:dev to run the backend

# Linters and prettier

npm run lint at the (client | backend) folder to run lint
npm run format at the (client | backend) folder to run prettier

# Tests

npm run test:watch at the backend folder to run the tests

# Node version 20 was used for development

# Api rate limits

The best idea for handling API rates would be to store frequent requests either in cache or in db, another way is to simply put data in redux store groupped by pages for a specific search query