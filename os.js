export function createOS(name, version, kernel) {
  return {
    osName: name,
    version,
    kernel,
    encrypted: true
  };
}
