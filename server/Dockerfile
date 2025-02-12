FROM node:22.11.0-alpine

WORKDIR /app/server

# Copy only package.json to leverage caching
COPY package.json . 

# Run npm install
RUN npm install

# Copy the rest of the files
COPY . . 

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "--experimental-json-modules", "src/index.js"]
