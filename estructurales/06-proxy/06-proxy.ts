namespace ProxyPattern {
    class Player {
        name: string;
        level: number;

        constructor(name: string, level: number) {
            this.name = name;
            this.level = level;
        }
    }

    // Service interface
    interface Room {
        enter(player: Player): void;
    }

    //Service
    class SecretRoom implements Room {
        enter(player: Player): void {
            console.log(`Bienvenido ${player.name} a la sala secreta. Nivel: ${player.level}`);
        }
    }

    // Proxy: controla el acceso a la sala secreta, verificando el nivel del jugador antes de permitirle entrar.
    class MagicPortal implements Room {

        private secretRoom: Room;

        constructor(secretRoom: Room) {
            this.secretRoom = secretRoom;
        }

        enter(player: Player): void {
            if (player.level >= 10) {
                this.secretRoom.enter(player);
            } else {
                console.log(`Lo siento ${player.name}, necesitas estar al menos en el nivel 10 para entrar a la sala secreta.`);
            }
        }
    }

    function main() {
        //Proxy = magic portal
        const portal = new MagicPortal(new SecretRoom());
        const player1 = new Player("Juan", 5);
        const player2 = new Player("Ana", 12);

        console.log({player1, player2});

        portal.enter(player1);
        portal.enter(player2);
    }

    main();
}