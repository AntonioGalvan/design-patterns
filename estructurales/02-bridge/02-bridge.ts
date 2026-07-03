namespace bridgePattern {

    //Implementación
    interface Ability {
        use(): void;
    }

    //Implementaciones concretas
    class SwordAttack implements Ability {
        use(): void {
            console.log("Ataca con una espada afilada");
        }
    }

    class MagicSpell implements Ability {
        use(): void {
            console.log("Lanza un hechizo mágico");
        }
    }

    //Abstracción
    abstract class Character {
        //Implementación mediante composición: cada personaje tiene una habilidad que puede cambiar en tiempo de ejecución.
        protected ability: Ability;

        constructor(ability: Ability) {
            this.ability = ability;
        }

        setAbility(ability: Ability): void {
            this.ability = ability;
        }

        abstract performAbility(): void;
    }

    //Abstracciones refinadas
    class Warrior extends Character {
        override performAbility(): void {
            console.log("Guerrero:");
            this.ability.use();
        }
    }

    class Mage extends Character {
        override performAbility(): void {
            console.log("Mago:");
            this.ability.use();
        }
    }

    function main() {
        const swordAttack = new SwordAttack();
        const magicSpell = new MagicSpell();

        const warrior = new Warrior(swordAttack);
        const mage = new Mage(magicSpell);

        warrior.performAbility();
        mage.performAbility();

        warrior.setAbility(magicSpell);
        warrior.performAbility();
    }

    main();
}
