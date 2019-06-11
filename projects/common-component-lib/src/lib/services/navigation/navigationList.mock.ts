import { INavigationItem, ROOT_NAVIGATION_ID } from './navigation.interface';

export const NAVIGATIONLIST: INavigationItem[] = [
    {
        id: ROOT_NAVIGATION_ID,
        parentId: null,
        name: null,
        url: ''
    },
    {
        id: 1,
        parentId: ROOT_NAVIGATION_ID,
        position: 1,
        name: 'Schedule',
        url: 'schedule',
        icon: 'pi-calendar'
    },
    {
        id: 2,
        parentId: ROOT_NAVIGATION_ID,
        position: 1,
        name: 'Traffic',
        url: 'traffic',
        icon: 'pi-calendar'
    },
    {
        id: 22,
        parentId: 2,
        position: 1,
        name: 'Traffic Item',
        url: 'traffic/item',
        icon: ''
    },
    {
        id: 222,
        parentId: 22,
        position: 1,
        name: 'Traffic Item Id',
        url: 'traffic/item/id',
        icon: 'pi-calendar'
    },
    {
        id: 223,
        parentId: 22,
        position: 1,
        name: 'Traffic Item :Id',
        url: 'traffic/item/:id',
        icon: ''
    },
    {
        id: 21,
        parentId: 2,
        position: 2,
        name: 'Has External Redirect',
        url: 'http://xgschedule.xgproduct.com',
        target: '_blank',
        externalRedirect: true,
        icon: 'pi-money-bill'
    },
    {
        id: 3,
        parentId: ROOT_NAVIGATION_ID,
        position: 1,
        name: 'Sales',
        url: 'sales',
        icon: ''
    },
    {
        id: 10,
        parentId: 1,
        position: ROOT_NAVIGATION_ID,
        name: 'Schedule Dashboard',
        url: 'schedule/dashboard',
        icon: 'pi-th-large',
    },
    {
        id: 32,
        parentId: 1,
        position: 1,
        name: 'Linear Schedule',
        url: '',
        icon: 'pi-calendar'
    },
    {
        id: 42,
        parentId: 32,
        position: 1,
        name: 'Schedule DayList',
        url: 'linear/scheduledaylist',
    },
    {
        id: 421,
        parentId: 42,
        position: 1,
        name: 'Schedule Day List Id',
        url: 'linear/scheduledaylist/id'
    },
    {
        id: 27,
        parentId: 32,
        position: 2,
        name: 'Schedule Day Canvas',
        url: 'linear/scheduledaycanvas'
    },
    {
        id: 51,
        parentId: 32,
        position: 3,
        name: 'Schedule Day Detail',
        url: 'linear/scheduledaydetail'
    },
    {
        id: 48,
        parentId: 32,
        position: 4,
        name: 'Presentation Templates',
        url: 'linear/presentation-templates'
    },
    {
        id: 43,
        parentId: 32,
        position: 5,
        name: 'Presentation Analysis',
        url: 'linear/analysis'
    },
    {
        id: 50,
        parentId: 1,
        position: 2,
        name: 'Non-Linear Schedule',
        url: 'nonlinear',
        icon: 'pi-calendar-times'
    },
    {
        id: 38,
        parentId: 50,
        position: 1,
        name: 'Non-Linear Canvas',
        url: 'nonlinear/scheduledaycanvas'
    },
    {
        id: 13,
        parentId: 1,
        position: 4,
        name: 'Secondary Event',
        url: 'secondary-event',
        icon: 'pi-table'
    },
    {
        id: 14,
        parentId: 13,
        position: 1,
        name: 'Templates',
        url: 'secondary-event/templates'
    },
    {
        id: 15,
        parentId: 13,
        position: 2,
        name: 'Rules',
        url: 'secondary-event/rules'
    },
    {
        id: 20,
        parentId: 1,
        position: 5,
        name: 'Programmes',
        url: 'programmes',
        icon: 'pi-video'
    },
    {
        id: 30,
        parentId: 1,
        position: 6,
        name: 'Interstitials',
        url: 'interstitials',
        icon: 'pi-images'
    },
    {
        id: 44,
        parentId: 1,
        position: 7,
        name: 'Contracts',
        url: 'contracts',
        icon: 'pi-money-bill'
    },
    {
        id: 36,
        parentId: 1,
        position: 8,
        name: 'Settings',
        url: 'settings',
        icon: 'pi-cog'
    }
];
