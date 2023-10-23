export function throwErrorIfDataExists(data, err, message) {
  if (data) {
    throw new err(message);
  }
}
