export class VirtualMachine {
  constructor(config) {
    this.cpu = config.cpu;
    this.ram = config.ram;
    this.storage = config.storage;
    this.os = null;

    this.state = "stopped";
    this.usage = {
      cpu: 0,
      ram: 0,
      storage: 0
    };
  }

  installOS(os) {
    this.os = os;
  }

  start() {
    if (!this.os) throw "No OS installed";
    this.state = "running";

    this.loop = setInterval(() => {
      this.usage.cpu = Math.min(100, Math.random() * this.cpu.ghz * 20);
      this.usage.ram = Math.min(100, Math.random() * this.ram);
      this.usage.storage = Math.rand
