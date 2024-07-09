import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products: any[] = [];
  mostrar: boolean = false
  producto: any[] = []
  count = 1
  habilitar = true
  subtotal = 0

  constructor(private _prod: ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
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
      console.log(this.products)
    });
  }
  agregar(id:string){
    this.mostrar = true
    const captura = this.products.find(pro => pro.id === id)
    this.producto.push(captura)
    this.subtotal += captura.precio;
  }
  cerrar(){
    this.mostrar = false
  }
  reducir(){
    if (this.count > 1) {
      this.count --
      this.subtotal -= this.producto[0].precio;
      this.habilitar = this.count === 1;
    }
  }
  aumentar(){
    this.count ++
    this.subtotal += this.producto[0].precio;
    this.habilitar = false
  }
}
