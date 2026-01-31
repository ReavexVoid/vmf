import { VirtualMachine } from "./machine.js";
import { exportVMF, importVMF } from "./vmf.js";

let vm;

document.getElementById("addCPU").onclick = () => {
  vmConfig.cpu = {
    brand: cpuBrand.value,
    model: cpuModel.value,
    ghz: Number(cpuGHz.value)
  };
};

document.getElementById("addRAM").onclick = () => {
  vmConfig.ram = Number(ram.value);
};

document.getElementById("build").onclick = () => {
  vm = new VirtualMachine(vmConfig);
  status.textContent = "Machine built";
};

document.getElementById("start").onclick = () => {
  vm.installOS({ name: "ForgeOS" });
  vm.start();
};
