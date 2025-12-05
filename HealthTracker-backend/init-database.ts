import mongoose from "mongoose";
import { DB_URL } from "./constants";
import { User } from "./shared/model/user";
import { Measurement } from "./shared/model/measurement";
import { MeasurementType } from "./shared/model/measurement-type";
import { measurement_types, measurements, notifications, users } from "./datas";
import { Notification } from "./shared/model/notification";

const deleteAllData = async () => {
  await Measurement.deleteMany();
  await MeasurementType.deleteMany();
  await User.deleteMany();
  await Notification.deleteMany();
}

const insertUsers = async () => {
  await User.insertMany(users);
}

const insertMeasurementTypes = async () => {
  await MeasurementType.insertMany(measurement_types);
}

const insertMeasurements = async () => {
  await Measurement.insertMany(measurements);
}

const insertNotifications = async () => {
  await Notification.insertMany(notifications);
}

mongoose.connect(DB_URL).then((_) => {
  console.log("Connected to DB");
  Promise.all([deleteAllData()]).then(_ => {
    Promise.all([insertUsers(), insertMeasurementTypes(), insertMeasurements(), insertNotifications()]).then(_ => {
      console.log("Database initialised");
      process.exit();
    }).catch(error => {
      console.log(error);
    });
  }).catch(error => {
    console.log(error);
  });
}).catch(error => {
  console.log(error);
  return;
});

