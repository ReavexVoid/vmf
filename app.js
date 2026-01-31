import { encryptObject, decryptFromHash } from "./crypto.js";

document.getElementById("build").onclick = async () => {
  const machine = {
    cpu: {
      brand: cpuBrand.value,
      model: cpuModel.value,
      ghz: cpuGHz.value
    },
    ram: ram.value,
    activeComponent: "CPU"
  };

  const hash = await encryptObject(machine);
  location.hash = hash;
  output.value = hash;
};

window.onload = async () => {
  const data = await decryptFromHash();
  if (data) {
    output.value = JSON.stringify(data, null, 2);
  }
};
