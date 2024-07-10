import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

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

  constructor(private _prod: ProductsService) {}

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
      console.log(this.products);
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
}
