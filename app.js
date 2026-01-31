import { encryptObject } from "./crypto.js";

async function createMachine() {
  const machine = {
    cpu: {
      brand: "MyOwnCPU",
      model: "X-1",
      ghz: 4.8
    },
    ram: 16,
    activeComponent: "CPU"
  };

  const enc = await encryptObject(machine);

  location.hash =
    `data=${enc.data}&iv=${enc.iv}&key=${enc.key}`;
}
