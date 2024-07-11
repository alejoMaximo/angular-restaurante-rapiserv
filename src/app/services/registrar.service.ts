import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  constructor(private firestore: AngularFirestore) {}

  obtenerRegistro(): Observable<any> {
    return this.firestore.collection('registro').snapshotChanges();
  }
  agregarRegistro(reg: any){
    return this.firestore.collection('registro').add(reg);
  }
}
