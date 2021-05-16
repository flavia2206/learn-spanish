export interface Word {
    word: string;
    translation: string;
}

export interface Category {
    categoryName: string;
    categoryValue: string;
    words: Word[];
}

export interface Vocabulary {
    categories: Category[];
}