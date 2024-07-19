import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  saludar: any;
  habilitar = false

  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  ngOnInit(): void {
    this.afAuth.currentUser.then((data) => {
      this.saludar = data?.displayName;
      const email = data?.email;
      if (
        email == 'edwinkaycut@gmail.com' ||
        email == 'alejomaximo1990@gmail.com'
      ) {
        this.habilitar = true;
      }
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
