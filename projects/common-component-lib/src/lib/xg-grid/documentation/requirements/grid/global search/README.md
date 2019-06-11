## Global Search
>   This demonstrates the ability for the xgGrid to globally search it's assigned data for a value entered into a text field.
### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Global Search applies to the entire record set

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | enableGlobalFilter 	|    boolean    	|      true     	|

### Code Details

>   Turn on the global filter by using the `@Input()` value **[enableGlobalFilter]**=" **true**"

*Example:*
>   `<xg-grid [`**enableGlobalFilter**`]="true"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___