import * as zod from "zod"

export const loginSchema = zod.object({

  accessToken: zod.string(),
  refreshToken: zod.string(),
  id: zod.number(),
  username: zod.string(),
  email: zod.email(),
  firstName: zod.string(),
  lastName: zod.string(),
  gender: zod.string(),
  image: zod.url()
})



export const getUserSchema = zod.object({
  id: zod.number(),
  firstName: zod.string(),
  lastName: zod.string(),
  maidenName: zod.string(),
  age: zod.number(),
  gender: zod.string(),
  email: zod.email(),
  phone: zod.string(),
  username: zod.string(),
  password: zod.string(),
  birthDate: zod.string(),
  image: zod.url(),
  bloodGroup: zod.string(),
  height: zod.number(),
  weight: zod.number(),
  eyeColor: zod.string(),
  hair: zod.object({ color: zod.string(), type: zod.string() }),
  ip: zod.ipv4(),
  address: zod.object({
    address: zod.string(),
    city: zod.string(),
    state: zod.string(),
    stateCode: zod.string(),
    postalCode: zod.string(),
    coordinates: zod.object({ lat: zod.number(), lng: zod.number() }),
    country: zod.string()
  }),
  macAddress: zod.mac(),
  university: zod.string(),
  bank: zod.object({
    cardExpire: zod.string(),
    cardNumber: zod.string(),
    cardType: zod.string(),
    currency: zod.string(),
    iban: zod.string()
  }),
  company: zod.object({
    department: zod.string(),
    name: zod.string(),
    title: zod.string(),
    address: zod.object({
      address: zod.string(),
      city: zod.string(),
      state: zod.string(),
      stateCode: zod.string(),
      postalCode: zod.string(),
      coordinates: zod.object(),
      country: zod.string()
    })
  }),
  ein: zod.string(),
  ssn: zod.string(),
  userAgent: zod.string(),
  crypto: zod.object({
    coin: zod.string(),
    wallet: zod.string(),
    network: zod.string()
  }),
  role: zod.string()
})


export const refreshTokenSchema = zod.object({


  refreshToken: zod.string(),
  accessToken: zod.string()
})