export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
}

export interface UpdateBookDto {
  title: string;
  author: string;
  description: string;
}
