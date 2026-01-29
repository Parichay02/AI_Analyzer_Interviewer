FROM node:18-alpine

WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# App port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
