namespace SingletonPattern {
    class DragonBalls {
        // La instancia única de la clase DragonBalls se almacena en una propiedad estática privada.
        private static instance: DragonBalls;

        private ballsCollected: number;

        // El constructor es privado para evitar que se creen instancias de la clase desde fuera de ella. 
        private constructor() {
            this.ballsCollected = 0;
        }

        // El método getInstance() es público y estático, lo que permite acceder a la instancia única de la clase sin necesidad de crear un objeto.
        public static getInstance(): DragonBalls {
            if (!DragonBalls.instance) {
                DragonBalls.instance = new DragonBalls();
                console.log('Se han creado las esferas del dragón!');
            }

            return DragonBalls.instance;
        }

        collectBall(): void {
            if (this.ballsCollected < 7) {
                this.ballsCollected++;
                console.log(`¡Has recogido una esfera del dragón! Total: ${this.ballsCollected}`);

                return;
            }

            console.log('Ya has recogido las 7 esferas del dragón!');
        }

        summonShenlong(): void {
            if (this.ballsCollected === 7) {
                console.log('¡Has invocado a Shenlong!');
                this.ballsCollected = 0;
                return;
            }

            console.log(`Aún te faltan ${7 - this.ballsCollected} esferas del dragón para invocar a Shenlong.`);
        }
    }

    function main() {
        //El constructor de DragonBalls es privado y no se puede acceder desde fuera de la clase.
        //const dragonBalls1 = new DragonBalls(); 

        const gokuDragonBalls = DragonBalls.getInstance();
        gokuDragonBalls.collectBall();
        gokuDragonBalls.collectBall();

        gokuDragonBalls.summonShenlong();

        const vegetaDragonBalls = DragonBalls.getInstance();

        vegetaDragonBalls.collectBall();
        vegetaDragonBalls.collectBall();
        vegetaDragonBalls.collectBall();
        vegetaDragonBalls.collectBall();
        vegetaDragonBalls.collectBall();

        gokuDragonBalls.summonShenlong();

    }

    main();
}