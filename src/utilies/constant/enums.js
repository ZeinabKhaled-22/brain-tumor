export const roles = {
  PATIENT: "patient",
  GUARDIAN: "guardian",
};

export const status = {
  VERIFIED : 'verified',
  PENDING: 'pending'
}

export const gender = {
  MALE: "male",
  FEMALE: "female"
}

export const healthCondition = {
  YES: "yes",
  NO: "no"
}

Object.freeze(roles);
Object.freeze(status)
Object.freeze(gender)
Object.freeze(healthCondition)
