const wrapAsync = async (handler) => {
  try {
    return await handler();
  } catch (error) {
    throw new Error(error);
  }
};

export { wrapAsync };
