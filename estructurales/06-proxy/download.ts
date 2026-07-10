namespace DownloadProxyPattern {

    // Service interface
    interface DownloadService {
        downloadFile(fileName: string): void;
    }

    class User {
        public downloadsCount: number = 0;
        public name: string;
        public isPremium: boolean;

        constructor(name: string, isPremium: boolean) {
            this.name = name;
            this.isPremium = isPremium;
        }
    }


    // Service
    class RealDownloadService implements DownloadService {
        downloadFile(fileName: string): void {
            console.log(`[Servidor] Descargando "${fileName}"...`);
            console.log(`[Servidor] Descarga completada.`);
        }
    }

    //Proxy
    class DownloadProxy implements DownloadService {
        private realService: RealDownloadService;
        private user: User;

        constructor(user: User) {
            this.realService = new RealDownloadService();
            this.user = user;
        }

        downloadFile(fileName: string): void {

            //Acciones antes de la descarga
            if (!this.user.isPremium) {
                console.log(`Acceso denegado. "${this.user.name}" no tiene cuenta premium.`);
                return;
            }

            console.log(`Acceso permitido. Cuenta premium verificada.`);
            this.realService.downloadFile(fileName);

            //Acciones después de la descarga
            this.registrarDescarga();
        }

        private registrarDescarga(): void {
            this.user.downloadsCount++;

            console.log(`[Historial] Total de descargas de ${this.user.name}: ${this.user.downloadsCount}`);
        }
    }

    function main() {
        //Usuarios
        const usuarioGratuito = new User("Luis", false);
        const usuarioPremium = new User("Antonio", true);

        //Proxies
        const descargaLuis: DownloadService = new DownloadProxy(usuarioGratuito);
        const descargaAntonio: DownloadService = new DownloadProxy(usuarioPremium);

        descargaLuis.downloadFile("ebook-avanzado.pdf");
        descargaAntonio.downloadFile("ebook-avanzado.pdf");
        descargaAntonio.downloadFile("plantilla-cv.docx");
    }

    main();
}
