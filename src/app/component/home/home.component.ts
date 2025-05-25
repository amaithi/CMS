import { Component } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories: any;
  article: any;
  homepage: any;
  articleType = ['text','audio','video']
  constructor(private dataService: ApiServiceService) {}

  ngOnInit() {
    this.dataService.fetchCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.dataService.getArticles().subscribe((data: any) => {
      this.article = data;
    });

    this.dataService.fetchHomepage().subscribe((data: any) => {
      if(data.length){
        this.homepage = data[0].articles;
      }else{
        this.homepage = [];
      }
      
    });
  }
 }
