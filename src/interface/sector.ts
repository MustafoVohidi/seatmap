export interface Sector{
    x :number;
    y:number;
    width:number;
    height:number;
    id:number;
    rotate:number;
    grouped:boolean;
    entrance:number;
    title :string;
    sectorItem :number;
    radius:number;
    position :number;
    initialRow :number;
    initialSeat :number;
    seats:Array<any> ;
}