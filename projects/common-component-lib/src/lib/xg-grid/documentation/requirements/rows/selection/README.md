## Row Selection

### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Single/multiple rows selection

### Related Properties
>   
>   |    Property Name   	    |   Data Type   	            | Default Value 	|
>   |:------------------:	    |:-------------:	            |:-------------:	|
>   | allowRowSelection 	    |    boolean    	            |      false     	|
>   | showSelectedRecordCount   |    boolean                    |      true     	|
>   | useCheckBoxSelection      |    boolean                    |      true         |
>   | selectionMode             |    xgGridSelectionMode        |      Single       | 

### Code Details

>   Turn on the row selection features by using the `@Input()` value **[allowRowSelection]**=" **true**"
>
>   This feature, by default also shows the user a count of selected records in the summary area of the xgGrid.  If you want to suppress that you can change the `@Input()` value **[showSelectedRecordCount]**=" **false**".  To enable a user to select multiple records using the xgGrid use the `@Input()` value **[selectionMode]**=" **multiple**".  Using the  **[useCheckBoxSelection]**=" **false**" will hide a checkbox column however still setting the **[selectionMode]**=" **multiple**" will still be honored via click or touch.
> 
> *IMPORTANT!!!* Using the `'multiple'` selection mode with **[useCheckBoxSelection]**=" **true**" is redundant.  If using **[useCheckBoxSelection]**=" **true**" ensure that you have set the **[selectionMode]**=" **'None'**"
> 
>   *Example (Single Selection):*
> 
>   `<xg-grid [`**allowRowSelection**`]="true"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
>
>   or 
>
>   `<xg-grid [`**allowRowSelection**`]="true" [`**showSelectedRecordCount**`]="false" [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___