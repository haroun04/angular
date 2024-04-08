import { Review } from './review';

export class Restaurant {
    id ?: number;
    name ?: string;
    location ?: string;
    foodStyle ?: string;
    timeTable ?: string;
    capacity ?: number;
    phoneNumber ?: string;
    url ?: string;
    reviews ?: Review[];
}
