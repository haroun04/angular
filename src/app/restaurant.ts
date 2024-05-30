    import { Fr } from './fr';
import { Review } from './review';

    export class Restaurant {
        id ?: number;
        uuid ?:string;
        name ?: string;
        location ?: string;
        foodStyle ?: string;
        timeTable ?: string;
        capacity ?: number;
        phoneNumber ?: string;
        starRating ?: number;
        url ?: string;
        description ?: string;
        userIframeSrc ?: string;
        reviews ?: Review[];
        images ?: Image[];
        favoriteRestaurants?: Fr[];
    }

    export class Image {
        id ?: number;
        url ?: string;
    }

    