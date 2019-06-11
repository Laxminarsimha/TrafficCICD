# Imagine Communications - xgTextarea

> **xgTextarea** is a form textarea element with custom validations.
>
> _Overview:_ The xgTextarea is designed to be as fexlible as possible. xgTextarea will come with basic validations.

# Properties provided for xgTextarea.

> |Property Name | Data Type | Required | Default Value | Allowed Values | Purpose 
  -----------------------------------------------------------------------------------------------------
  | readOnly      | boolean   | No        | false          | true, false      | to readOnly the xgTextarea
    ------------------------------------------------------------------------------------------------------

  | labelName     | string    | No        | NDV             | NDV             | render textarea with label
    -------------------------------------------------------------------------------------------------------
  | disabled      | boolean   | No        | false           | true, false     | to disable the xgTextarea
    -------------------------------------------------------------------------------------------------------
  | required      | boolean   | No        | false           | true, false     | required validation for xgTextarea
    -------------------------------------------------------------------------------------------------------
  | placeholder   | string    | No        | NDV             | NDV             | applied given placeholder to xgTextarea.
    ------------------------------------------------------------------------------------------------------------
  | validateOn    | string    | No        | 'change'        | 'change','blur' | validation will be
                                                                'submit'          performed based on this
   --------------------------------------------------------------------------------------------------------------
  | minlength     | number    | No        | 0                | any number      | minlength characters to enter in                                                                                                        xgTextarea.
    ------------------------------------------------------------------------------------------------------------
  | maxlength     | number    | No        | 300              | any number      | maxlength to restrict the                                                                                                        xgTextarea characters.
  ------------------------------------------------------------------------------------------------------------
  | rows          | string    | No        | 4                | any number      | rows to restrict the                                                                                                              xgTextarea size.
    -----------------------------------------------------------------------------------------------------------
  | cols          | string    | No        | 20              | any number      | cols to restrict the                                                                                                             xgTextarea size.
  -----------------------------------------------------------------------------------------------------------

  |onValueChange  |Event Emitter| No      | NDV              | function       | this event is triggred
                                                                                  everytime when there is a change in xgTextarea
  ---------------------------------------------------------------------------------------------------------------------------------
  | onBlur        |Event Emitter| No      | NDV              | function       | triggers on focus out from xgTextarea
  ---------------------------------------------------------------------------------------------------------------------------------
  | onFocus     | Event Emitter| No       | NDV               | function       | triggers on focus to xgTextarea

# xgTextarea Installation/Setup:

### Angular Component & Module Information:

> class: `XgTextareaComponent`
>
> selector: `<img-lib-xg-textarea></img-lib-xg-textarea>`

## Step 1:

_Purpose: import common component library to gain access to the XgTextarea functionality_

> `npm install @imaginecom\common-component-lib --save-dev`

## Step 2:

_Purpose: Import XgTextarea Component and Module to your project module or component using Angular syntactical requirement for complilation_

> import {**XgTextareaComponent**} from '@imaginecom/common-component-lib';

## Step 3:

_Example: Adding to module implmentation_

> `@NgModule({ declarations: [`**XgTextareaComponent**`], imports: [], providers: [], exports: [`**XgTextareaComponent**`] });`

# Example Usage:

### Markup (_ex. my-component-component.html_):

-- for disabled

> `<img-lib-xg-textarea disabled></img-lib-xg-textarea>`
> -- for readOnly
> `<img-lib-xg-textarea readOnly></img-lib-xg-textarea>`
> -- for required
> `<img-lib-xg-textarea required ></img-lib-xg-textarea>`
> -- for label  
>  `<img-lib-xg-textarea labelName="fieldName"></img-lib-xg-textarea>`
> -- for placeholder
> `<img-lib-xg-textarea labelName="fieldName"></img-lib-xg-textarea>`
> -- for minlength
> `<img-lib-xg-textarea minlength="0"></img-lib-xg-textarea>`
> -- for rows
> `<img-lib-xg-textarea rows="4"></img-lib-xg-textarea>`
> -- for cols
> `<img-lib-xg-textarea cols="20"></img-lib-xg-textarea>`
> -- for minlength
> `<img-lib-xg-textarea minlength="number"></img-lib-xg-textarea>`
> -- for maxlength
> `<img-lib-xg-textarea maxlength="number"></img-lib-xg-textarea>`
> -- for onValueChange
> `<img-lib-xg-textarea (onValueChange)="change($event)"></img-lib-xg-textarea>`
> -- for onBlur
> `<img-lib-xg-textarea (onBlur)="change($event)"></img-lib-xg-textarea>`
> -- for onFocus
> `<img-lib-xg-textarea (onFocus)="change($event)"></img-lib-xg-textarea>`
