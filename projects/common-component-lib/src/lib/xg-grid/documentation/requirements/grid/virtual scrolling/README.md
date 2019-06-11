## xgGrid Virtual Scrolling
>   This demonstrates the ability for the xgGrid to leverage virtual scrolling.  Use pagination, lazyloading and virtualScrolling properties (all set to true) and then set a pageRowCount to a size that is desireable.
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
>   | virtualScroll        	|    boolean    	|      false      	|

### Code Details

>   Turn on/off the xgGrid Pagination by using the `@Input()` value **[usePagination]**="**true|false**"
>   To change the page count variable use the the `@Input()` value **[pageRowCount]**="**#**"
>   To enable virtual scrolling turn the `@Input()` value **[virtualScroll]**="**true**"
> 
>   **Virtual / Server-side Properties**
>   ---
>   To trigger the loading/spinner indicator use the  `@Input()` value **[loading]**="**true/false**"
>   Use the  `@Input()` value **[lazyLoading]**="**true/false**" when leveraging the grids server side functionality for either infinite scrolling or paging

*Example:*
>   `<xg-grid [`usePagination`]="true"  [`pageRowCount`]="15" [gridConfig]="myGridConfig" [(data)]="myData" [`**loading**`]="true" [`**lazyLoading**`]="true"  [`**virtualScroll**`]="true"></xg-grid>`
___