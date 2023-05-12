export interface CustomerProps{
    id?:number;
    first_name:string;
    last_name:string;
    email:string;
    phone:string;
    onCancel?:()=>void;
    onAdd?:(obj:{})=>void;

    onUpdate?:(obj:{})=>void;

}

