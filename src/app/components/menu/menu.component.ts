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
    console.log(this.producto)
  }
}
