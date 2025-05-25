import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../service/api-service.service';
@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent {
  articleType: string = 'text';
  articleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      heroImage: ['', [Validators.required,Validators.pattern(/^https:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)]],
      author: ['', Validators.required],
      subtitle: [''],
      articleType: ['1', Validators.required],
      category: ['', Validators.required],
      description: [''],
      mediaUrl: ['test'],
      tags: [''],
      publishDate: ['', Validators.required],
    });

    // Show/hide fields based on articleType
    this.articleForm.get('articleType')?.valueChanges.subscribe((value) => {
      this.toggleFields(value);
    });

    this.toggleFields(this.articleForm.get('articleType')?.value);
  }

  toggleFields(type: string) {
    if (type === 'text') {
      this.articleForm.get('description')?.setValidators([Validators.required]);
      this.articleForm.get('mediaUrl')?.clearValidators();
    } else {
      this.articleForm.get('mediaUrl')?.setValidators([Validators.required]);
      this.articleForm.get('description')?.clearValidators();
    }

    this.articleForm.get('description')?.updateValueAndValidity();
    this.articleForm.get('mediaUrl')?.updateValueAndValidity();
  }
  generateId(length = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onSubmit(): void {
    // Categories data
    const invalidControls: string[] = [];

  const controls = this.articleForm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      invalidControls.push(name);
    }
  }
  console.log(invalidControls)
       if (this.articleForm.valid) {
      console.log('Form Submitted', this.articleForm.value);
       let catagories = {
      categoryId: this.generateId(),
      categoryName: this.articleForm.value.category,
    };
    this.dataService.setCategories(catagories)
    let author = {
      authorId: this.generateId(),
      authorImage: '',
      authorName: this.articleForm.value.author,
    };
    this.dataService.setAuthors(author)
    let articleId =  this.generateId();
    
    // Save Article
    this.dataService.setArticles({
      articleId: articleId,
      published: this.articleForm.value.publishDate,
      author: author,
      category: catagories,
      tags: this.articleForm.value.tags,
      title: this.articleForm.value.title,
      Subtitle: this.articleForm.value.subtitle,
      hero: this.articleForm.value.heroImage,
      description: this.articleForm.value.description,
    });
    
    // Save Home Page
    this.dataService.setHomepage({
       "title": this.articleForm.value.title,
        "hero":  this.articleForm.value.heroImage,
        "articleId": articleId,
        "categoryId": catagories.categoryId,
        "authorId": author.authorId,
        "articleType": this.articleForm.value.articleType,
        "tags": this.articleForm.value.tags
    })
    this.dataService.setCurrentTab('home')

    } else {
      this.articleForm.markAllAsTouched();
    }
  }
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
