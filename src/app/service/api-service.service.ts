import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import articles from '../../assets/article.json';
import catagories from '../../assets/categories.json';
import homePage from '../../assets/homePage.json';


@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
private categoriesSubject = new BehaviorSubject<any>(catagories.data.categories);
private articlesSubject = new BehaviorSubject<any[]>([articles.data]);
private homeSubject = new BehaviorSubject<any[]>([homePage.data]);

   constructor(private http: HttpClient) { }

  fetchCategories(): Observable<any> {
    return this.categoriesSubject.asObservable();
  }

  getArticles(): Observable<any[]> {
    return this.articlesSubject.asObservable();
  }

  fetchHomepage() {
    return this.homeSubject.asObservable();
  }
}
