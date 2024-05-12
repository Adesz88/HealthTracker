const dates: Date[] = [new Date(), new Date(), new Date()];
dates[0].setDate(dates[0].getDate() - 2);
dates[1].setDate(dates[1].getDate() - 1);

const setTime = (date: Date, hours: number, minutes: number) => {
  const result = new Date(date);
  result.setHours(hours, minutes);
  return result;
}

export  const users = [
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
    _id: "66353b62265d555106776b0d",
    email: "mclark@email.com",
    password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
    role: 0,
    firstName: "Matthew",
    lastName: "Clark",
    phone: "555-123-4567",
    birthPlace: "Oakland",
    birthDate: "1988-03-15",
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
    doctorId: "6635333cb2d4302a9e2a90c6"
  },
  {
    _id: "664087a4291f2c3587ffe6b6",
    email: "spatel@email.com",
    password: "$2b$10$5gMNnXxM/PsyCOYElND5zOF9Ori2n1VWTpiSLhGHimoZrZlmFUP3O",
    role: 1,
    firstName: "Sophia",
    lastName: "Patel",
    phone: "537-827-2618",
    birthPlace: "San Francisco",
    birthDate: "1990-10-17",
    doctorId: "66353b62265d555106776b0c"
  }
];

export const measurement_types = [
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

export const measurements = [
  {
    _id: "664087a4291f2c3587ffe6ba",
    type: "66408668efd4906637aa2a75",
    date: setTime(dates[0], 10, 10),
    values: [70],
    comment: "Heart rate measured in the morning before breakfast.",
    user: "664087a4291f2c3587ffe6b6"
  },
  {
    _id: "664087a4291f2c3587ffe6bb",
    type: "66408668efd4906637aa2a74",
    date: setTime(dates[0], 12, 30),
    values: [90.72],
    comment: "Weight measured after completing a marathon.",
    user: "664087a4291f2c3587ffe6b3"
  },

  {
    _id: "664087a4291f2c3587ffe6bc",
    type: "66408668efd4906637aa2a74",
    date: setTime(dates[1], 11, 50),
    values: [68.4],
    comment: "Weight recorded after following a strict diet for three months.",
    user: "664087a4291f2c3587ffe6b4"
  },
  {
    _id: "664087a4291f2c3587ffe6bd",
    type: "66408668efd4906637aa2a73",
    date: setTime(dates[1], 17, 34),
    values: [120, 80],
    comment: "Measured after resting for 10 minutes.",
    user: "664087a4291f2c3587ffe6b5"
  },

  {
    _id: "664087a4291f2c3587ffe6be",
    type: "66408668efd4906637aa2a73",
    date: setTime(dates[2], 10, 53),
    values: [140, 90],
    comment: "Measured after a stressful morning.",
    user: "664087a4291f2c3587ffe6b4"
  },
  {
    _id: "664087a4291f2c3587ffe6bf",
    type: "66408668efd4906637aa2a75",
    date: setTime(dates[2], 11, 20),
    values: [80],
    comment: "",
    user: "664087a4291f2c3587ffe6b5"
  },
  {
    _id: "664087a4291f2c3587ffe6ca",
    type: "66408668efd4906637aa2a76",
    date: setTime(dates[2], 12, 30),
    values: [110],
    comment: "Measured after a light meal.",
    user: "664087a4291f2c3587ffe6b3"
  },
  {
    _id: "664087a4291f2c3587ffe6cb",
    type: "66408668efd4906637aa2a75",
    date: setTime(dates[2], 12, 41),
    values: [120, 75],
    comment: "",
    user: "664087a4291f2c3587ffe6b4"
  },
  {
    _id: "664087a4291f2c3587ffe6cd",
    type: "66408668efd4906637aa2a75",
    date: setTime(dates[2], 12, 56),
    values: [110],
    comment: "Measured after climbing stairs.",
    user: "664087a4291f2c3587ffe6b3"
  }
];

export const notifications = [
  {
    _id: "6640dbb133410ac7bb994062",
    message: "John Doe uploaded a new hearth rate measurement.",
    date: setTime(dates[2], 12, 56),
    user: "6635333cb2d4302a9e2a90c6"
  },
  {
    _id: "6640dbb133410ac7bb994063",
    message: "Alice Taylor uploaded a new hearth rate measurement.",
    date: setTime(dates[2], 12, 41),
    user: "6635333cb2d4302a9e2a90c6"
  },
  {
    _id: "6640dbb133410ac7bb994064",
    message: "John Doe uploaded a new blood sugar measurement.",
    date: setTime(dates[2], 12, 30),
    user: "6635333cb2d4302a9e2a90c6"
  }
];
