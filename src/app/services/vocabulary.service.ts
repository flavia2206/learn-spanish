import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VocabularyService {

    constructor(private httpClient: HttpClient) {

    }
    getVocabulary() {
        return this.httpClient.get('/assets/vocabulary.json');
    }
}