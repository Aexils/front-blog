// src/app/components/code.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {authStore} from '../../stores/auth.store';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h2 class="text-2xl font-bold mb-4">Vérification du code</h2>
      <p class="text-sm text-gray-500 mb-4">Un code a été envoyé à <strong>{{ email }}</strong></p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Code temporaire</label>
          <input type="text" formControlName="code" class="mt-1 w-full border rounded p-2" />
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Vérifier
        </button>

        <p *ngIf="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      </form>
    </div>
  `
})
export class CodeComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  form = this.fb.group({
    code: ['', Validators.required]
  });

  email = '';
  errorMessage = '';

  constructor() {
    // Récupération de l'email depuis les query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    if (this.form.invalid || !this.email) return;

    const code = this.form.value.code!;

    this.auth.verifyCode(this.email, code).subscribe({
      next: (res) => {
        authStore.setToken(res.accessToken);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Code invalide.';
      }
    });
  }
}
