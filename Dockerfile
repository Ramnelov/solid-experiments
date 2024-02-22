# Use Node.js version 18-alpine as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run your app
CMD [ "npm", "run", "dev" ]
