## xgGrid Paging
>   This demonstrates the ability for the xgGrid to allow for paging it's data results.
> 
>   **Note**:  Server-side/virtual paging can be leveraged by using associated variables outlined in *Example 2*
> 
### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Server-side virtual scrolling  (infinite scrolling and/or paging)

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	|
>   |:------------------:	|:-------------:	|:-------------:	|
>   | usePagination     	|    boolean    	|      true     	|
>   | pageRowCount     	    |    number    	    |      5         	|
>   | loading        	    |    boolean    	|      false      	|
>   | lazyLoading        	|    boolean    	|      false      	|

### Code Details

>   Turn on/off the xgGrid Pagination by using the `@Input()` value **[usePagination]**="**true|false**"
>   To change the page count variable use the the `@Input()` value **[pageRowCount]**="**#**"
> 
>   **Virtual / Server-side Properties**
>   ---
>   To trigger the loading/spinner indicator use the  `@Input()` value **[loading]**="**true/false**"
>   Use the  `@Input()` value **[lazyLoading]**="**true/false**" when leveraging the grids server side functionality for either infinite scrolling or paging

*Example:*
>   `<xg-grid [`**usePagination**`]="false"  [`**pageRowCount**`]="15" [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
>   

*Example 2: (Virtual/server-side)*
>   `<xg-grid [`usePagination`]="true"  [`pageRowCount`]="15" [gridConfig]="myGridConfig" [(data)]="myData" [`**loading**`]="true" [`**lazyLoading**`]="true"></xg-grid>`
___