import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required,
        Validators.minLength(5)]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          ),
          Validators.minLength(5)
        ]
      ],
      rememberMe: [false]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.rememberMe)
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigate(['../sites']);
          }
        );
    } else {
      console.log("Form is invalid");
    }
  }
}
