import { AfterContentInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { NgVerticalTabsService } from '../ng-vertical-tabs.service';
import { NgVerticalTabComponent } from '../ng-vertical-tab/ng-vertical-tab.component';
import { DynamicTabAnchorDirective } from '../dynamic-tab-anchor.directive';
export declare class NgVerticalTabsComponent implements AfterContentInit {
    private componentFactoryResolver;
    tabService: NgVerticalTabsService;
    tabs: QueryList<NgVerticalTabComponent>;
    dynamicTabPlaceholder: DynamicTabAnchorDirective;
    list: MatSelectionList;
    multi: boolean;
    selectFirstTab: boolean;
    showSelectAll: boolean;
    allSelected: boolean;
    dynamicTabs: NgVerticalTabComponent[];
    lastSelectedOptions: string[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, tabService: NgVerticalTabsService);
    ngAfterContentInit(): void;
    onNgModelChange(): void;
    selectTab(tab: NgVerticalTabComponent): void;
    openTab(title: string, template: any, data: any, isCloseable?: boolean): void;
    closeTab(tab: NgVerticalTabComponent): void;
    closeActiveTab(): void;
    toggleSelect(): void;
    private toggleTabActivations;
    private setOptions;
    private checkSelectAll;
}
