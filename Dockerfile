FROM nginx:stable
EXPOSE 80
COPY HealthTracker-frontend/dist/health-tracker-frontend/browser /usr/share/nginx/html

