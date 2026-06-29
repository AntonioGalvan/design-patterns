//Producto: Hamburguesas
interface Hamburger {
    prepare(): void;
    getSpecialIngredient(): void;
}
//Productos concreto: Hamburguesa de pollo
class ChickenHamburger implements Hamburger {
    prepare(): void {
        console.log('preparando haburguesa de pollo');
    }

    getSpecialIngredient(): void {
        console.log('Ingrediente especial: incluye salsa de miel-mostaza y pepinillos dulces');
    }
}
//Producto concreto: Hamburguesa de res
class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log('preparando haburguesa de res');
    }

    getSpecialIngredient(): void {
        console.log('Ingrediente especial: incluye queso cheddar ahumado y cebolla caramelizada');
    }
}

//Creator: Restaurante
abstract class Restaurant {
    abstract createHamburger(): Hamburger;

    orderHamburger(): Hamburger {
        const hamburger = this.createHamburger();
        hamburger.prepare();
        return hamburger;
    }
}


class ChickenRestaurant extends Restaurant {
    override createHamburger(): Hamburger {
        return new ChickenHamburger();
    }
}

class BeefRestaurant extends Restaurant {
    override createHamburger(): Hamburger {
        return new BeefHamburger();
    }
}

function main() {
    let restaurant: Restaurant;

    const burderType = prompt('¿Qué tipo de hamburguesa deseas? (chicken - 1/beef - 2)');

    if (burderType === 'chicken' || burderType === '1') {
        restaurant = new ChickenRestaurant();
    } else if (burderType === 'beef' || burderType === '2') {
        restaurant = new BeefRestaurant();
    } else {
        console.log('Tipo de hamburguesa no válido');
        return;
    }

    const hamburger = restaurant.orderHamburger();

    hamburger.getSpecialIngredient();
}

main();
