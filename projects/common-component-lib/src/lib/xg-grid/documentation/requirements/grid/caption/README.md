## xgGrid Caption
>   This demonstrates the ability for the xgGrid to show a caption for the grid.
### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  No requirement specified

### Related Properties
>   
>   |    Property Name   	|   Data Type   	| Default Value 	                            |
>   |:------------------:	|:-------------:	|:-------------:	                            |
>   | captionLabel       	|    string     	|      'Imagine Communications  - xg-grid'     	|

### Code Details

>   Change the caption label of the xgGrid using the `@Input()` value **[captionLabel]**=" **'My Custom Label'**"

*Example:*
>   `<xg-grid [`**captionLabel**`]="'My Custom Label'"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___