namespace fluentBuilder {
    class Computer {
        public cpu: string = "cpu - not defined";
        public ram: string = "ram - not defined";
        public storage: string = "storage - not defined";
        public gpu?: string;
        public rgb?: string;
        public mouse?: string;
        public keyboard?: string;

        displayInfo() {
            console.log(`Configuración de la computadora:
            CPU: ${this.cpu}
            RAM: ${this.ram}
            Storage: ${this.storage}
            GPU: ${this.gpu ?? "gpu - not defined"}
            RGB: ${this.rgb ?? "rgb - not defined"}
            Mouse: ${this.mouse ?? "mouse - not defined"}
            Keyboard: ${this.keyboard ?? "keyboard - not defined"}
        `);
        }
    }

    class ComputerBuilder {
        private computer: Computer;

        constructor() {
            this.computer = new Computer();
        }

        setCPU(cpu: string): ComputerBuilder {
            this.computer.cpu = cpu;
            return this;
        }

        setRAM(ram: string): ComputerBuilder {
            this.computer.ram = ram;
            return this;
        }

        setStorage(storage: string): ComputerBuilder {
            this.computer.storage = storage;
            return this;
        }

        setGPU(gpu: string): ComputerBuilder {
            this.computer.gpu = gpu;
            return this;
        }

        setRGB(rgb: string): ComputerBuilder {
            this.computer.rgb = rgb;
            return this;
        }
        setMouse(mouse: string): ComputerBuilder {
            this.computer.mouse = mouse;
            return this;
        }
        setKeyboard(keyboard: string): ComputerBuilder {
            this.computer.keyboard = keyboard;
            return this;
        }

        build() {
            return this.computer;
        }
    }

    function main() {
        const basicComputer: Computer = new ComputerBuilder()
            .setCPU("Intel Core i7")
            .setRAM("16GB")
            .setStorage("512GB SSD")
            .build();

            
        basicComputer.displayInfo();


        
        const gamerComputer: Computer = new ComputerBuilder()
            .setCPU("AMD Ryzen 9")
            .setRAM("32GB")
            .setStorage("1TB SSD")
            .setGPU("NVIDIA RTX 3080")
            .setRGB("RGB Enabled")
            .build();

        gamerComputer.displayInfo();

        const officeComputer: Computer = new ComputerBuilder()
            .setCPU("Intel Core i5")
            .setRAM("8GB")
            .setStorage("256GB SSD")
            .setMouse("Logitech MX Master 3")
            .setKeyboard("Logitech MX Keys")
            .build();

        officeComputer.displayInfo();
    }

    main();


}

