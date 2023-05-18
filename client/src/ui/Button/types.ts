
type TypeBackgroundColor="red"|"green"
export interface ButtonProps{
    text:string;
    backgroundColor:TypeBackgroundColor;
    onClick:()=>void;
}