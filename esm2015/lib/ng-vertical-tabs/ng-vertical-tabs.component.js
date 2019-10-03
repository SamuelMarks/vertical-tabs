/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { NgVerticalTabsService } from '../ng-vertical-tabs.service';
import { NgVerticalTabComponent } from '../ng-vertical-tab/ng-vertical-tab.component';
import { DynamicTabAnchorDirective } from '../dynamic-tab-anchor.directive';
export class NgVerticalTabsComponent {
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
    // contentChildren are set
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // if there is no active tab set, activate the first
        if (this.selectFirstTab && !this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.active)).length) {
            this.selectTab(this.tabs.first);
        }
        else {
            this.checkSelectAll();
        }
    }
    /**
     * @return {?}
     */
    onNgModelChange( /*selected: string[]*/) {
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
        if (!this.list || !this.list.options) {
            return;
        }
        /** @type {?} */
        const options = this.list.options.map((/**
         * @param {?} t
         * @return {?}
         */
        t => t.value));
        /** @type {?} */
        const s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach((/**
         * @param {?} t
         * @return {?}
         */
        t => {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        }));
        /** @type {?} */
        const optionsSet = new Set(options);
        this.tabService.selectedOptions.forEach((/**
         * @param {?} option
         * @return {?}
         */
        option => {
            if (!optionsSet.has(option)) {
                throw TypeError(`'${option}' not found in mat-selection-list`);
            }
        }));
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
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgVerticalTabComponent);
        // create a component instance
        /** @type {?} */
        const componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        /** @type {?} */
        const instance = (/** @type {?} */ (componentRef.instance));
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
        for (let i = 0; i < this.dynamicTabs.length; i++) {
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
        if (this.multi) {
            console.warn('Closing the first active tab');
        }
        /** @type {?} */
        const activeTab = this.dynamicTabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.active));
        if (activeTab.length > 0) {
            this.closeTab(activeTab[0]);
        }
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
     * @private
     * @return {?}
     */
    toggleTabActivations() {
        /** @type {?} */
        const arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1) {
            return;
        }
        /** @type {?} */
        const s = new Set(this.tabService.selectedOptions);
        arr.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.active = s.has(tab.tabTitle)));
    }
    /**
     * @private
     * @return {?}
     */
    setOptions() {
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length) {
            return;
        }
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter((/**
         * @param {?} tabTitle
         * @return {?}
         */
        tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]));
        this.lastSelectedOptions = this.tabService.selectedOptions;
    }
    /**
     * @private
     * @return {?}
     */
    checkSelectAll() {
        if (!this.list || !this.list.options) {
            return;
        }
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce((/**
             * @param {?} p
             * @param {?} c
             * @return {?}
             */
            (p, c) => p ? c.selected : p), (/** @type {?} */ (true)));
    }
}
NgVerticalTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ng-vertical-tabs',
                template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
NgVerticalTabsComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: NgVerticalTabsService }
];
NgVerticalTabsComponent.propDecorators = {
    tabs: [{ type: ContentChildren, args: [NgVerticalTabComponent,] }],
    dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective, { static: false },] }],
    list: [{ type: ViewChild, args: [MatSelectionList, { static: false },] }],
    multi: [{ type: Input }],
    selectFirstTab: [{ type: Input }],
    showSelectAll: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgVerticalTabsComponent.prototype.tabs;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.dynamicTabPlaceholder;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.list;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.multi;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.selectFirstTab;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.showSelectAll;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.allSelected;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.dynamicTabs;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.lastSelectedOptions;
    /**
     * @type {?}
     * @private
     */
    NgVerticalTabsComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    NgVerticalTabsComponent.prototype.tabService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy12ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL25nLXZlcnRpY2FsLXRhYnMvbmctdmVydGljYWwtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLHdCQUF3QixFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU81RSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQWVsQyxZQUFvQix3QkFBa0QsRUFDbkQsVUFBaUM7UUFEaEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNuRCxlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQVYzQyxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbkIsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBTXpDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFHRCxrQkFBa0I7UUFDaEIsb0RBQW9EO1FBQ3BELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFD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QyxlQUFlLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsbUJBQUEsSUFBSSxFQUFXLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7WUFwSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLDAxQkFBZ0Q7O2FBRWpEOzs7O1lBWnFDLHdCQUF3QjtZQUlyRCxxQkFBcUI7OzttQkFVM0IsZUFBZSxTQUFDLHNCQUFzQjtvQ0FDdEMsU0FBUyxTQUFDLHlCQUF5QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTttQkFFdEQsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFFN0MsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7Ozs7SUFQTix1Q0FBaUY7O0lBQ2pGLHdEQUEwRzs7SUFFMUcsdUNBQXVFOztJQUV2RSx3Q0FBc0I7O0lBQ3RCLGlEQUErQjs7SUFDL0IsZ0RBQStCOztJQUMvQiw4Q0FBbUI7O0lBRW5CLDhDQUEyQzs7SUFFM0Msc0RBQThCOzs7OztJQUVsQiwyREFBMEQ7O0lBQzFELDZDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXRTZWxlY3Rpb25MaXN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBOZ1ZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuLi9uZy12ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4uL25nLXZlcnRpY2FsLXRhYi9uZy12ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5nLXZlcnRpY2FsLXRhYnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctdmVydGljYWwtdGFicy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25nLXZlcnRpY2FsLXRhYnMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1ZlcnRpY2FsVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE5nVmVydGljYWxUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZChEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgZHluYW1pY1RhYlBsYWNlaG9sZGVyOiBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U2VsZWN0aW9uTGlzdCwgeyBzdGF0aWM6IGZhbHNlIH0pIGxpc3Q6IE1hdFNlbGVjdGlvbkxpc3Q7XG5cbiAgQElucHV0KCkgbXVsdGkgPSB0cnVlO1xuICBASW5wdXQoKSBzZWxlY3RGaXJzdFRhYiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dTZWxlY3RBbGwgPSBmYWxzZTtcbiAgYWxsU2VsZWN0ZWQgPSB0cnVlO1xuXG4gIGR5bmFtaWNUYWJzOiBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSBbXTtcblxuICBsYXN0U2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdGFiU2VydmljZTogTmdWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLm11bHRpID0gdGhpcy5tdWx0aTtcbiAgfVxuXG4gIC8vIGNvbnRlbnRDaGlsZHJlbiBhcmUgc2V0XG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBhY3RpdmUgdGFiIHNldCwgYWN0aXZhdGUgdGhlIGZpcnN0XG4gICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RUYWIgJiYgIXRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uTmdNb2RlbENoYW5nZSgvKnNlbGVjdGVkOiBzdHJpbmdbXSovKSB7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgdGhpcy50b2dnbGVUYWJBY3RpdmF0aW9ucygpO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHNlbGVjdFRhYih0YWI6IE5nVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICB0aGlzLm11bHRpID9cbiAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMucHVzaCh0YWIudGFiVGl0bGUpXG4gICAgICA6IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTtcbiAgICB0YWIuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5saXN0IHx8ICF0aGlzLmxpc3Qub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmxpc3Qub3B0aW9ucy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpc3Qub3B0aW9ucy5mb3JFYWNoKHQgPT4ge1xuICAgICAgdC5zZWxlY3RlZCA9IHMuaGFzKHQudmFsdWUpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKGAnJHt0LnZhbHVlfScgc2VsZWN0ZWQ6YCwgdC5zZWxlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zU2V0ID0gbmV3IFNldChvcHRpb25zKTtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmICghb3B0aW9uc1NldC5oYXMob3B0aW9uKSkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoYCcke29wdGlvbn0nIG5vdCBmb3VuZCBpbiBtYXQtc2VsZWN0aW9uLWxpc3RgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIG9wZW5UYWIodGl0bGU6IHN0cmluZywgdGVtcGxhdGUsIGRhdGEsIGlzQ2xvc2VhYmxlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50XG4gICAgKTtcblxuICAgIC8vIGNyZWF0ZSBhIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgLy8gc2V0IHRoZSBhY2NvcmRpbmcgcHJvcGVydGllcyBvbiBvdXIgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgaW5zdGFuY2U6IE5nVmVydGljYWxUYWJDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgTmdWZXJ0aWNhbFRhYkNvbXBvbmVudDtcbiAgICBpbnN0YW5jZS50YWJUaXRsZSA9IHRpdGxlO1xuICAgIGluc3RhbmNlLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgaW5zdGFuY2UuZGF0YUNvbnRleHQgPSBkYXRhO1xuICAgIGluc3RhbmNlLmlzQ2xvc2VhYmxlID0gaXNDbG9zZWFibGU7XG4gICAgaW5zdGFuY2UuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuZHluYW1pY1RhYnMucHVzaChpbnN0YW5jZSk7XG4gICAgdGhpcy5zZWxlY3RUYWIodGhpcy5keW5hbWljVGFic1t0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIGNsb3NlVGFiKHRhYjogTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZHluYW1pY1RhYnNbaV0gPT09IHRhYikge1xuICAgICAgICB0aGlzLmR5bmFtaWNUYWJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLnJlbW92ZShpKTtcbiAgICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdOyAgLy8gVE9ETzogZHVwbGljYXRlIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBjbG9zZUFjdGl2ZVRhYigpIHtcbiAgICBpZiAodGhpcy5tdWx0aSkge1xuICAgICAgY29uc29sZS53YXJuKCdDbG9zaW5nIHRoZSBmaXJzdCBhY3RpdmUgdGFiJyk7XG4gICAgfVxuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMuZHluYW1pY1RhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKTtcbiAgICBpZiAoYWN0aXZlVGFiLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY2xvc2VUYWIoYWN0aXZlVGFiWzBdKTtcbiAgICB9XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0KCkge1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPyB0aGlzLmxpc3QuZGVzZWxlY3RBbGwoKSA6IHRoaXMubGlzdC5zZWxlY3RBbGwoKTtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuYWxsU2VsZWN0ZWQ7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVUYWJBY3RpdmF0aW9ucygpIHtcbiAgICBjb25zdCBhcnI6IE5nVmVydGljYWxUYWJDb21wb25lbnRbXSA9IHRoaXMudGFicy50b0FycmF5KCkuY29uY2F0KHRoaXMuZHluYW1pY1RhYnMpO1xuICAgIGlmIChhcnIgPT0gbnVsbCB8fCBhcnIubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICBhcnIuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IHMuaGFzKHRhYi50YWJUaXRsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm11bHRpIHx8ICF0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCB8fFxuICAgICAgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyB8fCAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZpbHRlcihcbiAgICAgIHRhYlRpdGxlID0+IHRhYlRpdGxlICE9PSB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnNbdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aCAtIDFdXG4gICAgKTtcblxuICAgIHRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrU2VsZWN0QWxsKCkge1xuICAgIGlmICghdGhpcy5saXN0IHx8ICF0aGlzLmxpc3Qub3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSB0aGlzLmxpc3Qub3B0aW9ucy5sZW5ndGggPCAxID8gZmFsc2VcbiAgICAgIDogdGhpcy5saXN0Lm9wdGlvbnMucmVkdWNlKChwLCBjKSA9PiBwID8gYy5zZWxlY3RlZCA6IHAsIHRydWUgYXMgYm9vbGVhbik7XG4gIH1cbn1cbiJdfQ==