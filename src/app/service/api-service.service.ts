import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import articles from '../../assets/article.json';
import catagories from '../../assets/categories.json';
import homePage from '../../assets/homePage.json';
import authors from '../../assets/autor.json';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private categoriesSubject: any;
  private articlesSubject: any;
  private homeSubject: any;
  private authorSubject: any;
  private currentTab = new BehaviorSubject<any>('home');
  constructor(private http: HttpClient) {}
  initializeAppData(): void {
      this.setHomepage();
      this.setArticles();
      this.setCategories();
      this.setAuthors();
  }
  setCurrentTab(status: any): Observable<any> {
  this.currentTab.next(status); // update the value
  return this.currentTab.asObservable(); // return observable
}
  getCurrentTab(): Observable<any> {
    return this.currentTab.asObservable();
  }
  fetchCategories(): Observable<any> {
    return this.categoriesSubject.asObservable();
  }
  setAuthors(data?: any) {
    if (data) {
      authors.data.authors.push(data);
    }
    this.authorSubject = new BehaviorSubject<any>(authors.data.authors);
  }
  fetchAuthors(): Observable<any> {
    return this.authorSubject.asObservable();
  }
  setCategories(data?: any) {
    if (data) {
      catagories.data.categories.push(data);
    }
    this.categoriesSubject = new BehaviorSubject<any>(
      catagories.data.categories
    );
  }
  getArticles(): Observable<any[]> {
    return this.articlesSubject.asObservable();
  }
  setArticles(data?: any) {
    let finalData = [articles.data];
    if (data) {
      finalData.push(data);
    }
    this.articlesSubject = new BehaviorSubject<any[]>(finalData);
  }
  fetchHomepage() {
    return this.homeSubject.asObservable();
  }
  setHomepage(data?: any) {
    let finalData = [homePage.data];
    if (data && finalData?.length) {
      finalData[0].articles.push(data);
    }

    this.homeSubject = new BehaviorSubject<any[]>(finalData);
  }
}
