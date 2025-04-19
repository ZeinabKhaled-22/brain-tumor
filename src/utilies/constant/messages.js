const generateMessages = (entity) => ({
  alreadyExist: `${entity} already exist`,
  notFound: `${entity} not found`,
  createdSuccessfully: `${entity} created sucessfully`,
  updatedSucessfully: `${entity} updated successfully`,
  deletedSuccessfully: `${entity} deleted successfully`,
  failToCreate: `${entity} fail to create`,
  failToUpdate: `${entity} fail to update`,
  failToDelete: `${entity} fail to delete`,
});

export const messages = {
  user: {
    ...generateMessages("user"),
    verified: "user verify successfully ",
    invalidCredentials: "invalid credentials",
  },
  userData: generateMessages('userData')
};
