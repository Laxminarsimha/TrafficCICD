export class AddressType {
    public AddressTypeId: number;
    public AddressTypeName: string;
}

export class ServiceRatingSource {
    public RatingSourceTypeId: number;
    public MarketSourceId: number;
    public StationId: number;
}

export class ServiceRequestEntity {
           public serviceDTO: Service;
           public serviceRatingSourcesDTOList: ServiceRatingSource[];
           public addressDTOList: Address[];
       }

export class Address {
           public AddressId: number;
           public SuiteNo: string;
           public City: string;
           public State: string;
           public Country: string;
           public Street: string;
           public PostalCode: string;
           public addressTypeList: AddressType[];
       }
export class Service {
           public ServiceTypeId: number;
           public Name: string;
           public ActivationDate: Date;
           public GoLiveDate: Date;
       }

export class ServiceType {
    public id: number;
    public ServiceTypeName: string;
}

export class ChannelReferenceRequestEntity {
    public ratingSourceId: number;
    public marketSourceId: number;
}
