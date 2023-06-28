# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]