import { Component, OnInit } from '@angular/core';
import { Vocabulary, Word } from '../models/vocabulary.interface';
import { VocabularyService } from '../services/vocabulary.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

  vocabulary: Word[];
  currentWord: any;
  solution: string;
  correct: boolean;
  random = true;
  currentIndex = 0;
  disableNext = true;

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit(): void {
    this.vocabularyService.getVocabulary().subscribe((vocabulary: Vocabulary) => {
      this.vocabulary = this.getAllCategories(vocabulary);
      this.currentWord = this.vocabulary[this.currentIndex];
      console.log(this.currentWord)
    });
  }

  getAllCategories(vocabulary: Vocabulary): Word[] {
    return [
      ...vocabulary.aliments,
      ...vocabulary.bedroom,
      ...vocabulary.colors,
      ...vocabulary.days,
      ...vocabulary.desserts,
      ...vocabulary.drinks,
      ...vocabulary.food,
      ...vocabulary.fruits,
      ...vocabulary.house,
      ...vocabulary.livingRoom,
      ...vocabulary.meat,
      ...vocabulary.months,
      ...vocabulary.numbers,
      ...vocabulary.objects,
      ...vocabulary.ordinals,
      ...vocabulary.seasons,
      ...vocabulary.vegetables
    ];
  }

  getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  }

  verify() {
    console.log(this.solution)
    this.disableNext = false;
    this.solution === this.currentWord.translation ? this.correct = true : this.correct = false;
  }

  next() {
    this.correct = undefined;
    this.solution = '';
    this.disableNext = true;
    if (this.random) {
      this.currentWord = this.vocabulary[this.getRandomInt(this.vocabulary.length-1)];
    } else {
      this.currentIndex !== this.vocabulary.length - 1 ? this.currentIndex += 1 : this.currentIndex = 0;
      this.currentWord = this.vocabulary[this.currentIndex];
    }
  }

  selectOption(event:any) {
    this.correct = undefined;
    this.solution = '';
    this.currentIndex = 0;
    this.disableNext = true;
    this.vocabularyService.getVocabulary().subscribe((vocabulary: Vocabulary) => {
      event === 'all' ? this.vocabulary = this.getAllCategories(vocabulary) : this.vocabulary = vocabulary[event];
      event === 'all' ? this.random = true : this.random = false;
      this.currentWord = this.vocabulary[this.currentIndex];
      console.log(this.currentWord)
    });
  }

}
