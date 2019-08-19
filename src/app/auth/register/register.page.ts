import { Component, OnInit } from '@angular/core';

// import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
  }

  register(form) {
    console.log(form.value);
    // this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('');
    // });
  }
}
