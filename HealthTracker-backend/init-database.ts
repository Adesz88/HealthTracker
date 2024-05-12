import mongoose from "mongoose";
import { DB_URL } from "./constants";
import { User } from "./shared/model/user";
import { Measurement } from "./shared/model/measurement";
import { MeasurementType } from "./shared/model/measurement-type";

const deleteAllData = async () => {
  await Measurement.deleteMany();
  await MeasurementType.deleteMany();
  await User.deleteMany();
}

const insertUsers = async () => {
  const users = [
    {
      _id: "6635333cb2d4302a9e2a90c6",
      email: "jsmith@email.com",
      password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
      role: 0,
      firstName: "John",
      lastName: "Smith",
      phone: "123-456-7890",
      birthPlace: "New York",
      birthDate: "1975-06-15",
      doctorId: null
    },
    {
      _id: "66353b62265d555106776b0c",
      email: "ejones@email.com",
      password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
      role: 0,
      firstName: "Emily",
      lastName: "Jones",
      phone: "987-654-3210",
      birthPlace: "Los Angeles",
      birthDate: "1980-09-25",
      doctorId: null
    },
    {
      _id: "664087a4291f2c3587ffe6b3",
      email: "johnd@email.com",
      password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
      role: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      birthPlace: "New York",
      birthDate: "1985-03-10",
      doctorId: "6635333cb2d4302a9e2a90c6"
    },
    {
      _id: "664087a4291f2c3587ffe6b4",
      email: "ataylor@email.com",
      password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
      role: 1,
      firstName: "Alice",
      lastName: "Taylor",
      phone: "987-654-3210",
      birthPlace: "Los Angeles",
      birthDate: "1992-12-15",
      doctorId: "6635333cb2d4302a9e2a90c6"
    },
    {
      _id: "664087a4291f2c3587ffe6b5",
      email: "sbrown@email.com",
      password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
      role: 1,
      firstName: "Sarah",
      lastName: "Brown",
      phone: "555-555-5555",
      birthPlace: "Chicago",
      birthDate: "1970-12-05",
      doctorId: "66353b62265d555106776b0c"
    }
  ]

  await User.insertMany(users);
}

const insertMeasurementTypes = async () => {
  const measurement_types = [
    {
      _id: "66408668efd4906637aa2a73",
      name: "Blood pressure",
      values: ["Systolic", "Diastolic"]
    },
    {
      _id: "66408668efd4906637aa2a74",
      name: "Weight",
      values: ["kg"]
    },
    {
      _id: "66408668efd4906637aa2a75",
      name: "Heart rate",
      values: ["bpm"]
    },
    {
      _id: "66408668efd4906637aa2a76",
      name: "Blood sugar",
      values: ["mmol/L"]
    }
  ];

  await MeasurementType.insertMany(measurement_types);
}

const insertMeasurements = async () => {
  const measurements = [
    {
      _id: "664087a4291f2c3587ffe6ba",
      type: "66408668efd4906637aa2a74",
      date: new Date("2024-05-11"),
      values: [90.72],
      comment: "Weight measured after completing a marathon.",
      user: "664087a4291f2c3587ffe6b3"
    },
    {
      _id: "664087a4291f2c3587ffe6bb",
      type: "66408668efd4906637aa2a74",
      date: new Date(),
      values: [68.4],
      comment: "Weight recorded after following a strict diet for three months.",
      user: "664087a4291f2c3587ffe6b4"
    },
    {
      _id: "664087a4291f2c3587ffe6bc",
      type: "66408668efd4906637aa2a73",
      date: new Date(),
      values: [120, 80],
      comment: "Measured after resting for 10 minutes.",
      user: "664087a4291f2c3587ffe6b3"
    },
    {
      _id: "664087a4291f2c3587ffe6bd",
      type: "66408668efd4906637aa2a73",
      date: new Date(),
      values: [140, 90],
      comment: "Measured after a stressful day at work.",
      user: "664087a4291f2c3587ffe6b4"
    }
  ];

  await Measurement.insertMany(measurements);
}

mongoose.connect(DB_URL).then((_) => {
  console.log("connceted to DB");
  Promise.all([deleteAllData()]).then(_ => {
    Promise.all([insertUsers(), insertMeasurementTypes(), insertMeasurements()]).then(_ => {
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

