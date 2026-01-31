setInterval(() => {
  if (!window.vm || vm.state !== "running") return;

  cpuUse.textContent = vm.usage.cpu.toFixed(1) + "%";
  ramUse.textContent = vm.usage.ram.toFixed(1) + "%";
  diskUse.textContent = vm.usage.storage.toFixed(1) + "%";
}, 500);

export async function importVMF(file) {
  const text = await file.text();
  const encrypted = JSON.parse(text);
  return await decryptObject(encrypted);
}
