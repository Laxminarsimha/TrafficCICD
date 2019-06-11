# Menu

> class: **MenuComponent**

Menu component shows navigation items which provide a navigation service. 
For show items in menu from any level, need to have a selected item on previous level. 

@Input() **level**: number - Which level menu need to show. 
@Input() **showSubLevels**: number - Navigation item can have a sub-items, that property set how many sub-levels can to show.
@Input() **collapseOnSelect**: boolean = true; - The navigation tree should collapse if selected another item.


