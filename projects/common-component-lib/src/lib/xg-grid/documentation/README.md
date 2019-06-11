# Imagine Communications - xgGrid

>   **xgGrid** is a datatable for outputting data for user interaction, data traversing/manipulation/entry, and export.
>   
>   *Overview:*  The xgGrid is designed to be as fexlible as possible to implement.  After adding the common component library, access to the xgGrid is obtained.  The grid only requires 2 inputs to operate out of the box.  The `@Input()` **`[gridConfig]`** and  **`[(data)]`** are all that are needed to run the xgGrid in its default state. *(See properties below)*
>
>   ## Grid Configuration - Configuration
> 
>   >   `import {`...**`Configuration`**...`} from './xg-grid.module';`
>   
> The Configuration class is responisble for telling the xgGrid what the columns look like incuding how to map the bound data objects, what the data type of the columns are and other options like initial column ordinals.  *(See table below)*
>
>   |Property Name  | Data Type |   Purpose | Required|
>   |:----:|:----:|:----|:----:|
>   |uniqueIdName|string|Unique identifier used in the bound dataset.|Yes|
>   |columns|xgGridColumn[]|Array of xgGridColumn objects that are used to define the bound dataset.|Yes|
>   |editSettings|xgGridEditSetting|How the grid editing functionality will work if being enabled and available.|Yes|
> 
>   ## Column Configuration - xgGridColumn
>   
>   >   `import {`...**`xgGridColumn`**...`} from './xg-grid.module';`
> 
> The xgGridColumn is responsible for letting the xgGrid know what do do with the dataset bound to it.  *(See table below)*
> 
>   |Property Name  | Data Type |   Purpose |Required|
>   |:----:|:----:|:----|:----:|
>   |field|string|The literal name of the field that the column will be bound to in the dataset.|Yes|
>   |header|string|The *title* of the column associated with the field.|Yes|
>   |display|string|This controls whether to show the column by default or not.  Valid values are `table-cell`, to show, or `none` to hide|Yes|
>   |dataType|string|This lets the grid and all of its components know how to deal with the values in the dataset.  Valid values can be `string`, `date`, `number`|Yes|
>   |formatter|DataFormatter|This is to support formatting.  Valid values `Phone` or `Default`|No|
>   |canEdit|boolean|Whether this columns data can be edited.|No|
>
>   ## Grid Configuration - xgGridEditSetting
>
>   >   `import {`...**`xgGridEditSetting`**...`} from './xg-grid.module';`
> 
>   The xgGridEditSetting controls whether the xgGrid will allow a user to edit the various data bound to it as well as how that interaction takes place.
>
>   |Property Name  | Data Type |   Purpose |Required|
>   |:----:|:----:|:----|:----:|
>   |editEnabled|boolean|When `true` the grid supports editing functionality|Yes|
>   |editMode   |GridEditMode|Controls whether the editing interactions are `inline` or `popup` modes.|Yes|


# xgGrid Installation/Setup:

### Angular Component & Module Information:

>   module:   `xgGridModule`
> 
>   class:    `xgGridComponent`
> 
>   selector:   `<xg-grid></xg-grid>`

## Step 1: 
*Purpose: import common component library to gain access to the grid functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`
> 
## Step 2: 
*Purpose: Add supporting styles in **angular.json** or **angular-cli.json** to ensure that the grid and its features follow outlined features, functionality and business requirements.*

>   "styles": [
> 
> ...
> 
> `"node_modules/font-awesome/css/font-awesome.min.css",
> "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
> "node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
> "node_modules/primeng/resources/themes/nova-light/theme.css",
> "node_modules/primeng/resources/primeng.min.css",
> "node_modules/primeicons/primeicons.css",`
> 
> ...
> 
> ],

## Step 3: 
*Purpose:  Import xgGrid Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgGridModule**,**XgGridComponent**} from '@imaginecom/common-component-lib';


## Step 4:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgGridComponent**`],
>       imports: [`**XgGridModule**`],
>       providers: [],
>       exports: [`**XgGridComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
>   `<xg-grid  [gridConfig]="`**mygridConfig**`" [(data)]="`**myData**`" (onGridDataChange)="onGridDataChange($event)"></xg-grid>`

### TypeScript (*ex. my-component-component.ts*):
>`
> //  Column Data Configuration:
>   const mygridConfig: Configuration = {
>       uniqueIdName: 'AccountExecutiveId',
>       columns: [
>       { field: 'AccountExecutiveId', header: 'Id', display: 'table-cell', dataType: 'number', ordinal: 0 },
>   { field: 'FirstName', header: 'First Name', display: 'table-cell', dataType: 'string', ordinal: 1, canEdit: true },
>    { field: 'LastName', header: 'Last Name', display: 'table-cell', dataType: 'string', ordinal: 2 },
>    { field: 'CreatedDate', header: 'Created Date', display: 'none', dataType: 'date', ordinal: 3 },
>    { field: 'Phone', header: 'Phone', display: 'none', dataType: 'number', ordinal: 4, formatter: dataFormatter.Phone },
>    { field: 'PhoneExt', header: 'Phone Extention', display: 'none', dataType: 'number', ordinal: 5 },
>    { field: 'DefaultSalesOffice', header: 'Default Sales Office', display: 'table-cell', dataType: 'string', ordinal: 6 }
>],
>editSettings: 
>    {
>    editEnabled:true,
>    editMode: GridEditMode.inline
>    }
>}`

>   *Note:  Grid data can be assigned to any variable that follows the associacted *xgGridgridConfiguration* as long as it is an array of objects (see below)*
>
>   `myData: any[] = [{...}]`

> *Note `(onGridDataChange)="onGridDataChange($event)"` method to get the data from grid 
___

# xgGrid - Properties

| Property      | Data Type     | Default Value  |
|:-------------:|:-------------:| :-----:|
| gridConfig  | xgGridgridConfiguration | null |
| data          | `[Object]`    |   null |
| enableGlobalFilter | boolean      |   true |
| showColumnFilterRow | boolean      |   false |
| allowColumnReordering | boolean      |   true |
