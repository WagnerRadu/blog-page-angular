import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/models/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  articleId!: string;
  routeSubscription = new Subscription();
  articleSubscription = new Subscription();
  isLoading = false;
  text1!: string;
  text2!: string;
  article: IArticle = {
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    saying: "",
    content: "",
    id: 0,
  }

  constructor(private actRoute: ActivatedRoute,
    private articleService: ArticlesService) { }

  splitText(text: string) {
    let middle = Math.floor(text.length / 2);
    let before = text.lastIndexOf(' ', middle);
    let after = text.indexOf(' ', middle + 1);

    if (middle - before < after - middle) {
      middle = before;
    } else {
      middle = after;
    }

    this.text1 = text.substring(0, middle);
    this.text2 = text.substring(middle + 1);

    // return { text1: text1, text2: text2 }
  }

  ngOnInit(): void {
    this.routeSubscription = this.actRoute.paramMap.subscribe((params) => {
      this.articleId = params.get('id')!;
      this.isLoading = true;
      this.articleSubscription = this.articleService.getArticle(this.articleId).subscribe((response) => {
        this.article = response;
        this.isLoading = false;
        this.splitText(this.article.content); 
      })
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
