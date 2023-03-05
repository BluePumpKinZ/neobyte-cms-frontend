import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MUID} from "../../../models/Account";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  returnUrl: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/sites']);
    }
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

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.rememberMe)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.loading = false;
          });
    } else {
      // console.log("Form is invalid");
    }
  }
}
