export interface Book {
    // id: string;
    // name: string;
    // author: string;
    // publicationDate: Date
    id: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors?: string[];
      publisher?: string;
      publishDate: string;
      description?: string;
      averageRating?: number;
      ratingsCount?: number;
      imageLinks?: {
        thumbnail: string;
        smallThumbnail: string;
      };
    };
  }