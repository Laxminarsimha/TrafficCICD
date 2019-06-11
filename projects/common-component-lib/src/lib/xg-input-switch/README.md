# Imagine Communications - xgInputSwitch

>   **xgInputSwitch** is used to select a boolean value.
>   
>   *Overview:*  The xgInputSwitch is designed to be as fexlible as possible.

# Properties provided for xgInputSwitch.
>   | Property Name  | Data Type     | Required | Default Value | Allowed Values |    Purpose 
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | readOnly       | boolean       | No       | false         | true, false    | to readOnly the xgInputSwitch
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | label          | string        | No       | NDV           | NDV            | render input switch with label
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | disabled       | boolean       | No       | false         | true, false    | to disable the xgInputSwitch
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | checked        | boolean       | No       | false         | true, false    | Binds the value in the xgInputSwitch
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | name           | string        | No       | NDV           | NDV            | Name of the xgInputSwitch
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | id             | string        | No       | NDV           | NDV            | Id of the xgInputSwitch
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    | onChange       | Event Emitter | No       | NDV           | function       | this event is triggred everytime when there is a change in xgInputSwitch
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    
    *Note:  Here NDV implies "NO Default Value"
     

# xgInputSwitch Installation/Setup:

### Angular Component & Module Information:

> 
>   class:    `XgInputSwitchComponent`
> 
>   selector:   `<img-lib-xg-input-switch></img-lib-xg-input-switch>`

## Step 1: 
*Purpose: import common component library to gain access to the xgInputSwitch functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`

## Step 2: 
*Purpose:  Import xgInputSwitch Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgInputSwitchComponent**} from '@imaginecom/common-component-lib';

## Step 3:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgInputSwitchComponent**`],
>       imports: [],
>       providers: [],
>       exports: [`**XgInputSwitchComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
-- for disabled
>   `<img-lib-xg-input-switch [disabled]="true"></img-lib-xg-input-switch>`
-- for readOnly 
>   `<img-lib-xg-input-switch [readOnly]="false"></img-lib-xg-input-switch>`
-- for label 
>   `<img-lib-xg-input-switch label="fieldName"></img-lib-xg-input-switch>`
-- for checked  
>   `<img-lib-xg-input-switch [checked]="fieldName"></img-lib-xg-input-switch>`
-- for name
>   `<img-lib-xg-input-switch name="fieldName"></img-lib-xg-input-switch>`
-- for id
>   `<img-lib-xg-input-switch id="fieldName"></img-lib-xg-input-switch>`