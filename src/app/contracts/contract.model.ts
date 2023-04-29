export interface Contract {
  id: number;
  kategorie_id: number;
  userId: number;
  startdate: Date;
  enddate: Date;
  name: string;
  intervall: number;
  revenue:number;
  actual_value: number;
  unlimited: number;
  paused:boolean;
  lastcreateddate:Date;
}
