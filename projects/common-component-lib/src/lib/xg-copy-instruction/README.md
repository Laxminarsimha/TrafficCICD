# Imagine Communications - xgCopyInstruction

>   **xgCopyInstruction** is a form group.
>   
>   *Overview:*  The xgCopyInstruction is designed to serve a header input for copy instructions.

# Properties provided for xgCopyInstruction.
>   |Property Name  | Data Type | Required  | Default Value  | Allowed Values   |    Purpose                     -----------------------------------------------------------------------------------------------------


    *Note:  Here NDV implies "NO Default Value"
     

# xgCopyInstruction Installation/Setup:

### Angular Component & Module Information:

> 
>   class:    `XgCopyInstructionComponent`
> 
>   selector:   `<xg-copy-instruction></xg-copy-instruction>`

## Step 1: 
*Purpose: import common component library to gain access to the xgCopyInstruction functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`
> 

## Step 2: 
*Purpose:  Import xgCopyInstruction Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgCopyInstructionComponent**} from '@imaginecom/common-component-lib';


## Step 3:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgCopyInstructionComponent**`],
>       imports: [],
>       providers: [],
>       exports: [`**XgCopyInstructionComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
-- for general use

#TO DO List
> -- Allowing user defined patterns for email
> -- customize masks for inputs 
> -- custome error messages should be accepted from the user.