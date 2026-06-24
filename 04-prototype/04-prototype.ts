//Tiene el objetivo de crear clones de objetos existentes sin hacer que el código dependa de sus clases.
namespace PrototypePattern {
    class Document {
        public title: string;
        private content: string;
        public author: string;
        public keywords: string[] = [];

        constructor(title: string, content: string, author: string, keywords: string[] = []) {
            this.title = title;
            this.content = content;
            this.author = author;
            this.keywords = keywords;
        }

        //Método para clonar el objeto. Crea una nueva instancia de Document con las mismas propiedades que el objeto original.
        clone(): Document {
            //El array de keywords se clona usando el operador spread para crear un nuevo array con los mismos elementos, evitando que los cambios en el array del objeto clonado afecten al objeto original.
            return new Document(this.title, this.content, this.author, [...this.keywords]);
        }

        displayInfo() {
            console.log(
                `
                Title: ${this.title}
                Content: ${this.content}
                Author: ${this.author}
                Keywords: ${this.keywords.join(', ')}
                `
            )
        }
    }

    function main() {
        const document1 = new Document(
            'Prototype',
            'Documento sobre el patrón Prototype.',
            'Antonio Galván',
            ['Prototype', 'Design Pattern', 'JavaScript']
        );

        console.log({ document1 });
        document1.displayInfo();

        //Se asigna el objeto por referencia, lo que significa que document2 apunta al mismo objeto que document1. Cualquier cambio en document2 afectará a document1 y viceversa.
        const document2 = document1;
        document2.title = 'Prototype 2 ()';

        console.log('Documento 2')
        console.log({ document2 });
        document2.displayInfo();

        console.log('Documento 1')
        console.log({ document1 });
        document1.displayInfo();

        //Clonamos el objeto por valor, pero no es una clonación profunda, lo que significa que si el objeto tuviera propiedades que son objetos, esas propiedades seguirían siendo compartidas entre document1 y document3. Además los métodos no se copian, por lo que document3 no tendrá el método displayInfo().
        const document3 = { ...document1 };
        document3.title = 'Prototype 3 ()';
        document3.keywords.push('Clonación superficial');

        console.log('Documento 3')
        console.log({ document3 });
        //document3.displayInfo();

        console.log('Documento 1')
        console.log({ document1 });
        document1.displayInfo();


        const documentClone = document1.clone();
        documentClone.title = 'Prototype Clone ()';
        documentClone.keywords.push('Clonación profunda');

        console.log('Document Clone')
        console.log({ documentClone });
        documentClone.displayInfo();

        console.log('Documento 1')
        console.log({ document1 });
        document1.displayInfo();
    }

    main();
}
