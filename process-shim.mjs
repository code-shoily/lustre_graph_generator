export function exit(status) {
  console.warn(`process.exit(${status}) called in browser environment - ignoring`);
}
