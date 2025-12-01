FROM node:20-alpine
RUN npm install -g pm2
WORKDIR /app
COPY build ./
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
EXPOSE 3000
CMD ["pm2-runtime", "start", "index.js"]
