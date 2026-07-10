namespace StrategyPattern {
    interface MovementStrategy {
        move(): void;
    }

    class SwimFast implements MovementStrategy {
        move(): void {
            console.log("Nadando rápido");
        }
    }

    class FlyOverWater implements MovementStrategy {
        move(): void {
            console.log("Volando sobre el agua");
        }
    }

    class WalkClumsily implements MovementStrategy {
        move(): void {
            console.log("Caminando torpemente sobre el agua");
        }
    }

    class Duck {
        private name: string;
        private movementStrategy: MovementStrategy;

        constructor(name: string, movementStrategy: MovementStrategy) {
            this.name = name;
            this.movementStrategy = movementStrategy;

            console.log(`Se ha creado un pato llamado ${this.name} con una estrategia de movimiento inicial.`);
        }

        performMove(): void {
            console.log(`${this.name} se prepara para moverse:`);
            this.movementStrategy.move();
        }

        setMovementStrategy(movementStrategy: MovementStrategy): void {
            this.movementStrategy = movementStrategy;
            console.log(`${this.name} ha cambiado su estrategia de movimiento.`);
        }
    }

    function main() {
        const duck1 = new Duck("Pato 1", new SwimFast());
        const duck2 = new Duck("Pato 2", new WalkClumsily());
        const duck3 = new Duck("Pato 3", new FlyOverWater());

        duck1.performMove();
        duck2.performMove();
        duck3.performMove();

        duck3.setMovementStrategy(new SwimFast());
        duck3.performMove();

        duck3.setMovementStrategy(new WalkClumsily());
        duck3.performMove();
    }

    main();
}