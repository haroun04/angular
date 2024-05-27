import { Restaurant } from "./restaurant";
import { User } from "./user";

export class Booking {
    id ?: number;
    numberDiners ?: number;
    createdAt ?: Date;
    reservedAt ?: Date;
    restaurantId ?: number;
    userId ?: number;
}