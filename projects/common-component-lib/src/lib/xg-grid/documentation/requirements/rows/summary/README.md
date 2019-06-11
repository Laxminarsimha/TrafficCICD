## Row Summary Row

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Show the user a total of filtered/selected rows
 2.  Show user error message if they have filtered out all records

### Related Properties
>
>   |    Property Name   	    |   Data Type   	| Default Value 	|
>   |:---------------------:    |:-----------------:|:-----------------:|
>   | showSummaryRow     	    |    boolean    	|      true     	|
>   | showTotalRecordCount 	    |    boolean    	|      true     	|
>   | showSelectedRecordCount 	|    boolean    	|      true     	|


### Code Details

>   Turn on the summary row by using the `@Input()` value **[showSummaryRow]**=" **true**"*(default value)*
>   To allow **multiple** row re-ordering functionality also use the `@Input()` value **[allowRowSelection]**=" **true**"
>   
>   *Example:*
> 
>   `<xg-grid [`**allowRowReordering**`]="true"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
>   
>   *for multiple row re-ordering:*
> 
>   `<xg-grid [`**allowRowReordering**`]="true"  [`**allowRowSelection**`]=" true" [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___