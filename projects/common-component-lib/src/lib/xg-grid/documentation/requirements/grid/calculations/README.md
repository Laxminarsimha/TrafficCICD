## xgGrid Grid Summaries (Footer Row)
>   This demonstrates the ability for the xgGrid contain a footer row that contains calculation, column configuraiton based data.  The way that this works is by leveraging the column configurations data to look at the datatype property and allow for all business driven functionality.
> 
> 
### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Grid summaries: built-in record count, min, max, average and sum per column

### Grid Related Properties
>   
>   |    Property Name   	    |   Data Type   	                | Default Value 	|  Property Target                  |   Description of Use                                                                      |
>   |:------------------:	    |:-------------:	                |:-------------:	|:-------------:                    | :--------------------                                                                     |
>   | showCalculationsRow       |   boolean?                        |   false           |   xgGrid                          | Show/Hide the entire Row.                                                                 |
>   | calculationsEnabled       |   boolean?                        |   false           |   Configuration.column    | Enable the column for calculations.                                                       |
>   | calculationConfiguration  |   CalculationConfiguration   |   null            |   Configuration.column    | Object providing customization of the columns calculation interactions  and accessibility.|

### xG Custom Properties
>   
>   |    Property Name   	    |   Data Type   	                | Default Value 	|  Property Target                   |   Description of Use                                                                      |
>   |:------------------:	    |:-------------:	                |:-------------:	|:-------------:                     | :--------------------                                                                     |
>   | allowUserSelection        |   boolean?                        |   true            |   CalculationConfiguration    | Show/Hide calculations selection for the user.                                            |
>   | defaultCalculations       |  CalculationFunction[]?    |   *               |   CalculationConfiguration    | This can be used to limit the calculation output for the column.                          |

## *Helpers :)*
>   There are base helpers for *Numerics* and *Dates*!!!
> 
>   |   Class Name |  Data Type     |       Options       |
>   |:---:|:---:|:---:|
>   |CalculationsForNumerics |CalculationFunction[]| Average/Sum/Count/Min/Max|
>   |CalculationsForDates |CalculationFunction[]| MinDate/MaxDate|

### Code Details

>   To enable the calculations row use the `@Input()` value **[showCalculationsRow]**="**true**"
> 

*Example (enable calulations row):*
>   `<xg-grid [`**showCalculationsRow**`]="true"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
>   