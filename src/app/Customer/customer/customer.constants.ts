import { environment } from 'src/environments/environment';
export class CustomerConstants {
    public constants: any;
    private commonDbBaseUrl: string = environment.commonDbBaseUrl;
    constructor() {
        const aRevenueTypes = [
            { revenueTypeId: 1, revenueTypeName: "DIGITAL-NEWBUSINESS" },
            { revenueTypeId: 2, revenueTypeName: "LOCAL-NEWBUSINESS" },
            { revenueTypeId: 3, revenueTypeName: "NATL-NEWBUSINESS" }
        ];
        const aRevenueAssignments = [
            { revenueAssignmentId: 1, revenueAssignmentName: "Cash" },
            { revenueAssignmentId: 2, revenueAssignmentName: "Trade" }
        ];
        const cCodeValueOptions = [
            { codeValueId: 1,codeValueName: "Broadcast" },
            { codeValueId: 3, codeValueName: "Calendar" },
            { codeValueId: 4, codeValueName: "On Demand" },
            { codeValueId: 5, codeValueName: "Weekly" }
        ];
        const oErrorMessages = {
            serverError: 'Internal server error occured',
            revenueDetailsError: 'Fill all the revenue details fields',
            invalidData: 'Enter valid Data',
            requiredAllError: 'Fill all the required fields',
            invalidEmail: this.invalidErrorMessage('email'),
            invalidPhoneNumber: this.invalidErrorMessage('phone'),
            requiredAgency: this.requiredErrorMessage('Agency name'),
            requiredAdvertiser: this.requiredErrorMessage('Advertiser name')
        };
        const oComponentNames = {
            agency: 'Agency',
            advertiser: 'Advertiser',
            contact: 'Contact'
        };
        const oUrlLinks = {
            customerUrl: `${this.commonDbBaseUrl}customer/Getcustomer`,
            advertiserUrl: `${this.commonDbBaseUrl}customer/GetAllAdvertiser`,
            customerTypes: `${this.commonDbBaseUrl}customer/GetAllCustomerTypes`,
            insertCustomer: `${this.commonDbBaseUrl}customer/Insertcustomer`,
            updateCustomer: `${this.commonDbBaseUrl}customer/Updatecustomer`,
            phoneTypeList: `${this.commonDbBaseUrl}customer/GetPhoneTypes`,
            insertAddress: `${this.commonDbBaseUrl}customer/InsertAddress`,
            insertCustomerBilling: `${this.commonDbBaseUrl}customer/InsertCustomerBilling`,
            codeValueOptionsUrl :  `${this.commonDbBaseUrl}customer/GetAllCodeValueTypes`,
        }
        const oRegex = {
            email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            mobile: /^[\-0-9()]{13}$/
        }
        this.constants = {
            codeValueOptions:cCodeValueOptions,
            revenueTypes: aRevenueTypes,
            revenueAssignments: aRevenueAssignments,
            errorMessages: oErrorMessages,
            componentNames: oComponentNames,
            urlLinks: oUrlLinks,
            regex: oRegex

        };
        Object.freeze(this.constants)
    }
    public invalidErrorMessage(sName: string) {
        return `Invalid ${sName} format`;
    }
    public requiredErrorMessage(sName: string) {
        return `${sName} is required`;
    }
    public sameNameExistErrorMessage(sName: string) {
        return `${sName} with same name already exists, please choose a different name`;
    }
    public dataSavedMessage(sName: string) {
        return `${sName} data saved Successfully`;
    }
    public dataSaveErrorMessage(sName: string) {
        return `Unable to save ${sName} information`;
    }
}