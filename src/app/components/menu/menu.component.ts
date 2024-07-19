import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { RegistrarService } from 'src/app/services/registrar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products: any[] = [];
  mostrar: boolean = false;
  carrito: any[] = [];
  subtotal = 0;
  modal = false;
  cancelado = 0;
  devolver = 0;

  colors = [
    '#7fb6ff',
    '#ff7f7f',
    '#7fff7f',
    '#ffff7f',
    '#7fffff',
    '#ff7fff',
    '#ff7f7f',
  ];

  constructor(private _prod: ProductsService, private _reg: RegistrarService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._prod.getProducts().subscribe((data) => {
      this.products = [];
      data.forEach((element: any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  agregar(id: string) {
    this.mostrar = true;
    const producto = this.products.find((pro) => pro.id === id);
    const productoEnCarrito = this.carrito.find((pro) => pro.id === id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }

    this.calcularSubtotal();
  }

  cerrar() {
    this.mostrar = false;
  }
  cerrar2() {
    this.modal = false;
  }

  reducir(id: string) {
    const productoEnCarrito = this.carrito.find((pro) => pro.id === id);

    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
      productoEnCarrito.cantidad--;
      this.calcularSubtotal();
    }
  }

  aumentar(id: string) {
    const productoEnCarrito = this.carrito.find((pro) => pro.id === id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
      this.calcularSubtotal();
    }
  }

  calcularSubtotal() {
    this.subtotal = this.carrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
  }
  eliminar(id: string) {
    this.carrito = this.carrito.filter((pro) => pro.id !== id);
    this.calcularSubtotal();
  }
  pagar() {
    this.modal = true;
  }
  actualizarDevolucion() {
    if (this.cancelado < this.subtotal) {
      this.devolver = 0;
    } else {
      this.devolver = this.cancelado - this.subtotal;
    }
  }
  registrar() {
    const productosParaFirebase = this.carrito.map((producto) => ({
      nombre: producto.producto,
      cantidad: producto.cantidad,
      subtotal: producto.precio * producto.cantidad,
    }));

    const data = {
      productos: productosParaFirebase,
      registro: this.subtotal,
      timestamp: new Date(),
    };

    this._reg.agregarRegistro(data).then(() => {
      this.carrito = [];
      this.modal = false;
      this.mostrar = false;
      console.log('Se ha registrado el pedido correctamente');
    });
  }
  obtenerDetallesProductos() {
    return this.carrito.map((producto) => ({
      nombre: producto.producto,
      cantidad: producto.cantidad,
      subtotal: producto.precio * producto.cantidad,
    }));
  }
  toggleCarrito() {
    this.mostrar = !this.mostrar;
  }

}
