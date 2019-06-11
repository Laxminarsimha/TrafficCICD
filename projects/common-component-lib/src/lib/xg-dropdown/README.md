# Imagine Communications - xgDropdown

>   **xgDropdown** is a form dropdown element with custom validations.
>   
>   *Overview:*  The xgDropdown is designed to be as fexlible as possible. xgDropdown will come with basic validations.

# Properties provided for xgDropdown.
> | Property Name   | Data Type   | Required | Default Value   | Allowed Values   |    Purpose 
    --------------------------------------------------------------------------------------------------------
  | options         | array       | Yes       | []             | [],[{}]          | to load dropdown list
    --------------------------------------------------------------------------------------------------------
  | displayValue    | string      | Yes (if   | NDV            | NDV              | display field of                                         array of                                          dropdown array.
                                     objects)                                             
    --------------------------------------------------------------------------------------------------------
  | keyValue        | string      | Yes (If   | NDV            | NDV              | key field that binds                                     array of                                        dropdown array.
                                     objects)
    --------------------------------------------------------------------------------------------------------
  | readOnly        | boolean     | No        | false          | true, false      | to readOnly the                                                                                          xgDropdown
    --------------------------------------------------------------------------------------------------------
  | label           | string      | No        | NDV            | NDV              | render dropdown with                                                                                      label
    --------------------------------------------------------------------------------------------------------
  | placeholder     | string      | No        | NDV            | NDV              | Default text to                                                                                           display when no option                                                                                    is selected.
    --------------------------------------------------------------------------------------------------------
  | disabled        | boolean     | No        | false          | true, false      | to disable the                                                                                            xgDropdown
    --------------------------------------------------------------------------------------------------------
  | required        | boolean     | No        | false          | true, false      | required validation for                                                                                   xgDropdown
    --------------------------------------------------------------------------------------------------------
  | filter          | boolean     | No        | false          | true, false      |  When specified,                                                                                           displays an input                                                                                         field to filter the                                                                                       items on keyup.
    --------------------------------------------------------------------------------------------------------
  | selected        | string      | No        | NDV             | NDV             | Binds the value in the                                                                                    xgDropdown
    --------------------------------------------------------------------------------------------------------
  | name            | string      | No        | NDV             | NDV             | Name of the xgDropdown
    --------------------------------------------------------------------------------------------------------
  | scrollHeight    | string      | No        | 200px           | 200px           | Height of the scrollbar.
    --------------------------------------------------------------------------------------------------------
  | style           | string      | No        | NDV             | NDV             | Inline style of the                                                                                       xgDropdown
    --------------------------------------------------------------------------------------------------------
  | filterPlaceholder | string    | No        | NDV             | NDV             | Placeholder text to                                                                                       show when filter input                                                                                    is empty.
    --------------------------------------------------------------------------------------------------------
  | autoWidth       | boolean    | No        | true            | true, false      | Calculates the width                                                                                      based on options width,                                                                                   set to false for                                                                                          custom width.
    --------------------------------------------------------------------------------------------------------
  | autofocus       | boolean    | No        | false           | true, false      | When present, it                                                                                          specifies that the                                                                                        component should                                                                                          automatically get focus                                                                                   on load.
    --------------------------------------------------------------------------------------------------------
  | resetFilterOnHide | boolean  | No        | false           | true, false      | Clears the filter value                                                                                   when hiding the                                                                                           xgDropdown.
    --------------------------------------------------------------------------------------------------------
  | emptyFilterMessage| string   | No        | No results found |                | Text to display when                                                                                      filtering does not                                                                                        return any results.
    --------------------------------------------------------------------------------------------------------
  | showClear         | boolean  | No        | false            | true, false    | When enabled, a clear                                                                                     icon is displayed to                                                                                      clear the value.
    --------------------------------------------------------------------------------------------------------
  | resetFilterOnHide | boolean  | No        | false            | true, false    | Clears the filter value                                                                                   when hiding the                                                                                           xgDropdown.
    --------------------------------------------------------------------------------------------------------
  | showTransitionOptions| string| No        | 225ms ease-out   |                | Transition options of                                                                                     the show animation.
    --------------------------------------------------------------------------------------------------------
  | hideTransitionOptions| string| No        | 195ms ease-in    |                | Transition options of                                                                                     the hide animation.
    --------------------------------------------------------------------------------------------------------
  | onValueChange     |Event Emitter| No     | NDV              | function       | this event is triggred                                                                                    everytime when there is                                                                                   a change in xgDropdown
    --------------------------------------------------------------------------------------------------------
  | onBlur            |Event Emitter| No     | NDV              | function       | triggers on focus out                                                                                     from xgDropdown
    --------------------------------------------------------------------------------------------------------
  | onFocus           | Event Emitter| No    | NDV              | function       | triggers on focus to                                                                                      xgDropdown
    --------------------------------------------------------------------------------------------------------
  | onClick           | Event Emitter| No    | NDV              | function       | Callback to invoke when                                                                                   component is clicked.
    --------------------------------------------------------------------------------------------------------
  | onShow            | Event Emitter: Animation event| No | NDV| function       | Callback to invoke when                                                                                   dropdown overlay gets                                                                                     visible.
    --------------------------------------------------------------------------------------------------------
  | onHide            | Event Emitter: Animation event| No | NDV| function       | Callback to invoke when                                                                                   dropdown overlay gets                                                                                     hidden
    --------------------------------------------------------------------------------------------------------

    *Note:  Here NDV implies "NO Default Value"
     

