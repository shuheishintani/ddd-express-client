export const wait = (sec: number) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
};
