export const toErrorString = (error: string | Error) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return error;
  }
};