# xgDropdown Installation/Setup:

### Angular Component & Module Information:

> 
>   class:    `XgDropdownComponent`
> 
>   selector:   `<img-lib-xg-dropdown></img-lib-xg-dropdown>`

## Step 1: 
*Purpose: import common component library to gain access to the xgDropdown functionality*

>   `npm install @imaginecom\common-component-lib --save-dev`
> 

## Step 2: 
*Purpose:  Import xgDropdown Component and Module to your project module or component using Angular syntactical requirement for complilation*

> import {**XgDropdownComponent**} from '@imaginecom/common-component-lib';


## Step 3:
*Example: Adding to module implmentation*
>   `@NgModule({
>       declarations: [`**XgDropdownComponent**`],
>       imports: [],
>       providers: [],
>       exports: [`**XgDropdownComponent**`] 
> });`

# Example Usage: 
    
### Markup (*ex. my-component-component.html*):
-- for disabled
>   `<img-lib-xg-dropdown [disabled]="true"></img-lib-xg-dropdown>`
-- for readOnly 
>   `<img-lib-xg-dropdown [readOnly]="false"></img-lib-xg-dropdown>`
-- for required 
>   `<img-lib-xg-dropdown [required]="true"></img-lib-xg-dropdown>`
-- for filter 
>   `<img-lib-xg-dropdown [filter]="true"></img-lib-xg-dropdown>`
-- for label 
>   `<img-lib-xg-dropdown label="fieldName"></img-lib-xg-dropdown>`
-- for displayValue 
>   `<img-lib-xg-dropdown displayValue="fieldName"></img-lib-xg-dropdown>`
-- for keyValue 
>   `<img-lib-xg-dropdown keyValue="fieldName"></img-lib-xg-dropdown>`
-- for options
>   `<img-lib-xg-dropdown options="fieldName"></img-lib-xg-dropdown>`
-- for selected 
>   `<img-lib-xg-dropdown selected="fieldName"></img-lib-xg-dropdown>`
-- for placeholder
>   `<img-lib-xg-dropdown placeholder="fieldName"></img-lib-xg-dropdown>`
-- for name
>   `<img-lib-xg-dropdown name="fieldName"></img-lib-xg-dropdown>`
-- for scrollHeight
>   `<img-lib-xg-dropdown scrollHeight="fieldName"></img-lib-xg-dropdown>`
-- for style
>   `<img-lib-xg-dropdown style="fieldName"></img-lib-xg-dropdown>`
-- for filterPlaceholder
>   `<img-lib-xg-dropdown filterPlaceholder="fieldName"></img-lib-xg-dropdown>`
-- for autoWidth
>   `<img-lib-xg-dropdown [autoWidth]="true"></img-lib-xg-dropdown>`
-- for autofocus
>   `<img-lib-xg-dropdown [autofocus]="false"></img-lib-xg-dropdown>`
-- for resetFilterOnHide
>   `<img-lib-xg-dropdown [resetFilterOnHide]="false"></img-lib-xg-dropdown>`
-- for showClear
>   `<img-lib-xg-dropdown [showClear]="false"></img-lib-xg-dropdown>`
-- for showTransitionOptions
>   `<img-lib-xg-dropdown showTransitionOptions="fieldName"></img-lib-xg-dropdown>`
-- for hideTransitionOptions
>   `<img-lib-xg-dropdown hideTransitionOptions="fieldName"></img-lib-xg-dropdown>`