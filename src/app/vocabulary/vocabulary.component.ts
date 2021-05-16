import { Component, OnInit } from '@angular/core';
import { Category, Vocabulary, Word } from '../models/vocabulary.interface';
import { VocabularyService } from '../services/vocabulary.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

  words: Word[];
  categories: Category[];
  currentWord: any;
  solution: string;
  correct: boolean;
  random = true;
  currentIndex = 0;
  disableNext = true;

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit(): void {
    this.vocabularyService.getVocabulary().subscribe((vocabulary: Vocabulary) => {
      this.categories = vocabulary.categories;
      this.words = this.getAllCategories(vocabulary);
      this.currentWord = this.words[this.currentIndex];
    });
  }

  getAllCategories(vocabulary: Vocabulary): Word[] {
    let wordArray = [];
    vocabulary.categories.forEach(category => {
      wordArray = [...wordArray, ...category.words]
    });
    return wordArray;
  }

  getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  }

  verify() {
    this.disableNext = false;
    this.solution === this.currentWord.translation ? this.correct = true : this.correct = false;
  }

  next() {
    this.correct = undefined;
    this.solution = '';
    this.disableNext = true;
    if (this.random) {
      this.currentWord = this.words[this.getRandomInt(this.words.length-1)];
    } else {
      this.currentIndex !== this.words.length - 1 ? this.currentIndex += 1 : this.currentIndex = 0;
      this.currentWord = this.words[this.currentIndex];
    }
  }

  selectOption(event:any) {
    this.correct = undefined;
    this.solution = '';
    this.currentIndex = 0;
    this.disableNext = true;
    this.vocabularyService.getVocabulary().subscribe((vocabulary: Vocabulary) => {
      event === 'all' ? this.words = this.getAllCategories(vocabulary) : this.words = vocabulary.categories.find(category => category.categoryValue === event).words;
      event === 'all' ? this.random = true : this.random = false;
      this.currentWord = this.words[this.currentIndex];
    });
  }

}
