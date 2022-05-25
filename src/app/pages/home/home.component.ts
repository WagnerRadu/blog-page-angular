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
  filteredArticleList:IArticle[] = [];
  isLoading = false;
  articlesSubscription = new Subscription();
  isModalOpen = false;
  numberOfArticlesDisplayed = 3
  startIndex = 0;
  endIndex = 0 + this.numberOfArticlesDisplayed - 1;
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
      this.filteredArticleList = response.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )
      this.isLoading = false;
    });
  }

  resetSelectedArticle() {
    this.selectedArticle = {
      title: "",
      tag: "",
      author: "",
      date: "",
      imgUrl: "",
      saying: "",
      content: "",
      id: 0
    }
  }

  toggleModal(modalState: boolean) {
    this.isModalOpen = modalState;
  }

  selectArticle(selectedArticle: IArticle) {
    this.selectedArticle = selectedArticle;
    this.toggleModal(true);
  }

  prevArticles() {
    this.startIndex = this.startIndex - this.numberOfArticlesDisplayed;
    this.endIndex = this.endIndex - this.numberOfArticlesDisplayed;
    this.filteredArticleList = this.articleList.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )

  }

  nextArticles() {
    this.startIndex = this.startIndex + this.numberOfArticlesDisplayed;
    this.endIndex = this.endIndex + this.numberOfArticlesDisplayed;
    this.filteredArticleList = this.articleList.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )
  }


  ngOnDestroy(): void {
    this.articlesSubscription.unsubscribe();
  }
}

