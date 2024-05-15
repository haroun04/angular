import { Booking } from "./booking";

export interface User {
    id : number;
    name : string;
    email : string;
    password : string;
    profilePicture : string;
    bookings : Booking[];
}
