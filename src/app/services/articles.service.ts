import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendURL } from '../constants';
import { IArticle } from '../models/iarticle';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<IArticle[]>(backendURL.articles);
  }
  
}
