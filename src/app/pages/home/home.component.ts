import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/models/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articleList: IArticle[] = [];
  isLoading = false;
  articlesSubscription = new Subscription();
  isModalOpen = false;
  selectedArticle: IArticle = {
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    saying: "",
    content: "",
    id: 0
  }

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }
  
  fetchArticles() {
    this.isLoading = false;
    this.articlesSubscription = this.articleService.getArticles().subscribe((response: IArticle[]) => {
      this.articleList = response;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.articlesSubscription.unsubscribe();
  }
}

