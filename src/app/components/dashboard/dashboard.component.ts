// src/app/components/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Bienvenue sur ton dashboard 👋</h1>
      <p class="text-gray-600">Tu es connecté avec succès 🎉</p>
    </div>
  `
})
export class DashboardComponent {}
