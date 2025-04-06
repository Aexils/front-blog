// src/app/components/post-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { NgFor } from '@angular/common';
import {Post} from '../../models/post.model';

@Component({
  standalone: true,
  selector: 'app-post-list',
  imports: [CommonModule, NgFor],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Posts</h1>
      <div *ngFor="let post of posts" class="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
        <h2 class="text-xl font-semibold text-indigo-600">{{ post.title }}</h2>
        <p class="text-gray-700 mt-2">{{ post.content }}</p>
        <p class="text-sm text-gray-400 mt-1">{{ post.createdAt | date: 'medium' }}</p>
      </div>
    </div>
  `
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  posts: Post[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error(err)
    });
  }
}
