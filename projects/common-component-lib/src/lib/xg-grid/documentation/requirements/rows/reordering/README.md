## Row Reordering

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Reorder multiple rows by drag and drop

### Related Properties
>
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:---------------------:|:-----------------:|:-----------------:|
>   | allowRowReordering 	|    boolean    	|      false     	|
>   | allowRowSelection 	|    boolean    	|      false     	|


### Code Details

>   Turn on the row re-ordering functionality by using the `@Input()` value **[allowRowReordering]**=" **true**"
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
