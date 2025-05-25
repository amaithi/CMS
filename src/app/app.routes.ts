import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AddArticleComponent } from './component/add-article/add-article.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-article', component: AddArticleComponent }
];
