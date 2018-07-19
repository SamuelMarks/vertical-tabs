/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabComponent } from './vertical-tab.component';
import { VerticalTabsService } from './vertical-tabs.service';
export class VerticalTabsComponent {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} tabService
     */
    constructor(componentFactoryResolver, tabService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.tabService = tabService;
        this.multi = true;
        this.selectFirstTab = true;
        this.showSelectAll = false;
        this.allSelected = true;
        this.dynamicTabs = [];
        this.tabService.multi = this.multi;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // if there is no active tab set, activate the first
        if (this.selectFirstTab && !this.tabs.filter(tab => tab.active).length)
            this.selectTab(this.tabs.first);
        else
            this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    onNgModelChange() {
        this.setOptions();
        this.toggleTabActivations();
        this.checkSelectAll();
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    selectTab(tab) {
        this.multi ?
            this.tabService.selectedOptions.push(tab.tabTitle)
            : this.tabService.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        const /** @type {?} */ options = this.list.options.map(t => t.value);
        const /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(t => {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        const /** @type {?} */ options_set = new Set(options);
        this.tabService.selectedOptions.forEach(option => {
            if (!options_set.has(option))
                throw TypeError(`'${option}' not found in mat-selection-list`);
        });
        this.checkSelectAll();
    }
    /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    openTab(title, template, data, isCloseable = false) {
        const /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
        // create a component instance
        const /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        const /** @type {?} */ instance = /** @type {?} */ (componentRef.instance);
        instance.tabTitle = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        instance.active = true;
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    closeTab(tab) {
        for (let /** @type {?} */ i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                this.dynamicTabs.splice(i, 1);
                this.dynamicTabPlaceholder.viewContainer.remove(i);
                this.tabService.selectedOptions = [tab.tabTitle]; // TODO: duplicate handling
                this.selectTab(this.tabs.first);
                break;
            }
        }
        this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    closeActiveTab() {
        if (this.multi)
            console.warn('Closing the first active tab');
        const /** @type {?} */ activeTab = this.dynamicTabs.filter(tab => tab.active);
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
        this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    toggleSelect() {
        this.allSelected ? this.list.deselectAll() : this.list.selectAll();
        this.allSelected = !this.allSelected;
        this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    toggleTabActivations() {
        const /** @type {?} */ arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        const /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        arr.forEach(tab => tab.active = s.has(tab.tabTitle));
    }
    /**
     * @return {?}
     */
    setOptions() {
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter(tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]);
        this.lastSelectedOptions = this.tabService.selectedOptions;
    }
    /**
     * @return {?}
     */
    checkSelectAll() {
        if (!this.list || !this.list.options)
            return;
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce((p, c) => p ? c.selected : p, true);
    }
}
VerticalTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-vertical-tabs',
                template: `<div fxLayout="row" fxLayoutGap="1px" fxLayout.xs="column">
  <div fxFlex="33%">
    <mat-selection-list #list [(ngModel)]="tabService.selectedOptions"
                        (ngModelChange)="onNgModelChange()">
      <mat-list-option *ngFor="let tab of [].concat(tabs.toArray(), dynamicTabs)" [value]="tab.tabTitle">
        {{tab.tabTitle}}
      </mat-list-option>
    </mat-selection-list>
    <mat-divider></mat-divider>
    <button mat-button color="primary" id="select"
            (click)="toggleSelect()" *ngIf="showSelectAll">
      {{allSelected ? 'Reset selection' : 'Select all'}}
    </button>
  </div>

  <div fxFlex="66%" *ngIf="tabService.selectedOptions.length">
    <ng-content></ng-content>
    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>
  </div>
</div>
`,
                styles: []
            },] },
];
/** @nocollapse */
VerticalTabsComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: VerticalTabsService }
];
VerticalTabsComponent.propDecorators = {
    tabs: [{ type: ContentChildren, args: [VerticalTabComponent,] }],
    dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective,] }],
    list: [{ type: ViewChild, args: [MatSelectionList,] }],
    multi: [{ type: Input }],
    selectFirstTab: [{ type: Input }],
    showSelectAll: [{ type: Input }]
};
function VerticalTabsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    VerticalTabsComponent.prototype.tabs;
    /** @type {?} */
    VerticalTabsComponent.prototype.dynamicTabPlaceholder;
    /** @type {?} */
    VerticalTabsComponent.prototype.list;
    /** @type {?} */
    VerticalTabsComponent.prototype.multi;
    /** @type {?} */
    VerticalTabsComponent.prototype.selectFirstTab;
    /** @type {?} */
    VerticalTabsComponent.prototype.showSelectAll;
    /** @type {?} */
    VerticalTabsComponent.prototype.allSelected;
    /** @type {?} */
    VerticalTabsComponent.prototype.dynamicTabs;
    /** @type {?} */
    VerticalTabsComponent.prototype.lastSelectedOptions;
    /** @type {?} */
    VerticalTabsComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    VerticalTabsComponent.prototype.tabService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUEyQjlELE1BQU07Ozs7O0lBZUosWUFBb0Isd0JBQWtELEVBQ25EO1FBREMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNuRCxlQUFVLEdBQVYsVUFBVTtxQkFWWixJQUFJOzhCQUNLLElBQUk7NkJBQ0wsS0FBSzsyQkFDaEIsSUFBSTsyQkFFb0IsRUFBRTtRQU10QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3BDOzs7O0lBR0Qsa0JBQWtCOztRQUVoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQXlCO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRS9CLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEQsdUJBQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7O1NBRTdCLENBQUMsQ0FBQztRQUVILHVCQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixNQUFNLFNBQVMsQ0FBQyxJQUFJLE1BQU0sbUNBQW1DLENBQUMsQ0FBQztTQUNsRSxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsR0FBRyxLQUFLO1FBQ3hELHVCQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDNUUsb0JBQW9CLENBQ3JCLENBQUM7O1FBR0YsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O1FBR2hHLHVCQUFNLFFBQVEscUJBQXlCLFlBQVksQ0FBQyxRQUFnQyxDQUFBLENBQUM7UUFDckYsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsUUFBUSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbkMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7Ozs7O0lBRUQsUUFBUSxDQUFDLEdBQXlCO1FBQ2hDLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLENBQUM7YUFDUDtTQUNGO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsY0FBYztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDN0QsdUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFTyxvQkFBb0I7UUFDMUIsdUJBQU0sR0FBRyxHQUEyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakYsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUMxQyx1QkFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztJQUcvQyxVQUFVO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNO1lBQ3ZELENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztZQUM5RCxNQUFNLENBQUM7UUFFVCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQ3RFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUN2RixDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDOzs7OztJQUdyRCxjQUFjO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7WUF4SnBFLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0JYO2dCQUNDLE1BQU0sRUFBRSxFQUFFO2FBQ1g7Ozs7WUEvQnFDLHdCQUF3QjtZQUtyRCxtQkFBbUI7OzttQkE0QnpCLGVBQWUsU0FBQyxvQkFBb0I7b0NBQ3BDLFNBQVMsU0FBQyx5QkFBeUI7bUJBRW5DLFNBQVMsU0FBQyxnQkFBZ0I7b0JBRTFCLEtBQUs7NkJBQ0wsS0FBSzs0QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3Rpb25MaXN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXZlcnRpY2FsLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjFweFwiIGZ4TGF5b3V0LnhzPVwiY29sdW1uXCI+XG4gIDxkaXYgZnhGbGV4PVwiMzMlXCI+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjbGlzdCBbKG5nTW9kZWwpXT1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uTmdNb2RlbENoYW5nZSgpXCI+XG4gICAgICA8bWF0LWxpc3Qtb3B0aW9uICpuZ0Zvcj1cImxldCB0YWIgb2YgW10uY29uY2F0KHRhYnMudG9BcnJheSgpLCBkeW5hbWljVGFicylcIiBbdmFsdWVdPVwidGFiLnRhYlRpdGxlXCI+XG4gICAgICAgIHt7dGFiLnRhYlRpdGxlfX1cbiAgICAgIDwvbWF0LWxpc3Qtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdGlvbi1saXN0PlxuICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBpZD1cInNlbGVjdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KClcIiAqbmdJZj1cInNob3dTZWxlY3RBbGxcIj5cbiAgICAgIHt7YWxsU2VsZWN0ZWQgPyAnUmVzZXQgc2VsZWN0aW9uJyA6ICdTZWxlY3QgYWxsJ319XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PVwiNjYlXCIgKm5nSWY9XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGhcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIG5nVmVydGljYWxEeW5hbWljVGFiQW5jaG9yICNjb250YWluZXI+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oVmVydGljYWxUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxWZXJ0aWNhbFRhYkNvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGQoRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSkgZHluYW1pY1RhYlBsYWNlaG9sZGVyOiBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U2VsZWN0aW9uTGlzdCkgbGlzdDogTWF0U2VsZWN0aW9uTGlzdDtcblxuICBASW5wdXQoKSBtdWx0aSA9IHRydWU7XG4gIEBJbnB1dCgpIHNlbGVjdEZpcnN0VGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1NlbGVjdEFsbCA9IGZhbHNlO1xuICBhbGxTZWxlY3RlZCA9IHRydWU7XG5cbiAgZHluYW1pY1RhYnM6IFZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSBbXTtcblxuICBsYXN0U2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdGFiU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICAgIHRoaXMudGFiU2VydmljZS5tdWx0aSA9IHRoaXMubXVsdGk7XG4gIH1cblxuICAvLyBjb250ZW50Q2hpbGRyZW4gYXJlIHNldFxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHRhYiBzZXQsIGFjdGl2YXRlIHRoZSBmaXJzdFxuICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0VGFiICYmICF0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKS5sZW5ndGgpXG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgIGVsc2UgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgb25OZ01vZGVsQ2hhbmdlKC8qc2VsZWN0ZWQ6IHN0cmluZ1tdKi8pIHtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLnRvZ2dsZVRhYkFjdGl2YXRpb25zKCk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYjogVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICB0aGlzLm11bHRpID9cbiAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMucHVzaCh0YWIudGFiVGl0bGUpXG4gICAgICA6IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTtcbiAgICB0YWIuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmxpc3Qub3B0aW9ucy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpc3Qub3B0aW9ucy5mb3JFYWNoKHQgPT4ge1xuICAgICAgdC5zZWxlY3RlZCA9IHMuaGFzKHQudmFsdWUpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKGAnJHt0LnZhbHVlfScgc2VsZWN0ZWQ6YCwgdC5zZWxlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zX3NldCA9IG5ldyBTZXQob3B0aW9ucyk7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAoIW9wdGlvbnNfc2V0LmhhcyhvcHRpb24pKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoYCcke29wdGlvbn0nIG5vdCBmb3VuZCBpbiBtYXQtc2VsZWN0aW9uLWxpc3RgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIG9wZW5UYWIodGl0bGU6IHN0cmluZywgdGVtcGxhdGUsIGRhdGEsIGlzQ2xvc2VhYmxlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBWZXJ0aWNhbFRhYkNvbXBvbmVudFxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgYSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIC8vIHNldCB0aGUgYWNjb3JkaW5nIHByb3BlcnRpZXMgb24gb3VyIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGluc3RhbmNlOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBWZXJ0aWNhbFRhYkNvbXBvbmVudDtcbiAgICBpbnN0YW5jZS50YWJUaXRsZSA9IHRpdGxlO1xuICAgIGluc3RhbmNlLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgaW5zdGFuY2UuZGF0YUNvbnRleHQgPSBkYXRhO1xuICAgIGluc3RhbmNlLmlzQ2xvc2VhYmxlID0gaXNDbG9zZWFibGU7XG4gICAgaW5zdGFuY2UuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuZHluYW1pY1RhYnMucHVzaChpbnN0YW5jZSk7XG4gICAgdGhpcy5zZWxlY3RUYWIodGhpcy5keW5hbWljVGFic1t0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIGNsb3NlVGFiKHRhYjogVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHluYW1pY1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmR5bmFtaWNUYWJzW2ldID09PSB0YWIpIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGFicy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5yZW1vdmUoaSk7XG4gICAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTsgIC8vIFRPRE86IGR1cGxpY2F0ZSBoYW5kbGluZ1xuICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgY2xvc2VBY3RpdmVUYWIoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkpIGNvbnNvbGUud2FybignQ2xvc2luZyB0aGUgZmlyc3QgYWN0aXZlIHRhYicpO1xuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMuZHluYW1pY1RhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKTtcbiAgICBpZiAoYWN0aXZlVGFiLmxlbmd0aCA+IDApIHRoaXMuY2xvc2VUYWIoYWN0aXZlVGFiWzBdKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3QoKSB7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA/IHRoaXMubGlzdC5kZXNlbGVjdEFsbCgpIDogdGhpcy5saXN0LnNlbGVjdEFsbCgpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5hbGxTZWxlY3RlZDtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVRhYkFjdGl2YXRpb25zKCkge1xuICAgIGNvbnN0IGFycjogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IHRoaXMudGFicy50b0FycmF5KCkuY29uY2F0KHRoaXMuZHluYW1pY1RhYnMpO1xuICAgIGlmIChhcnIgPT0gbnVsbCB8fCBhcnIubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIGFyci5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gcy5oYXModGFiLnRhYlRpdGxlKSk7XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkgfHwgIXRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIHx8XG4gICAgICAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zIHx8ICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZmlsdGVyKFxuICAgICAgdGFiVGl0bGUgPT4gdGFiVGl0bGUgIT09IHRoaXMubGFzdFNlbGVjdGVkT3B0aW9uc1t0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICApO1xuXG4gICAgdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tTZWxlY3RBbGwoKSB7XG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgIXRoaXMubGlzdC5vcHRpb25zKSByZXR1cm47XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9IHRoaXMubGlzdC5vcHRpb25zLmxlbmd0aCA8IDEgPyBmYWxzZVxuICAgICAgOiB0aGlzLmxpc3Qub3B0aW9ucy5yZWR1Y2UoKHAsIGMpID0+IHAgPyBjLnNlbGVjdGVkIDogcCwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==