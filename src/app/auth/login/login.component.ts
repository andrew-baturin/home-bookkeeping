import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {IUser} from '../../models/user.interface';
import {IMessage} from '../../models/message.interface';
import {AuthService} from '../services/auth.service';
import {AuthenticatedService} from '../services/authenticated.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public message: IMessage = {
    type: null,
    text: null
  };

  constructor(
    private authService: AuthService,
    private authenticatedService: AuthenticatedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.getQueryParams();
  }

  public onSubmit(): void {
    this.authService.getUserByEmail(this.form.value.email)
      .subscribe((user: IUser) => {
        if (user) {
          if (user.password === this.form.value.password) {
            this.authenticatedService.login('user', user);
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('danger', 'Неверный email или пароль!');
          }
        } else {
          this.showMessage('danger', 'Такого email не существует!');
        }
      });
  }

  private getQueryParams(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.nowCanLogin) {
        this.showMessage('success', 'Теперь вы можете успешно войти в систему!');
      }
    });
  }

  private showMessage(type: string, text: string): void {
    this.message = {
      type: type,
      text: text
    };

    window.setTimeout(() => this.message.text = null, 5000);
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
}
