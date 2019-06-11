export class CopyHeader{   
    Title: string = ""; 
    Advertiser:string  = "";
    UnitType: string = "";
    Length:string = "" ;
    RotationID : number = 0; 
    AdvertiserId : number =0;  
  
  }
  
  export class CopyCreative{   
     CopyCreativeTitle : string;
     CopyInstructionId : number;
     ADId : string = "" ;
     ContentId : string ="" ;
     Length : string = "";
     StartDate : Date ; // todo
     EndDate : Date; // todo
     StartTime : string = "";
     EndTime : string= "" ;
     CardSelected : boolean;
     Enabled : boolean;
     Selected :boolean;
     RotationTypeID: number =0;
     EstimationNumber:number =0;
     public CopyItemUsageDTOs: CopyItemUsageDTO[];
     public CopyHeader:CopyHeader;
    }
  
  
  export enum Rotation{
    Even = 1 ,
    Sequence = 2 ,
    Percentage = 3 
  }

  export class CopyItemUsageDTO{
    public LibraryItemId:number;
    public StartTime:string;
    public EndTime:string;
    public DaysOfWeek:number;
    public Selected:boolean;
    public Enabled:boolean
    public CreatedDate:Date;
    public CreatedBy:string;
    public ModifiedDate:Date;
    public ModifiedBy:string;
    public EnableForSpecificDays : number;
}




