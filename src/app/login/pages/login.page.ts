import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/angular/standalone'
import { AuthService } from 'src/app/service/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { warning } from 'ionicons/icons'
import { addIcons } from 'ionicons'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    IonButton,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonToast,
    IonToolbar,
  ]
})
export class LoginPage {
  loginForm: FormGroup
  isToastOpen: boolean
  disableLoginBtn: boolean

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    addIcons({ warning })
    this.isToastOpen = false
    this.disableLoginBtn = true
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  setOpen(isToastOpen: boolean) {
    this.isToastOpen = isToastOpen
  }

  async onSubmit() {
    this.disableLoginBtn = true
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value
        await this.authService.login(email, password)
        this.router.navigate(['/tasks'])
      } catch (error) {
        this.isToastOpen = true
        console.error('Login error:', error)
      }
    }
    this.disableLoginBtn = false
  }

}
