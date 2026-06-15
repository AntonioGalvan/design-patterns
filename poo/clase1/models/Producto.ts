export type CategoriaProducto = 'Electrónica' | 'Electrodomésticos' | 'Hogar' | 'N/A';

export class Producto {
    //Atributos: características que tiene la clase
    protected precio: number;
    private stock: number;

    public readonly sku: string;
    public nombre: string;
    public categoria: CategoriaProducto;

    private static totalProductos = 0;

    //Constructor: método especial que se ejecuta al crear una instancia de la clase, se utiliza para inicializar los atributos de la clase
    //Overloads
    //Firmas de constructor: la clase puede tener múltiples formas de ser instanciada, dependiendo de los parámetros que se le pasen al constructor
    constructor(sku: string, nombre: string);
    constructor(
        sku: string,
        nombre: string,
        precioInicial: number,
        stockInicial: number,
        categoria: CategoriaProducto
    )
    //Implementación del constructor que maneja ambos casos de sobrecarga, con valores predeterminados para los parámetros opcionales
    constructor(
        sku: string,
        nombre: string,
        precioInicial: number = 0,
        stockInicial: number = 0,
        categoria: CategoriaProducto = 'N/A'
    ) {
        this.sku = sku;
        this.nombre = nombre;
        this.precio = precioInicial;
        this.stock = stockInicial;
        this.categoria = categoria;

        Producto.totalProductos += 1;
    }

    public static crearGenerico(sku: string = `SKU-GEN-${Producto.totalProductos + 1}`, nombre: string = "Producto genérico"): Producto {
        return new Producto(sku, nombre);
    }

    //Mutator
    public reabastecer(unidades: number): void {
        if (unidades <= 0) {
            throw new Error('Las unidades para reabastecer deben ser mayores a 0');
        }

        this.stock += unidades;
    }

    public vender(unidades: number): number {
        if (unidades <= 0) {
            throw new Error('Las unidades a vender deben ser mayores a 0');
        }

        if (unidades > this.stock) {
            throw new Error('No hay suficiente stock para vender las unidades solicitadas');
        }

        this.stock -= unidades;
        return this.redondear(unidades * this.precio);
    }

    //Métodos: acciones o comportamientos de la clase
    public resumen(): string {
        return `SKU: ${this.sku} | Nombre: ${this.nombre} | Precio: $${this.precio.toFixed(2)} | Stock: ${this.stock} | Categoria: ${this.categoria}`;
    }

    private redondear(valor: number): number {
        return Math.round(valor * 100) / 100;
    }

    //Métodos de acceso (getters y setters): permiten obtener o modificar el valor de atributos privados de forma controlada
    //getter
    public get Precio(): number {
        return this.precio;
    }

    //setter
    public set Precio(nuevoPrecio: number) {
        if (nuevoPrecio < 0) {
            throw new Error('El precio no puede ser negativo');
        }

        this.precio = nuevoPrecio;
    }

    public static get TotalProductos(): number {
        return Producto.totalProductos;
    }
}