# Imagine Communications - XgButton

>   **XgButton** is a form checkbox element with custom validations.
>   
>   *Overview:*  The XgButton is designed to be as fexlible as possible. XgButton will come with basic properties.

# Properties provided for XgButton.
>   |Property Name  | Data Type | Required  | Default Value    | Allowed Values   |    Purpose                     -----------------------------------------------------------------------------------------------------
    | type          | string    | No        | 'button'         | 'button','submit',|  type of input to render
                                                                 'reset"             ex: button or submit,                                                 or reset e.t.c
    ------------------------------------------------------------------------------------------------------   
    | label        | string     | No        | NDV              | NDV               | render button with label
    -------------------------------------------------------------------------------------------------------
    | disabled      | boolean   | No        | false            | true, false     | to disable the xgButton
     -------------------------------------------------------------------------------------------------------
    | icon          | string    | No        | NDV              | NDV            | to apply icon to XgButton
     ----------------------------------------------------------------------------------------------------------
    | iconPos       | string    | No        | NDV              | NDV            | to apply the position of the
                                                                                  icon to XgButton
    -----------------------------------------------------------------------------------------------------------
    | onClick       |Event Emitter| No      | NDV              | function       | triggers on click  from
                                                                                   xgButton
    -------------------------------------------------------------------------------------------------------
    | onBlur        |Event Emitter| No      | NDV              | function       | triggers on focus out from
                                                                                  xgButton
    --------------------------------------------------------------------------------------------------------
    | onFocus       |Event Emitter| No      | NDV              | function       | triggers on focus to                                                                                                             xgButton
    --------------------------------------------------------------------------------------------------------

# XgButton Installation/Setup:

### Angular Component & Module Information:

> 
>   class:    `XgButtonComponent`
> 
>   selector:   `<xg-button></xg-button>`

## Step 1: 
*Purpose: import common component library to gain access to the XgButton functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`
> 

## Step 2: 
*Purpose:  Import XgButton Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgButtonComponent**} from '@imaginecom/common-component-lib';


## Step 3:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgButtonComponent**`],
>       imports: [],
>       providers: [],
>       exports: [`**XgButtonComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
> `<xg-button type="button" label="fieldName" (onClick)="handleClick($event) icon="icons" iconPos="iconPosition" ></xg-button>`
-- for disabled
>   `<xg-button disabled></xg-button>`