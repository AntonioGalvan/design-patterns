namespace CompositePattern {
    interface FileSystemComponent {
        showDetails(indent?: string): void;
    }

    class File implements FileSystemComponent {
        private name: string;

        constructor(name: string) {
            this.name = name;
        }

        showDetails(indent: string = ""): void {
            console.log(`${indent} - Archivo: ${this.name}`);
        }
    }

    class Folder implements FileSystemComponent {
        private name: string;
        private contents: FileSystemComponent[] = [];

        add(component: FileSystemComponent): void {
            this.contents.push(component);
        }

        constructor(name: string) {
            this.name = name;
        }

        showDetails(indent: string = ""): void {
            console.log(`${indent} + Carpeta: ${this.name}`);
            this.contents.forEach(component => component.showDetails(indent + "  "));
        }
    }

    function main() {
        const file1 = new File("documento.txt");
        const file2 = new File("imagen.png");
        const file3 = new File("video.mp4");
        const file4 = new File("audio.mp3");

        const folder1 = new Folder("Carpeta1");
        folder1.add(file1);
        folder1.add(file2);

        folder1.showDetails();

        const folder2 = new Folder("Carpeta2");
        folder2.add(file3);

        const folder3 = new Folder("Carpeta3");
        folder3.add(file4);

        const rootFolder = new Folder("CarpetaRaiz");
        rootFolder.add(folder1);
        rootFolder.add(folder2);
        rootFolder.add(folder3);

        folder2.add(folder3);

        console.log("Estructura completa del sistema de archivos:");
        rootFolder.showDetails();
    }

    main();
}
