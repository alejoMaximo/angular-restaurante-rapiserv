import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  saludar:any;


  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.currentUser.then((data) => {
      this.saludar = data?.email
      console.log(data);
    });
  }
}
