# Navigation Service

> class: **NavigationService**

Navigation Service help to finds Navigation items for showing in a menu, breadcrumbs...
Navigation Items organized to levels. 

Navigation Service has observable property **currentNavigationItems**. You can subscribe on change active item.

The current value of currentNavigationItems it an array which contained an active item on each level.

Service subscribed on route change and emit a new list of active items. 
The activated route can have a **navigationItemId** property in data. Navigation service tries to find navigation item by id. If id doesn't exist or navigationItemId not set for the activated route. Navigation service compares route URL and navigation items URL without an exact match and finds navigation item on the deepest level. Find parent items based on the structure of navigation items.

```
interface INavigationItem {
    parentId: number;
    id: number;
    name: string;
    url?: string;
    level?: number,
    position?: number;
    icon?: string;
    isHidden?: boolean;
    externalRedirect?: boolean;
    target?: string;
}
```


