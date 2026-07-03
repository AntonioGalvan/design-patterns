namespace AbstractFactory {
    interface Hamburger {
        prepare(): void;
    }

    interface Drink {
        pour(): void;
    }

    class ChickenHamburger implements Hamburger {
        prepare(): void {
            console.log('Preparando hamburguesa de pollo');
        }
    }

    class BeefHamburger implements Hamburger {
        prepare(): void {
            console.log('Preparando hamburguesa de res');
        }
    }

    class Cola implements Drink {
        pour(): void {
            console.log('Sirviendo refresco');
        }
    }

    class Lemonade implements Drink {
        pour(): void {
            console.log('Sirviendo limonada');
        }
    }

    //Interface factory
    interface ComboFactory {
        createHamburger(): Hamburger; // Producto 1
        createDrink(): Drink; // Producto 2
    }

    class FastFoodFactory implements ComboFactory {
        createHamburger(): Hamburger {
            return new BeefHamburger();
        }

        createDrink(): Drink {
            return new Cola();
        }
    }

    class HealthyFactory implements ComboFactory {
        createHamburger(): Hamburger {
            return new ChickenHamburger();
        }

        createDrink(): Drink {
            return new Lemonade();
        }
    }

    class Restaurant {
        constructor(private factory: ComboFactory) {}

        orderCombo(): void {
            const hamburger = this.factory.createHamburger();
            const drink = this.factory.createDrink();

            hamburger.prepare();
            drink.pour();

            console.log('Combo listo');
        }
    }

    function main() {
        let factory: ComboFactory;

        const comboType = prompt(
            '¿Qué tipo de combo deseas? (fast-food - 1 / healthy - 2)'
        );

        if (comboType === 'fast-food' || comboType === '1') {
            factory = new FastFoodFactory();
        } else {
            factory = new HealthyFactory();
        }

        const restaurant = new Restaurant(factory);
        restaurant.orderCombo();
    }

    main();
}