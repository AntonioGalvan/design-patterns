namespace ObserverPattern {
    interface Observer {
        notify(videoTitle: string): void;
    }

    class YoutubeChannel {
        private subscribers: Observer[] = [];
        private name: string;

        constructor(name: string) {
            this.name = name;
        }

        subscribe(observer: Observer): void {
            this.subscribers.push(observer);
            console.log(`Nuevo suscriptor se ha suscrito al canal ${this.name}.`);
        }

        unsubscribe(observer: Observer): void {
            const index = this.subscribers.indexOf(observer);
            if (index !== -1) {
                this.subscribers.splice(index, 1);
                console.log(`Un suscriptor se ha dado de baja del canal ${this.name}.`);
            }
        }

        uploadVideo(videoTitle: string): void {
            console.log(`El canal ${this.name} ha subido un nuevo video: "${videoTitle}".`);

            this.subscribers.forEach(subscriber => subscriber.notify(videoTitle));
        }
    }

    class Subscriber implements Observer {
        private name: string;

        constructor(name: string) {
            this.name = name;
        }

        notify(videoTitle: string): void {
            console.log(`Notificación para ${this.name}: Nuevo video disponible - "${videoTitle}".`);
        }
    }

    function main() {
        const channel = new YoutubeChannel("CodeForIt");

        const subscriber1 = new Subscriber("Juan");
        const subscriber2 = new Subscriber("Ana");
        const subscriber3 = new Subscriber("Luis");

        channel.subscribe(subscriber1);
        channel.subscribe(subscriber2);

        channel.uploadVideo("Introducción a TypeScript");

        channel.subscribe(subscriber3);

        channel.uploadVideo("Curso de react.js");

        channel.unsubscribe(subscriber2);
        channel.unsubscribe(subscriber3);
        
        channel.uploadVideo("Patrones de diseño");

        
    }

    main();
}
