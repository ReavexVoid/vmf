export function createOS(name, kernel) {
  return {
    osName: name,
    kernel,
    encrypted: true
  };
}
