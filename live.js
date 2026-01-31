setInterval(() => {
  if (!window.vm || vm.state !== "running") return;

  cpuUse.textContent = vm.usage.cpu.toFixed(1) + "%";
  ramUse.textContent = vm.usage.ram.toFixed(1) + "%";
  diskUse.textContent = vm.usage.storage.toFixed(1) + "%";
}, 500);
