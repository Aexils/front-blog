// src/app/components/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h2 class="text-2xl font-bold mb-4">Connexion</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input type="email" formControlName="email" class="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label class="block text-sm font-medium">Mot de passe</label>
          <input type="password" formControlName="password" class="mt-1 w-full border rounded p-2" />
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Se connecter
        </button>

        <p *ngIf="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      </form>
    </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  errorMessage = '';

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/code'], { queryParams: { email } });
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Erreur inconnue.';
      },
    });
  }
}
