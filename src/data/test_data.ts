//import { UserDynamic, UserStatic, LoginUser } from '../types/user.ts';
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

const generateRandomEmail = (): string => {
  return `testuser${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
};

export const testData: {
  userDynamic: UserDynamic;
  userStatic: UserStatic;
  loginUser: LoginUser;
} = {
  userDynamic: {
    firstName: 'Test',
    lastName: 'User',
    day: '4',
    month: '5',
    year: '1995',
    address: 'Franka',
    zipcode: '37500',
    city: 'Lviv',
    state: 'Lviv',
    country: 'Australia',
    mobileNumber: '380930055027',
    email: generateRandomEmail(),
    password: 'Strong#Password#123',
  },

  userStatic: {
    firstName: 'Test',
    lastName: 'User',
    day: '4',
    month: '5',
    year: '1995',
    address: 'Franka',
    zipcode: '37500',
    city: 'Lviv',
    state: 'Lviv',
    country: 'Australia',
    mobileNumber: '380930055027',
    email: 'testuser86@example.com',
    password: 'Strong#Password#123',
  },

  loginUser: {
    email: 'testuser86@example.com',
    password: 'Strong#Password#123',
  },
};

//export { UserDynamic, UserStatic, LoginUser };
