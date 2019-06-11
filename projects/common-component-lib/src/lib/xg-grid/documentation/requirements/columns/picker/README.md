## Column Picker

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Current UI/UX Guidelines Don't have this outlined that I can see at this time

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | showColumnPicker   	|    boolean    	|      false     	|
>   | showToolbarSection   	|    boolean    	|      false     	|

### Code Details

>   Turn on the xgGrid column picker by using the `@Input()` value **[showColumnPicker]**=" **true**".  *Note:*  That the the `@Input()` value **[showToolbarSection]**=" **true**" must be turned on to allow the icon to be present in the UI.

*Example:*
>   `<xg-grid [`**showColumnPicker**`]="true" [`**showToolbarSection**`]="true"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___