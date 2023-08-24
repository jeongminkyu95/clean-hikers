export function throwIfNoData(data, err, message) {
  if (!data) {
    throw new err(message);
  }
}
