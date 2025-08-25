import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private readonly route = inject(ActivatedRoute);
  currentSegmentPath = signal<string | undefined>(undefined)

  segments = [
    { path: 'tasks', title: "Tasks", enabled: true },
    { path: 'users', title: "Users", enabled: false },
    { path: 'settings', title: 'Settings', enabled: false }
  ]

  constructor() {
    const snapshot = this.route.snapshot;
    if (snapshot.url.length > 0) {
      const segment = snapshot.url[0].path;
      console.log(segment);
      this.currentSegmentPath.set(segment);
    }
  }
}
