import { useRef, useState } from "react";
import { Combo, ItemCarrito, Producto } from "./composite";
import { VistaItem } from "./VistaItem";
import "./App.css";

const catalogo: { etiqueta: string; crear: () => ItemCarrito }[] = [
  { etiqueta: "Hamburguesa · $90", crear: () => new Producto("Hamburguesa", 90) },
  { etiqueta: "Papas · $45", crear: () => new Producto("Papas", 45) },
  { etiqueta: "Refresco · $30", crear: () => new Producto("Refresco", 30) },
  { etiqueta: "Helado · $35", crear: () => new Producto("Helado", 35) },
  {
    etiqueta: "Combo clásico · $165",
    crear: () => {
      const combo = new Combo("Combo clásico");
      combo.agregar(new Producto("Hamburguesa", 90));
      combo.agregar(new Producto("Papas", 45));
      combo.agregar(new Producto("Refresco", 30));
      return combo;
    },
  },
];

export function App() {
  const carrito = useRef(new Combo("Tu carrito"));
  const [, refrescar] = useState(0);

  const agregar = (crear: () => ItemCarrito) => {
    carrito.current.agregar(crear());
    refrescar((n) => n + 1);
  };

  return (
    <div className="pagina">
      <header>
        <h1>Carrito de compras</h1>
      </header>

      <main>
        <section className="tienda">
          <h2>Agregar al carrito</h2>
          {catalogo.map((opcion) => (
            <button key={opcion.etiqueta} onClick={() => agregar(opcion.crear)}>
              {opcion.etiqueta}
            </button>
          ))}
        </section>

        <section className="panel">
          <VistaItem item={carrito.current} />
          <div className="total-barra">
            <span>Total</span>
            <span>${carrito.current.precio()}</span>
          </div>
        </section>
      </main>
    </div>
  );
}
