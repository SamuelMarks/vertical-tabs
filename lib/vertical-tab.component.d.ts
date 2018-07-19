import { VerticalTabsService } from './vertical-tabs.service';
export declare class VerticalTabComponent {
    tabsService: VerticalTabsService;
    tabTitle: string;
    active: boolean;
    template: any;
    dataContext: any;
    isCloseable: boolean;
    constructor(tabsService: VerticalTabsService);
}
