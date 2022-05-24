import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IArticle } from 'src/app/models/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  @Input() article: IArticle = {
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    saying: "",
    content: "",
    id: 0
  }; 

  @Output() fetchArticles: EventEmitter<string> = new EventEmitter<string>();

  constructor(private articleService: ArticlesService) { }
  

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
