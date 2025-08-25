import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Repo } from './services/repo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly repo = inject(Repo);
  protected readonly title = signal('nexton-frontend-test');

  ngOnInit(): void {
    this.repo.initRepoWithPredefinedData();
  }
}
