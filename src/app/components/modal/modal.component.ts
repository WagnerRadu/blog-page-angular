import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/models/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() isModalOpen = false;
  @Input() selectedArticle: IArticle = {
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    saying: "",
    content: "",
    id: 0
  }

  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() fetchArticles: EventEmitter<string> = new EventEmitter<string>();
  @Output() resetSelectedArticle: EventEmitter<string> = new EventEmitter<string>();
  
  articleForm = new FormGroup({});
  addArticleSubscription = new Subscription();
  updateArticleSubscription = new Subscription();

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isModalOpen'] && changes['selectedArticle']) {
      this.articleForm = new FormGroup({
        title: new FormControl(this.selectedArticle.title),
        tag: new FormControl(this.selectedArticle.tag),
        author: new FormControl(this.selectedArticle.author),
        date: new FormControl(this.selectedArticle.date),
        imgUrl: new FormControl(this.selectedArticle.imgUrl),
        saying: new FormControl(this.selectedArticle.saying),
        content: new FormControl(this.selectedArticle.content)
      });
    }
    console.log(changes)
  }

  closeModal() {
    this.toggleModal.emit(false);
    this.resetSelectedArticle.emit('');
  }

  saveArticle() {
    const body = this.articleForm.getRawValue();
    this.addArticleSubscription = this.articleService.addArticle(body).subscribe((response) => {
      console.log(response);
      this.closeModal();
      this.fetchArticles.emit('');
      this.resetSelectedArticle.emit('');
    });
  }

  updateArticle() {
    const body = {...this.articleForm.getRawValue(), id: this.selectedArticle.id};
    this.updateArticleSubscription = this.articleService.updateArticle(body).subscribe((response) => {
      console.log(response);
      this.closeModal();
      this.fetchArticles.emit('');
      this.resetSelectedArticle.emit('');
    });
  }

  ngOnDestroy(): void {
    this.addArticleSubscription.unsubscribe();
    this.updateArticleSubscription.unsubscribe();
  }
}
