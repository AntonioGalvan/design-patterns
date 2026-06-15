import { Producto } from "./Producto.ts";

export class ProductoTecnologico extends Producto {
    private garantiaMeses: number;
    public marca: string;

    constructor(
        sku: string,
        nombre: string,
        precioInicial: number,
        stockInicial: number,
        marca: string,
        garantiaMeses: number = 12,
    ) {
        super(sku, nombre, precioInicial, stockInicial, "Electrónica");

        this.marca = marca;
        this.garantiaMeses = garantiaMeses;
    }

    public incrementoPrecio(): void {
        this.precio *= 1.10;
    }

    //Overload de métodos
    public extenderGarantia(): void;
    public extenderGarantia(meses: number): void;
    public extenderGarantia(meses: number = 3): void {
        this.garantiaMeses += meses;
    }

    public override resumen(): string {
        return `${super.resumen()} | marca: ${this.marca} | garantía: ${this.garantiaMeses} meses`;
    }
}