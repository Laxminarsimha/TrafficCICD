export const ROOT_NAVIGATION_ID = 0;

export interface INavigationItem {
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
