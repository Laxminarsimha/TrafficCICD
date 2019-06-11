## Column Resizing

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1. No requirements at this time to outline this.

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | showColumnFilterRow 	|    boolean    	|      true     	|

### Code Details

>   By default the xgGrid allows a user to resize their columns.  You can disable this feature by using the `@Input()` value **[allowColumnResize]**=" **false**"
>
>   *Example:*
>  
> `<xg-grid [`**allowColumnResize**`]="`**false**`" [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
> 
___