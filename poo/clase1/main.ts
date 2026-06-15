import { Producto } from './models/Producto.ts';
import { ProductoTecnologico } from './models/ProductoTecnologico.ts';

function main() {
  const audifonos = new Producto(
    "12345",
    "Audífonos",
    299.99,
    50,
    "Electrónica"
  );

  const cafetera = new Producto(
    "67890",
    "Cafetera",
    89.99,
    30,
    "Electrodomésticos"
  )

  const celular = new Producto(
    '54321',
    'iphone 12'
  )

  const productoGenerico = Producto.crearGenerico();

  const productoGenerico2 = Producto.crearGenerico();

  const laptop = new ProductoTecnologico(
    '98765',
    'Laptop',
    9999.99,
    20,
    'HP',
    24
  );

  console.log("==== Estado inicial ====")
  console.log(audifonos.resumen());
  console.log(cafetera.resumen());
  console.log(celular.resumen());
  console.log(productoGenerico.resumen());
  console.log(productoGenerico2.resumen());
  console.log(laptop.resumen());

  audifonos.nombre = "Audífonos inalámbricos";

  audifonos.Precio = 10000000;

  cafetera.reabastecer(20);
  audifonos.vender(40);

  laptop.extenderGarantia();
  laptop.extenderGarantia(30);

  laptop.incrementoPrecio();
  
  console.log("==== Estado final ====")
  console.log(audifonos.resumen());
  console.log(cafetera.resumen());
  console.log(laptop.resumen());

  console.log(`Total productos creados: ${Producto.TotalProductos}`);

}

main();