import { Component } from '@angular/core';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent {
 articleType: string = 'text';

  get showDescriptionField(): boolean {
    return this.articleType === 'text';
  }

  get showMediaUrlField(): boolean {
    return this.articleType !== 'text';
  }

  onArticleTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.articleType = select.value;
  }

}
