## xgGrid Exporting Data
>   This demonstrates the ability for the xgGrid to export data
### Requirements targeted from <a href="http://10.7.25.37:8090/display/XH/Grid+Requirements" target="_blank">UI/UX Standards</a>:

 1.  Export support

### Related Properties
>   
>   |    Property Name   	|   Data Type   	                    | Default Value 	                            |
>   |:------------------:	|:-------------:	                    |:-------------:	                            |
>   | allowExport       	|    boolean     	                    |      false                                 	|
>   | exportProcessingMode 	|    xgDataExportProcessingMode     	|      xgDataExportProcessingMode.ClientSide   	|
>   | exportSelectionMode 	|    xgDataExportSelctionMode        	|      xgDataExportSelctionMode.All            	|
>   | exportMode 	        |    xgDataExportMode               	|      xgDataExportMode.Default             	|

#### Customizing Exporting
>   |    Data Type   	                |   Options   	                                        | Description 	                                |
>   |:------------------:	            |:-------------:	                                    |:-------------	                            |
>   | xgDataExportProcessingMode       	|    ServerSide or ClientSide     	                    | Controls whether the processing of the export request is made on the client or the server.                                              	|
>   | xgDataExportSelctionMode       	|    All or Selection or UsersChoice     	            | Use this option set to 'lock down' a users ability to export selected records, all records or choose either.|
>   | xgDataExportMode                 	|    Default or Advanced or Automatic     	            | Default shows the modal selection with export buttons only.  Advanced allows column selection and reordering.  Automatic bypasses the modal and executes the export automatically for the user. |

### Code Details

>   To allow data exporting from the xgGrid use the `@Input()` value **[allowExport]**=" **true**"

*Example:*
>   `<xg-grid [`**allowExport**`]="`**true**`"  [gridConfig]="myGridConfig" [(data)]="myData"></xg-grid>`
___