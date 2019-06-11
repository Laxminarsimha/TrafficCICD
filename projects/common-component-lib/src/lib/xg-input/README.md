# Imagine Communications - xgInput

>   **xgInput** is a form Input element with custom validations.
>   
>   *Overview:*  The xgInput is designed to be as fexlible as possible. xgInput will come with basic validations.

# Properties provided for xgInput.
>   |Property Name  | Data Type | Required  | Default Value  | Allowed Values   |    Purpose                     -----------------------------------------------------------------------------------------------------
    | type          | string    | No        | 'text'         | 'text','email',  |  type of input to render
                                                               'password','zip'    ex: textbox or email box 
                                                               'phone','number'          or phonebox e.t.c
    ------------------------------------------------------------------------------------------------------

    | labelName     | string    | No        | NDV             | NDV             | render inpubox with label
    -------------------------------------------------------------------------------------------------------
    | placeholder   | string    | No        | NDV             | NDV             | applied given placeholder
                                                                                   to xgInput.
    -------------------------------------------------------------------------------------------------------
    | disabled      | boolean   | No        | false           | true, false     | to disable the xgInput
    -------------------------------------------------------------------------------------------------------
    | required      | boolean   | No        | false           | true, false     | required validation for                                                                                 xgInput
    -------------------------------------------------------------------------------------------------------
    | validateOn    | string    | No        | 'change'        | 'change','blur' | validation will be
                                                                'submit'          performed based on this
    --------------------------------------------------------------------------------------------------------
    | minlength     | number    | No        | password : 8    | any number      | minlength validations are 
                                              others: 0                           applied for textbox,
                                                                                  numberbox,zip.
    --------------------------------------------------------------------------------------------------------
    | maxlength     | number    | No        | null            | any number      | maxlength to restrict the                                                                               xgInput size.
    --------------------------------------------------------------------------------------------------------
    |validate       | boolean   | No        | false           | true, false     | whether to validate 
     Password                                                                     input password or not
    --------------------------------------------------------------------------------------------------------
    | password      | object    | No        | {                                 | you can set what
      validation                                                                  validations you need to 
      Options                                 'checkNumber': false,               apply for the password
                                              'checkCapitalLetter': false,        ex: if you only need
                                              'checkSmallLetter': false,          atleast 1 number 
                                              'checkMinlength': false,            validation.then provide
                                              'checkSymbol': false,               checkNumber as true.
                                              'minlength': 8
                                              }
    -------------------------------------------------------------------------------------------------------
    |onValueChange  |Event Emitter| No      | NDV              | function       | this event is triggred 
                                                                                  everytime when there is a change in xgInput
    -------------------------------------------------------------------------------------------------------
    | onBlur        |Event Emitter| No      | NDV              | function       | triggers on focus out from
                                                                                  xgInput
    --------------------------------------------------------------------------------------------------------
    | onFocus       |Event Emitter| No      | NDV              | function       | triggers on focus to                                                                                    xgInput
    --------------------------------------------------------------------------------------------------------

    *Note:  Here NDV implies "NO Default Value"
     

# xgInput Installation/Setup:

### Angular Component & Module Information:

> 
>   class:    `XgInputComponent`
> 
>   selector:   `<xg-input></xg-input>`

## Step 1: 
*Purpose: import common component library to gain access to the xgInput functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`
> 

## Step 2: 
*Purpose:  Import xgInput Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgInputComponent**} from '@imaginecom/common-component-lib';


## Step 3:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgInputComponent**`],
>       imports: [],
>       providers: [],
>       exports: [`**XgInputComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
-- for textBox
>   `<xg-input type="text" required disabled [(ngModel)]="fieldName"></xg-input>`
-- for email
>   `<xg-input type="email" required disabled [(ngModel)]="fieldName"></xg-input>`
-- for phone
>   `<xg-input type="phone" required disabled [(ngModel)]="fieldName"></xg-input>`
-- for number
>   `<xg-input type="number" required disabled [(ngModel)]="fieldName"></xg-input>`
-- for password
>   `<xg-input type="password" required disabled validatePassword="true" passwordvalidationOptions="{'checkNumber': true,'checkCapitalLetter': false,}" [(ngModel)]="fieldName"></xg-input>`
-- for zip
>   `<xg-input type="zip" required disabled [(ngModel)]="fieldName"></xg-input>`
#TO DO List
> -- Allowing user defined patterns for email
> -- customize masks for inputs 
> -- custome error messages should be accepted from the user.