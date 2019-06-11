// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  inventoryURL: 'http://xginventoryqa.southcentralus.cloudapp.azure.com/api/',
  empURL: 'http://xgtcustomersqa.southcentralus.cloudapp.azure.com/api/',
  proposalURL: "http://xgcampaignqa.southcentralus.cloudapp.azure.com/api/",
  postURL: "http://xgpostbuyqa.southcentralus.cloudapp.azure.com/api/",
  //http://xgcommondataqa.southcentralus.cloudapp.azure.com/api/",
  commercialDbBaseUrl: "http://xgmedialibraryqa.azurewebsites.net/api/",
  copyUrl: "http://xgcopyinstructionsqa.azurewebsites.net/api/",
  //copyUrl: "http://localhost:57799/api/",
  pricingURL: "http://xgpricingqa.southcentralus.cloudapp.azure.com/api/",
  reportURL: 'https://qaxgreport.azurewebsites.net/api/',
  //  commonDbBaseUrl:"http://xgtcustomersqa.southcentralus.cloudapp.azure.com/api/",
  commonDbBaseUrl:'http://qaxgtcustomers.azurewebsites.net/api/',
  //pricingURL: "http://localhost:8475/api/",
  copyInstructionURL: 'http://xgcopyinstructionsqa.azurewebsites.net/api/' 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
