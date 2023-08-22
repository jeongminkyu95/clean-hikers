export function throwIfNoData(data, err) {
  if (!data) {
    throw new err();
  }
}
