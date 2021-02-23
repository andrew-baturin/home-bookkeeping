import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {IUser} from '../../models/user.interface';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit(): void {
    const {email, password, name} = this.form.value;
    const user: IUser = {
      email: email,
      password: password,
      name: name
    };

    this.authService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  private forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve) => {
      this.authService.getUserByEmail(control.value)
        .subscribe((user: IUser) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }
}
