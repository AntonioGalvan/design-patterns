import { Combo, ItemCarrito } from "./composite";

export function VistaItem({ item }: { item: ItemCarrito }) {
  if (item instanceof Combo) {
    return (
      <div className="combo">
        <div className="combo-titulo">
          <span>{item.nombre}</span>
          <span>${item.precio()}</span>
        </div>
        {item.obtenerItems().map((sub, i) => (
          <VistaItem key={i} item={sub} />
        ))}
      </div>
    );
  }

  return (
    <div className="producto">
      <span>{item.nombre}</span>
      <span>${item.precio()}</span>
    </div>
  );
}
