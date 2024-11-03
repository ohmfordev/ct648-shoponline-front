# Use the official Bun image
FROM oven/bun:1

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY bun.lockb package.json ./
RUN bun install

# Copy the rest of the application files
COPY . .

# Expose the application port (assumed to be 3000 for Next.js)
EXPOSE 3000

# Run the app in development mode
CMD ["bun", "run", "dev"]
