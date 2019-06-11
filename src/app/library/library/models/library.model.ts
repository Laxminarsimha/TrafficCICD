// import { Binary } from "selenium-webdriver/firefox";
export class LibraryHeader{
    public name: string;
    public libraryType:number ;
}
export class LibraryType{
    public LibraryName: string;
    public LibraryId:number ;
}
export class Advertiser{
    'advertiserId': number;
    'advertiserName': string;

}
export class LibraryItem{
    public  LibraryItemtypeId:number;
    public  Title:string;
    public  IsciAdId:string;
    public  Length:string;
    public  MinimumLength:string;
    public  MaximumLength:string;
    public  ContentDuration:string;
    public  ContentId:number;
    public  ExternalId:number;
    public  ExpirationDate:Date;
    public  StartDate:Date;
    public  EndDate:Date;
    public  EnableSpecificDays:boolean=false;
    public  StartTime:string;
    public  EndTime:string;
    public IsVariableLength: boolean;
    public Advertiserdto?:Advertiser[];
    public LibraryItemUsageDTO:LibraryItemUsage[]
}
export class LibraryItemUsage{
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
}