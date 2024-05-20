import { Booking } from "./booking";
import { Fr } from "./fr";

export interface User {
    id : number;
    name : string;
    email : string;
    password : string;
    profilePicture : string;
    bookings : Booking[];
    favoriteRestaurants : Fr[];
}
