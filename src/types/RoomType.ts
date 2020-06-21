export default class RoomType{
    roomId?: number;
    numOfBeds?: number;
    bedType?: "single" | "double" | "bunk_bed" | "king_size";
    balcony?: boolean;
    orientation?: "east" | "west" | "south" | "north";
    floor?: number;
    closet?: boolean;
    desk?: boolean;
    airConditioner?: boolean;
    roomNumber?: number;
    //rentableId?: number;
    //rentable?: Rentable;
}