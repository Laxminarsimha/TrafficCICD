## Column Reordering

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Reorder columns by drag and drop

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | allowColumnReordering 	|    boolean    	|      true     	|

### Code Details

>   Turn on the column re-ordering by using the `@Input()` value **[allowColumnReordering]**=" **true**"
>   
>   *Example:*
> 
>   `<xg-grid [`**allowColumnReordering**`]="true"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___