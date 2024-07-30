import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  sumar() {
    throw new Error('Method not implemented.');
  }
  verificar() {
    throw new Error('Method not implemented.');
  }

  createProduct: FormGroup;
  subbmited: boolean = false;
  id: string | null;
  titleChange: string = 'Agregar Producto';
  urlImagen: string =
    'https://media.istockphoto.com/id/1162198273/es/vector/dise%C3%B1o-de-ilustraci%C3%B3n-vectorial-plana-icono-de-signo-de-interrogaci%C3%B3n.jpg?s=1024x1024&w=is&k=20&c=pZBCbPrSZDpGfF0OzRN78BeLUIJbiWaRxeKVO2TG7sA=';
  cantidadTotal: number = 0;

  disponibleTotal: number = 0;
  nuevoSurtido: number = 0;
  disponible: number = 0;
  resultado: number = 0;
  resultadoTotal: number = 0;

  isDisabled = true;

  constructor(
    private location: Location,
    private _productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    //capturo el id
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.createProduct = this.fb.group({
      producto: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [''],
      disponible: [{ value: '' }, Validators.required],
      // disponibleTotal: [{ value: '', disabled: true }, Validators.required],
      // cantidadTotal: [''],
      // nuevoSurtido: [''],
    });
  }

  ngOnInit(): void {
    this.EXeditProducto();
  }

  EXeditProducto() {
    //aqui edito o agrego
    if (this.id !== null) {
      this.titleChange = 'Editar Producto';
      this._productService.getProducto(this.id).subscribe((data) => {
        this.createProduct.setValue({
          producto: data.payload.data()['producto'],
          precio: data.payload.data()['precio'],
          imagen: data.payload.data()['imagen'],
          precioCompra: data.payload.data()['precioCompra'],
          disponible: data.payload.data()['disponible'],
        });
        // const { disponible, disponibleTotal } = data.payload.data();
        // this.createProduct.setValue({
        //   producto: data.payload.data()['producto'],
        //
        //
        //   cantidadTotal: data.payload.data()['cantidadTotal'] || null,
        //
        //   disponible,
        //   disponibleTotal: data.payload.data()['disponibleTotal'] || null,
        //   nuevoSurtido: data.payload.data()['nuevoSurtido'] || null,
        // });
        // this.disponible = disponible || 0;
        // this.disponibleTotal = disponibleTotal;
      });
    }
  }
  agregarEditarProducto() {
    //se valida todos los campos
    this.subbmited = true;

    if (this.createProduct.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarProducto();
    } else {
      this.editarProducto(this.id);
    }
  }
  editarProducto(id: string) {
    const producto: any = {
      producto: this.createProduct.value.producto,
      precio: this.createProduct.value.precio,
      imagen: this.createProduct.value.imagen,
      disponible: this.resultado,
      precioCompra: this.createProduct.value.precioCompra,
    };
    this._productService.update(id, producto).then(() => {
      this.router.navigate(['/menu']);
      this.toastr.info('Producto actualizado correctamente');
    });
  }
  agregarProducto() {
    const producto: any = {
      producto: this.createProduct.value.producto,
      precio: this.createProduct.value.precio,
      imagen: this.createProduct.value.imagen,
      precioCompra: this.createProduct.value.precioCompra,
      disponible: this.resultado,
    };
    this._productService.agregarproducto(producto).then(() => {
      this.router.navigate(['/menu']);
      this.toastr.success('Nuevo producto agregado');
    });
  }
  goBack() {
    this.location.back();
  }
}
