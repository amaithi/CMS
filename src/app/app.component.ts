import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from './service/api-service.service';
import { AddArticleComponent } from './component/add-article/add-article.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, AddArticleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CMS';
  currentPage = 'home';
  constructor(private router: Router, private apiService: ApiServiceService) {
    this.apiService.getCurrentTab().subscribe((data) => {
      console.log(data);
      this.currentPage = data;
    });
  }
  ngOnInit(): void {
    this.apiService.initializeAppData();
  }
  redirect(path: any) {
    this.currentPage = path;
  }
}
