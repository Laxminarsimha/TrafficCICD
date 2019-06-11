## Column Sorting

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Sort by multiple Columns
   
### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | allowColumnSorting 	|    boolean    	|      true     	|

### Code Details

>   Column sorting is turned on by default, however you can supress this functionality by changing the `@Input()` value **[allowColumnSorting]**=" **false**"
>
>   *Example:*
>  
> `<xg-grid [`**allowColumnSorting**`]="`**false**`" [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`