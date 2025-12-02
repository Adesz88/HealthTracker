FROM node:20-alpine

RUN npm install -g pm2

# Install Zabbix Agent
RUN apk add --no-cache \
    pcre \
    zabbix-agent2
# Configure Zabbix Agent
COPY zabbix_agent2.conf /etc/zabbix/zabbix_agent2.conf

WORKDIR /app
COPY build ./
COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000

CMD ["pm2-runtime", "start", "index.js"]
