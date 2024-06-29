import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) {}

  // getProducts(): Observable<any> {
  //   return this.firestore
  //     .collection('items', (ref) => ref.orderBy('nombre', 'asc'))
  //     .snapshotChanges();
  // }
  getProducts(): Observable<any> {
    return this.firestore
      .collection('items')
      .snapshotChanges();
  }

}
