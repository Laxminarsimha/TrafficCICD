## Column Filtering

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Multiple column filters applies to the entire record set
 2.  Multiple column search (==, <>, \=, *) applies to the entire record set

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | showColumnFilterRow 	|    boolean    	|      false     	|

### Code Details

>   Turn on the column filters by using the `@Input()` value **[showColumnFilterRow]**=" **true**"
>
>   *Example:*
>  
> `<xg-grid [`**showColumnFilterRow**`]="`**true**`" [`**enableGlobalFilter**`]="`**false**`"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
> 
>   ***IMPORTANT!!!***  Ensure that when using the `showColumnFilterRow` option to **true**,  that you set the xgGridOption `enableGlobalFilter`  to **false**" as this causes confusion to the user when both options are enabled at the same time.
___