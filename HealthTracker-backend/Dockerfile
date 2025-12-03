FROM node:20-alpine

RUN npm install -g pm2

# Install Zabbix Agent
RUN apk add --no-cache \
    pcre \
    zabbix-agent2
# Configure Zabbix Agent
COPY zabbix_agent2.conf /etc/zabbix/zabbix_agent2.conf

# Install rsyslog
RUN apk add --no-cache rsyslog
# Create rsyslog config
COPY rsyslog.conf /etc/rsyslog.conf

RUN mkdir -p /var/log/pm2
# Configure PM2 to use syslog
ENV PM2_SYSLOG=true

WORKDIR /app
COPY build ./
COPY package*.json ./
COPY start.sh ./

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000

RUN chmod +x start.sh

CMD ["./start.sh"]
