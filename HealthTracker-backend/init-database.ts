import mongoose from "mongoose";
import { DB_URL } from "./constants";
import { User } from "./shared/model/user";
import { Measurement } from "./shared/model/measurement";

const deleteAllData = async () => {
  await Measurement.deleteMany()
}

const insertAllData = async () => {
  const measurements = [
    {
      type: "weight",
      date: new Date(),
      values: [80]
    },
    {
      type: "wdsf",
      date: new Date(),
      values: [100]
    }
  ];

  await Measurement.insertMany(measurements);
}

mongoose.connect(DB_URL).then((_) => {
  console.log("connceted to DB");
  Promise.all([deleteAllData()]).then(_ => {
    Promise.all([insertAllData()]).then(_ => {
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

