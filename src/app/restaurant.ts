    import { Review } from './review';

    export class Restaurant {
        id ?: number;
        name ?: string;
        location ?: string;
        foodStyle ?: string;
        timeTable ?: string;
        capacity ?: number;
        phoneNumber ?: string;
        starRating ?: number;
        url ?: string;
        reviews ?: Review[];
        images ?: Image[];
    }

    export class Image {
        id ?: number;
        url ?: string;
    }
