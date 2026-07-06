export interface ItemCarrito {
  nombre: string;
  precio(): number;
}

export class Producto implements ItemCarrito {
  nombre: string;
  private costo: number;

  constructor(nombre: string, costo: number) {
    this.nombre = nombre;
    this.costo = costo;
  }

  precio(): number {
    return this.costo;
  }
}

export class Combo implements ItemCarrito {
  nombre: string;
  private items: ItemCarrito[] = [];

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  agregar(item: ItemCarrito): void {
    this.items.push(item);
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  precio(): number {
    return this.items.reduce((total, item) => total + item.precio(), 0);
  }
}
