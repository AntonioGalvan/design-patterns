namespace FacadePattern {
    class Projector {
        turnOn(): void {
            console.log("Proyector encendido.");
        }

        turnOff(): void {
            console.log("Proyector apagado.");
        }
    }

    class SoundSystem {
        on(): void {
            console.log("Sistema de sonido encendido.");
        }

        off(): void {
            console.log("Sistema de sonido apagado.");
        }
    }

    class VideoPlayer {
        on(): void {
            console.log("Reproductor de video encendido.");
        }
        
        play(): void {
            console.log("Reproductor de video reproduciendo.");
        }

        stop(): void {
            console.log("Reproductor de video detenido.");
        }

        off(): void {
            console.log("Reproductor de video apagado.");
        }
    }

    class HomeTheaterFacade {
        private projector: Projector;
        private soundSystem: SoundSystem;
        private videoPlayer: VideoPlayer;

        constructor(projector: Projector, soundSystem: SoundSystem, videoPlayer: VideoPlayer) {
            this.projector = projector;
            this.soundSystem = soundSystem;
            this.videoPlayer = videoPlayer;
        }

        watchMovie(): void {
            console.log("Preparando para ver la película...");
            this.projector.turnOn();
            this.soundSystem.on();
            this.videoPlayer.on();
            this.videoPlayer.play();
        }

        endMovie(): void {
            console.log("Terminando la película...");
            this.videoPlayer.stop();
            this.videoPlayer.off();
            this.soundSystem.off();
            this.projector.turnOff();
        }
    }

    function main() {
        const projector = new Projector();
        const soundSystem = new SoundSystem();
        const videoPlayer = new VideoPlayer();

        const homeTheater = new HomeTheaterFacade(projector, soundSystem, videoPlayer);
        
        homeTheater.watchMovie();
        console.log("================================");
        homeTheater.endMovie();
    }

    main();
}