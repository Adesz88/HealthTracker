#!/bin/sh
# Start rsyslog
#rsyslogd

#Start Zabbix Agent 2
/usr/sbin/zabbix_agent2 &

# Start your app with PM2
pm2-runtime start index.js #--output /var/log/pm2/out.log --error /var/log/pm2/error.log
