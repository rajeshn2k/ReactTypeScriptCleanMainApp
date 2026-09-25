export interface CreateBookInput {
    bookName: string;
    bookCategory: string;
    edition: string;
    price: number;
    image: string;
}

export interface CreatePersonInput {
    firstName: string;
    lastName: string;
    rank: number;
    category: string;
    dateOfBirth: Date;
    isPlaySports: boolean;
}

export interface Book {
    id: any;
    personId: string;
    bookName: string;
    bookCategory: string;
    edition: string;
    price: number;
    image: string;
    dateCreated: Date;
    auhorName: string;
}

export interface Person {
    id: any;
    firstName: string;
    lastName: string;
    rank: number;
    category: string;
    dateOfBirth: Date;
    isPlaySports: boolean;
    dateCreated: Date;
}
