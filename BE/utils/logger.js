const logger = (name, value, isError = false) => {
  const message = `[${ name }]: ${ value }`;
  if (isError) {
    console.error(message);
  } else {
    console.log(message);
  }
};
export default logger;