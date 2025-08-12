export interface UserDynamic {
  firstName: string;
  lastName: string;
  email: string;
  day: string;
  month: string;
  year: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  password: string;
}

export interface UserStatic {
  firstName: string;
  lastName: string;
  email: string;
  day: string;
  month: string;
  year: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
