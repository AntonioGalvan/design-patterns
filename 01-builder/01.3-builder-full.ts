namespace BuilderFull {
    class Computer {
        public cpu: string = "not defined";
        public ram: string = "not defined";
        public storage: string = "not defined";
        public gpu?: string;
        public rgb?: string;
        public mouse?: string;
        public keyboard?: string;

        displayInfo() {
            console.log(`Configuración de la computadora:
            CPU: ${this.cpu}
            RAM: ${this.ram}
            Storage: ${this.storage}
            GPU: ${this.gpu ?? "not included"}
            RGB: ${this.rgb ?? "not included"}
            Mouse: ${this.mouse ?? "not included"}
            Keyboard: ${this.keyboard ?? "not included"}
        `);
        }
    }

    // Builder interface
    interface ComputerBuilder {
        reset(): ComputerBuilder;
        setCPU(cpu: string): ComputerBuilder;
        setRAM(ram: string): ComputerBuilder;
        setStorage(storage: string): ComputerBuilder;
        setGPU(gpu: string): ComputerBuilder;
        setRGB(rgb: string): ComputerBuilder;
        setMouse(mouse: string): ComputerBuilder;
        setKeyboard(keyboard: string): ComputerBuilder;
        build(): Computer;
    }

    class GamingComputerBuilder implements ComputerBuilder {
        private computer: Computer;

        constructor() {
            this.computer = new Computer();
        }

        reset(): GamingComputerBuilder {
            this.computer = new Computer();
            return this;
        }

        setCPU(cpu: string): GamingComputerBuilder {
            this.computer.cpu = `${cpu} (OC Edition)`;
            return this;
        }

        setRAM(ram: string): GamingComputerBuilder {
            this.computer.ram = `${ram} DDR5 RGB`;
            return this;
        }

        setStorage(storage: string): GamingComputerBuilder {
            this.computer.storage = storage;
            return this;
        }

        setGPU(gpu: string): GamingComputerBuilder {
            this.computer.gpu = gpu;
            return this;
        }

        setRGB(rgb: string): GamingComputerBuilder {
            this.computer.rgb = rgb;
            return this;
        }

        setMouse(mouse: string): GamingComputerBuilder {
            this.computer.mouse = mouse;
            return this;
        }

        setKeyboard(keyboard: string): GamingComputerBuilder {
            this.computer.keyboard = keyboard;
            return this;
        }

        build(): Computer {
            if (!this.computer.gpu) {
                this.computer.gpu = "NVIDIA RTX 4060 (default gamer)";
            }
            if (!this.computer.rgb) {
                this.computer.rgb = "RGB Enabled (default)";
            }

            const result = this.computer;
            this.reset();
            return result;
        }
    }

    class OfficeComputerBuilder implements ComputerBuilder {
        private computer: Computer;

        constructor() {
            this.computer = new Computer();
        }

        reset(): OfficeComputerBuilder {
            this.computer = new Computer();
            return this;
        }

        setCPU(cpu: string): OfficeComputerBuilder {
            this.computer.cpu = cpu;
            return this;
        }

        setRAM(ram: string): OfficeComputerBuilder {
            this.computer.ram = ram;
            return this;
        }

        setStorage(storage: string): OfficeComputerBuilder {
            this.computer.storage = storage;
            return this;
        }

        setGPU(_gpu: string): OfficeComputerBuilder {
            console.log("Office build: GPU dedicada ignorada, se usa integrada");
            return this;
        }

        setRGB(_rgb: string): OfficeComputerBuilder {
            console.log(" Office build: RGB ignorado");
            return this;
        }

        setMouse(mouse: string): OfficeComputerBuilder {
            this.computer.mouse = mouse;
            return this;
        }

        setKeyboard(keyboard: string): OfficeComputerBuilder {
            this.computer.keyboard = keyboard;
            return this;
        }

        build(): Computer {
            if (!this.computer.mouse) {
                this.computer.mouse = "Mouse genérico USB";
            }
            if (!this.computer.keyboard) {
                this.computer.keyboard = "Teclado genérico USB";
            }
            
            const result = this.computer;
            this.reset();
            return result;
        }
    }

    // Director
    class ComputerStore {
        private builder: ComputerBuilder;

        constructor(builder: ComputerBuilder) {
            this.builder = builder;
        }

        changeBuilder(builder: ComputerBuilder): void {
            this.builder = builder;
        }

        buildBasicSetup(): Computer {
            return this.builder
                .reset()
                .setCPU("Intel Core i5")
                .setRAM("8GB")
                .setStorage("256GB SSD")
                .build();
        }

        buildFullSetup(): Computer {
            return this.builder
                .reset()
                .setCPU("AMD Ryzen 9")
                .setRAM("32GB")
                .setStorage("1TB NVMe SSD")
                .setGPU("NVIDIA RTX 4090")
                .setRGB("Full RGB")
                .setMouse("Razer DeathAdder")
                .setKeyboard("Corsair K95")
                .build();
        }
    }

    // Cliente
    function main() {
        const gamingBuilder = new GamingComputerBuilder();
        const officeBuilder = new OfficeComputerBuilder();
        const store = new ComputerStore(gamingBuilder);

        console.log("=== Full Setup con Gaming Builder ===");
        const fullGamer = store.buildFullSetup();
        fullGamer.displayInfo();


        store.changeBuilder(officeBuilder);

        console.log("=== Full Setup con Office Builder ===");
        const fullOffice = store.buildFullSetup();
        fullOffice.displayInfo();

        store.changeBuilder(gamingBuilder);

        console.log("=== Basic Setup con Gaming Builder ===");
        const basicGamer = store.buildBasicSetup();
        basicGamer.displayInfo();

        store.changeBuilder(officeBuilder);

        console.log("=== Basic Setup con Office Builder ===");
        const basicOffice = store.buildBasicSetup();
        basicOffice.displayInfo();
    }

    main();
}
