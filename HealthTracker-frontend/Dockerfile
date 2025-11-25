FROM nginx:stable
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/health-tracker-frontend/browser  /usr/share/nginx/html
EXPOSE 80
