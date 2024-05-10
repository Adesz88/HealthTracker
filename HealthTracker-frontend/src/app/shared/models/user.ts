export interface User {
  _id: string,
  email: string,
  role: number,
  firstName: string,
  lastName: string,
  phone: string,
  birthPlace: string,
  birthDate: Date,
}

export interface UserToLogin {
  email: string,
  password: string
}

export interface NewUser {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  birthPlace: string,
  birthDate: Date,
}

export interface UpdatedUser {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  birthPlace: string,
  birthDate: Date,
  doctorId: string | null,
  //password: string | null
}
