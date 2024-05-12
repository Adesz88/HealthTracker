# HealthTracker
A docker elindításához szükséges parancsok:
- ```BUILD: sudo docker build -t health_tracker_database .```
- ```RUN: sudo docker run -p 6000:27017 -it --name health_tracker_database -d health_tracker_database```
  
</br>
Backend használata:

- fordítás: ```npm run build```
- adatbázis feltöltése: ```npm run init-database```
- indítás: ```npm run start```
