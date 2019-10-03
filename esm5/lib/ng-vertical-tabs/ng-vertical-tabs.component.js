/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { NgVerticalTabsService } from '../ng-vertical-tabs.service';
import { NgVerticalTabComponent } from '../ng-vertical-tab/ng-vertical-tab.component';
import { DynamicTabAnchorDirective } from '../dynamic-tab-anchor.directive';
var NgVerticalTabsComponent = /** @class */ (function () {
    function NgVerticalTabsComponent(componentFactoryResolver, tabService) {
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
    // contentChildren are set
    /**
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.ngAfterContentInit = 
    // contentChildren are set
    /**
     * @return {?}
     */
    function () {
        // if there is no active tab set, activate the first
        if (this.selectFirstTab && !this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.active; })).length) {
            this.selectTab(this.tabs.first);
        }
        else {
            this.checkSelectAll();
        }
    };
    /**
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.onNgModelChange = /**
     * @return {?}
     */
    function ( /*selected: string[]*/) {
        this.setOptions();
        this.toggleTabActivations();
        this.checkSelectAll();
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.selectTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.multi ?
            this.tabService.selectedOptions.push(tab.tabTitle)
            : this.tabService.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list || !this.list.options) {
            return;
        }
        /** @type {?} */
        var options = this.list.options.map((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.value; }));
        /** @type {?} */
        var s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        }));
        /** @type {?} */
        var optionsSet = new Set(options);
        this.tabService.selectedOptions.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            if (!optionsSet.has(option)) {
                throw TypeError("'" + option + "' not found in mat-selection-list");
            }
        }));
        this.checkSelectAll();
    };
    /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.openTab = /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    function (title, template, data, isCloseable) {
        if (isCloseable === void 0) { isCloseable = false; }
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgVerticalTabComponent);
        // create a component instance
        /** @type {?} */
        var componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        /** @type {?} */
        var instance = (/** @type {?} */ (componentRef.instance));
        instance.tabTitle = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        instance.active = true;
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.closeTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        for (var i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                this.dynamicTabs.splice(i, 1);
                this.dynamicTabPlaceholder.viewContainer.remove(i);
                this.tabService.selectedOptions = [tab.tabTitle]; // TODO: duplicate handling
                this.selectTab(this.tabs.first);
                break;
            }
        }
        this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.closeActiveTab = /**
     * @return {?}
     */
    function () {
        if (this.multi) {
            console.warn('Closing the first active tab');
        }
        /** @type {?} */
        var activeTab = this.dynamicTabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.active; }));
        if (activeTab.length > 0) {
            this.closeTab(activeTab[0]);
        }
        this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.toggleSelect = /**
     * @return {?}
     */
    function () {
        this.allSelected ? this.list.deselectAll() : this.list.selectAll();
        this.allSelected = !this.allSelected;
        this.checkSelectAll();
    };
    /**
     * @private
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.toggleTabActivations = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1) {
            return;
        }
        /** @type {?} */
        var s = new Set(this.tabService.selectedOptions);
        arr.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.active = s.has(tab.tabTitle); }));
    };
    /**
     * @private
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.setOptions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length) {
            return;
        }
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter((/**
         * @param {?} tabTitle
         * @return {?}
         */
        function (tabTitle) { return tabTitle !== _this.lastSelectedOptions[_this.lastSelectedOptions.length - 1]; }));
        this.lastSelectedOptions = this.tabService.selectedOptions;
    };
    /**
     * @private
     * @return {?}
     */
    NgVerticalTabsComponent.prototype.checkSelectAll = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.list || !this.list.options) {
            return;
        }
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce((/**
             * @param {?} p
             * @param {?} c
             * @return {?}
             */
            function (p, c) { return p ? c.selected : p; }), (/** @type {?} */ (true)));
    };
    NgVerticalTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-ng-vertical-tabs',
                    template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    NgVerticalTabsComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: NgVerticalTabsService }
    ]; };
    NgVerticalTabsComponent.propDecorators = {
        tabs: [{ type: ContentChildren, args: [NgVerticalTabComponent,] }],
        dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective, { static: false },] }],
        list: [{ type: ViewChild, args: [MatSelectionList, { static: false },] }],
        multi: [{ type: Input }],
        selectFirstTab: [{ type: Input }],
        showSelectAll: [{ type: Input }]
    };
    return NgVerticalTabsComponent;
}());
export { NgVerticalTabsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy12ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL25nLXZlcnRpY2FsLXRhYnMvbmctdmVydGljYWwtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLHdCQUF3QixFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RTtJQW9CRSxpQ0FBb0Isd0JBQWtELEVBQ25ELFVBQWlDO1FBRGhDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbkQsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7UUFWM0MsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5CLGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztRQU16QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQkFBMEI7Ozs7O0lBQzFCLG9EQUFrQjs7Ozs7SUFBbEI7UUFDRSxvREFBb0Q7UUFDcEQsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENB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OztJQUUxRyx1Q0FBdUU7O0lBRXZFLHdDQUFzQjs7SUFDdEIsaURBQStCOztJQUMvQixnREFBK0I7O0lBQy9CLDhDQUFtQjs7SUFFbkIsOENBQTJDOztJQUUzQyxzREFBOEI7Ozs7O0lBRWxCLDJEQUEwRDs7SUFDMUQsNkNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdFNlbGVjdGlvbkxpc3QgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IE5nVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4uL25nLXZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi4vbmctdmVydGljYWwtdGFiL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4uL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmctdmVydGljYWwtdGFicycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy12ZXJ0aWNhbC10YWJzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmctdmVydGljYWwtdGFicy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nVmVydGljYWxUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PE5nVmVydGljYWxUYWJDb21wb25lbnQ+O1xuICBAVmlld0NoaWxkKER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBkeW5hbWljVGFiUGxhY2Vob2xkZXI6IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChNYXRTZWxlY3Rpb25MaXN0LCB7IHN0YXRpYzogZmFsc2UgfSkgbGlzdDogTWF0U2VsZWN0aW9uTGlzdDtcblxuICBASW5wdXQoKSBtdWx0aSA9IHRydWU7XG4gIEBJbnB1dCgpIHNlbGVjdEZpcnN0VGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1NlbGVjdEFsbCA9IGZhbHNlO1xuICBhbGxTZWxlY3RlZCA9IHRydWU7XG5cbiAgZHluYW1pY1RhYnM6IE5nVmVydGljYWxUYWJDb21wb25lbnRbXSA9IFtdO1xuXG4gIGxhc3RTZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyB0YWJTZXJ2aWNlOiBOZ1ZlcnRpY2FsVGFic1NlcnZpY2UpIHtcbiAgICB0aGlzLnRhYlNlcnZpY2UubXVsdGkgPSB0aGlzLm11bHRpO1xuICB9XG5cbiAgLy8gY29udGVudENoaWxkcmVuIGFyZSBzZXRcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSB0YWIgc2V0LCBhY3RpdmF0ZSB0aGUgZmlyc3RcbiAgICBpZiAodGhpcy5zZWxlY3RGaXJzdFRhYiAmJiAhdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSkubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgb25OZ01vZGVsQ2hhbmdlKC8qc2VsZWN0ZWQ6IHN0cmluZ1tdKi8pIHtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLnRvZ2dsZVRhYkFjdGl2YXRpb25zKCk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYjogTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIHRoaXMubXVsdGkgP1xuICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRhYi50YWJUaXRsZSlcbiAgICAgIDogdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdO1xuICAgIHRhYi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgIXRoaXMubGlzdC5vcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubGlzdC5vcHRpb25zLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5vcHRpb25zLmZvckVhY2godCA9PiB7XG4gICAgICB0LnNlbGVjdGVkID0gcy5oYXModC52YWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYCcke3QudmFsdWV9JyBzZWxlY3RlZDpgLCB0LnNlbGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnNTZXQgPSBuZXcgU2V0KG9wdGlvbnMpO1xuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKCFvcHRpb25zU2V0LmhhcyhvcHRpb24pKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihgJyR7b3B0aW9ufScgbm90IGZvdW5kIGluIG1hdC1zZWxlY3Rpb24tbGlzdGApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgb3BlblRhYih0aXRsZTogc3RyaW5nLCB0ZW1wbGF0ZSwgZGF0YSwgaXNDbG9zZWFibGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIE5nVmVydGljYWxUYWJDb21wb25lbnRcbiAgICApO1xuXG4gICAgLy8gY3JlYXRlIGEgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAvLyBzZXQgdGhlIGFjY29yZGluZyBwcm9wZXJ0aWVzIG9uIG91ciBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBpbnN0YW5jZTogTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50O1xuICAgIGluc3RhbmNlLnRhYlRpdGxlID0gdGl0bGU7XG4gICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICBpbnN0YW5jZS5kYXRhQ29udGV4dCA9IGRhdGE7XG4gICAgaW5zdGFuY2UuaXNDbG9zZWFibGUgPSBpc0Nsb3NlYWJsZTtcbiAgICBpbnN0YW5jZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5keW5hbWljVGFicy5wdXNoKGluc3RhbmNlKTtcbiAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmR5bmFtaWNUYWJzW3RoaXMuZHluYW1pY1RhYnMubGVuZ3RoIC0gMV0pO1xuICB9XG5cbiAgY2xvc2VUYWIodGFiOiBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5keW5hbWljVGFic1tpXSA9PT0gdGFiKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1RhYnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgIHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIucmVtb3ZlKGkpO1xuICAgICAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gW3RhYi50YWJUaXRsZV07ICAvLyBUT0RPOiBkdXBsaWNhdGUgaGFuZGxpbmdcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIGNsb3NlQWN0aXZlVGFiKCkge1xuICAgIGlmICh0aGlzLm11bHRpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Nsb3NpbmcgdGhlIGZpcnN0IGFjdGl2ZSB0YWInKTtcbiAgICB9XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5keW5hbWljVGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jbG9zZVRhYihhY3RpdmVUYWJbMF0pO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3QoKSB7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA/IHRoaXMubGlzdC5kZXNlbGVjdEFsbCgpIDogdGhpcy5saXN0LnNlbGVjdEFsbCgpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5hbGxTZWxlY3RlZDtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVRhYkFjdGl2YXRpb25zKCkge1xuICAgIGNvbnN0IGFycjogTmdWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gdGhpcy50YWJzLnRvQXJyYXkoKS5jb25jYXQodGhpcy5keW5hbWljVGFicyk7XG4gICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIGFyci5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gcy5oYXModGFiLnRhYlRpdGxlKSk7XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkgfHwgIXRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIHx8XG4gICAgICAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zIHx8ICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZmlsdGVyKFxuICAgICAgdGFiVGl0bGUgPT4gdGFiVGl0bGUgIT09IHRoaXMubGFzdFNlbGVjdGVkT3B0aW9uc1t0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICApO1xuXG4gICAgdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tTZWxlY3RBbGwoKSB7XG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgIXRoaXMubGlzdC5vcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9IHRoaXMubGlzdC5vcHRpb25zLmxlbmd0aCA8IDEgPyBmYWxzZVxuICAgICAgOiB0aGlzLmxpc3Qub3B0aW9ucy5yZWR1Y2UoKHAsIGMpID0+IHAgPyBjLnNlbGVjdGVkIDogcCwgdHJ1ZSBhcyBib29sZWFuKTtcbiAgfVxufVxuIl19