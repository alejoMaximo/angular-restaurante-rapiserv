import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products: any[] = [];

  constructor(private _prod: ProductsService) {}

  ngOnInit(): void {

  }

  // getProducts() {
  //   this._prod.getProducts().subscribe((data) => {
  //     this.products = [];
  //     data.forEach((element: any) => {
  //       this.products.push({
  //         id: element.payload.doc.id,
  //         ...element.payload.doc.data(),
  //       });
  //     });
  //     console.log(this.products)
  //   });
  // }
}
