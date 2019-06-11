import { Time } from "@angular/common";
import { LibraryItem } from '../library/library/models/library.model';
export interface ICommercial {
    advertiserId: number;
    advertiser: string;
    length: string;
}
export interface IResponseObject {
    StatusCode?: number;
    Result?: IAdvertiserItems[];
}
export interface IAdvertiserItems {
    advertiser: string;
    length: string;
    id: number;
    title: string;
    isciAdId: string;
    contentId: string;
    startDate?: Date;
    endDate?: Date;
    startTime?: string;
    endTime?: string;
    days: string;
}
export interface IAdvertiser {
    LibraryItemId: number;
    LibraryAdvertiserId: number;

}
export interface ILibraryItem {
    LibraryItemId: number;
    StartTime: string;
    EndTime: string;
    DaysOfWeek?: number;
    Selected: boolean;
    Enabled: boolean;
}
export class Advertiser {
    public advertiserId: number;
    public advertiserName: string;
}
export class UserlibraryItem {
   // public advertiserDto: Advertiser
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

