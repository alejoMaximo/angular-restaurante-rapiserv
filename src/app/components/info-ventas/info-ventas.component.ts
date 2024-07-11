import { Component, OnInit } from '@angular/core';
import { RegistrarService } from 'src/app/services/registrar.service';

@Component({
  selector: 'app-info-ventas',
  templateUrl: './info-ventas.component.html',
  styleUrls: ['./info-ventas.component.scss'],
})
export class InfoVentasComponent implements OnInit {
  registros: any[] = [];
  constructor(private _reg: RegistrarService) {}

  ngOnInit(): void {
    this.getRegistros();
  }

  getRegistros() {
    this._reg.obtenerRegistro().subscribe((data) => {
      this.registros = [];
      data.forEach((element: any) => {
        const registroData = element.payload.doc.data();
        const date = new Date(registroData.timestamp.seconds * 1000);
        this.registros.push({
          id: element.payload.doc.id,
          ...registroData,
          date,
        });
      });
      console.log(this.registros);
    });
  }
}
