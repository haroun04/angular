import { Restaurant } from "./restaurant";

export class Booking {
    id ?: number;
    numberDiners ?: number;
    createdAt ?: Date;
    reservedAt ?: Date;
    restaurant ?: Restaurant;
}