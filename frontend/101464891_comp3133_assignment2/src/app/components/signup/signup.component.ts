import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

//    signup(username: String!, email: String!, password: String!): User

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, password, email } = this.signupForm.value;
      this.authService.signup(username, password, email).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: error => {
          const message = error.message;
          if (message.includes('duplicate key error')) {
            if (message.includes('username')) {
              this.errorMessage = 'Username already exists';
            } else if (message.includes('email')) {
              this.errorMessage = 'Email already exists';
            }
          }
        }
      });
    }
  }
}
