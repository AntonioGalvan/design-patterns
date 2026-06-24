// Implementación completa del patrón Prototype: interfaz Prototype<T>, clonación
// y herencia. Cada clase sabe clonarse a sí misma sin que el código cliente
// dependa de la clase concreta.
namespace CompletePrototypePattern {
    // Contrato del patrón: todo prototipo sabe producir una copia de sí mismo.
    //<T> es un parámetro de tipo genérico que permite que la interfaz sea flexible y pueda ser implementada por cualquier clase que desee proporcionar funcionalidad de clonación.
    interface Prototype<T> {
        clone(): T;
    }

    class DocumentPrototype implements Prototype<DocumentPrototype> {
        public title: string;
        public content: string;
        public author: string;
        public keywords: string[];

        constructor(title: string, content: string, author: string, keywords: string[] = []) {
            this.title = title;
            this.content = content;
            this.author = author;
            this.keywords = keywords;
        }

        // Crea una nueva instancia con los mismos datos.
        // Los arrays se copian con [...] para que el clon sea independiente del original.
        clone(): DocumentPrototype {
            return new DocumentPrototype(this.title, this.content, this.author, [...this.keywords]);
        }

        displayInfo(): void {
            console.log(`Documento base:
            Título: ${this.title}
            Contenido: ${this.content}
            Autor: ${this.author}
            Palabras clave: ${this.keywords.join(', ') || 'Sin palabras clave'}
        `);
        }
    }

    // El patrón funciona también con herencia: la subclase añade campos
    // y solo tiene que extender su propio clone().
    class ConfidentialDocumentPrototype extends DocumentPrototype {
        public securityLevel: string;
        public allowedDepartments: string[];

        constructor(
            title: string,
            content: string,
            author: string,
            keywords: string[] = [],
            securityLevel: string = 'INTERNO',
            allowedDepartments: string[] = []
        ) {
            super(title, content, author, keywords);
            this.securityLevel = securityLevel;
            this.allowedDepartments = [...allowedDepartments];
        }

        override clone(): ConfidentialDocumentPrototype {
            return new ConfidentialDocumentPrototype(
                this.title,
                this.content,
                this.author,
                [...this.keywords],
                this.securityLevel,
                [...this.allowedDepartments]
            );
        }

        override displayInfo(): void {
            console.log(`Documento confidencial:
            Título: ${this.title}
            Autor: ${this.author}
            Nivel de seguridad: ${this.securityLevel}
            Áreas autorizadas: ${this.allowedDepartments.join(', ') || 'Sin restricciones'}
            Palabras clave: ${this.keywords.join(', ') || 'Sin palabras clave'}
        `);
        }
    }

    // El cliente clona cualquier prototipo sin conocer su clase concreta.
    function duplicateDocument<T>(prototype: Prototype<T>): T {
        return prototype.clone();
    }

    function main(): void {
        const baseDocument = new DocumentPrototype(
            'Patrón Prototype',
            'Documento base para explicar la clonación.',
            'Antonio Galván',
            ['prototype', 'typescript', 'poo']
        );

        const clonedBaseDocument = duplicateDocument(baseDocument);
        clonedBaseDocument.title = 'Patrón Prototype - Copia';
        clonedBaseDocument.keywords.push('copia independiente');

        console.log('Original base');
        baseDocument.displayInfo();

        console.log('Clon base');
        clonedBaseDocument.displayInfo();

        const confidentialDocument = new ConfidentialDocumentPrototype(
            'Plan de lanzamiento',
            'Versión previa del documento estratégico.',
            'Dirección Académica',
            ['estratégico', 'interno'],
            'ALTO',
            ['Rectoría', 'Coordinación', 'TI']
        );

        const clonedConfidentialDocument = duplicateDocument(confidentialDocument);
        clonedConfidentialDocument.title = 'Plan de lanzamiento - Copia';
        clonedConfidentialDocument.allowedDepartments.push('Marketing');
        clonedConfidentialDocument.keywords.push('clonado');

        console.log('Original confidencial');
        confidentialDocument.displayInfo();

        console.log('Clon confidencial');
        clonedConfidentialDocument.displayInfo();
    }

    main();
}
