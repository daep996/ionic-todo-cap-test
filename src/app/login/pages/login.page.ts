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
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { warning } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonToast,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: FormGroup
  isToastOpen: boolean = false
  disableLoginBtn: boolean = false
  isLogged: boolean = false
  private authSubscription$!: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSubscription$ = this.authService
      .isAuthenticatedUser()
      .subscribe((isAuth) => {
        this.isLogged = isAuth
        if (isAuth) {
            this.router.navigate(['/tasks'])
            return
        }
      })
    addIcons({ warning })
    this.isToastOpen = false
    this.disableLoginBtn = true
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnDestroy() {
    if (this.authSubscription$) {
      this.authSubscription$.unsubscribe()
    }
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

  async logout() {
    await this.authService.logout()
  }
}
