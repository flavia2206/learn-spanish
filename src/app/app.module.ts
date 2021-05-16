import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VocabularyService } from './services/vocabulary.service';
import { VocabularyComponent } from './vocabulary/vocabulary.component';

@NgModule({
  declarations: [
    AppComponent,
    VocabularyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VocabularyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
