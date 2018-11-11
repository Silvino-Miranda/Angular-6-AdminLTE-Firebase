import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../providers/services/auth.service';

@Component({
   template: ``
})
export class LogoutComponent implements OnInit {
   constructor(
      private router: Router,
      private auth: AuthService
   ) { }

   ngOnInit() {
      this.auth.logout().then(() => {
         this.router.navigate(['/login']);
      }).catch(console.error);
   }
}