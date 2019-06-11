# Imagine Communications - xgCheckbox

>   **xgCheckbox** is a form checkbox element with custom validations.
>   
>   *Overview:*  The xgCheckbox is designed to be as fexlible as possible. xgCheckbox will come with basic validations.

# Properties provided for xgCheckbox.
>   |Property Name  | Data Type | Required  | Default Value  | Allowed Values   |    Purpose                     -----------------------------------------------------------------------------------------------------
    | readOnly      | boolean   | No        | false          | true, false      | to readOnly the xgCheckbox
    ------------------------------------------------------------------------------------------------------

    | labelName     | string    | No        | NDV             | NDV             | render inpubox with label
    -------------------------------------------------------------------------------------------------------
    | disabled      | boolean   | No        | false           | true, false     | to disable the xgCheckbox
    -------------------------------------------------------------------------------------------------------
    | required      | boolean   | No        | false           | true, false     | required validation for                                                                                 xgCheckbox
    -------------------------------------------------------------------------------------------------------
    | labelLeft     | boolean   | No        | false           |true, false      | to Align Label before 
                                                                                  xgCheckbox
    --------------------------------------------------------------------------------------------------------
    | cbStyleClass  | string    | No        | NDV             | any class       |  to Style xgCheckbox
    --------------------------------------------------------------------------------------------------------
    | lbStyleClass  | string    | No        | NDV             | any class       | to Style xgCheckbox label.
    --------------------------------------------------------------------------------------------------------
    | binary        | boolean   | No        | false           | true, false     |to bind model value with
                                                                                  0 or 1    
    --------------------------------------------------------------------------------------------------------
    |onValueChange  |Event Emitter| No      | NDV              | function       | this event is triggred 
                                                                                  everytime when there is a change in xgCheckbox

# xgCheckbox Installation/Setup:

### Angular Component & Module Information:

> 
>   class:    `XgCheckboxComponent`
> 
>   selector:   `<xg-checkbox></xg-checkbox>`

## Step 1: 
*Purpose: import common component library to gain access to the XgCheckbox functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`
> 

## Step 2: 
*Purpose:  Import xgCheckbox Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgCheckboxComponent**} from '@imaginecom/common-component-lib';


## Step 3:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgCheckboxComponent**`],
>       imports: [],
>       providers: [],
>       exports: [`**XgCheckboxComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
> `<xg-checkbox [binary]="true" required></xg-checkbox>`