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
                    selector: 'ng-vertical-tabs',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy12ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL25nLXZlcnRpY2FsLXRhYnMvbmctdmVydGljYWwtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLHdCQUF3QixFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RTtJQW9CRSxpQ0FBb0Isd0JBQWtELEVBQ25ELFVBQWlDO1FBRGhDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbkQsZUFBVSxHQUFWLFVBQVUsQ0FBdUI7UUFWM0MsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5CLGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztRQU16QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQkFBMEI7Ozs7O0lBQzFCLG9EQUFrQjs7Ozs7SUFBbEI7UUFDRSxvREFBb0Q7UUFDcEQsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENB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OztJQUUxRyx1Q0FBdUU7O0lBRXZFLHdDQUFzQjs7SUFDdEIsaURBQStCOztJQUMvQixnREFBK0I7O0lBQy9CLDhDQUFtQjs7SUFFbkIsOENBQTJDOztJQUUzQyxzREFBOEI7Ozs7O0lBRWxCLDJEQUEwRDs7SUFDMUQsNkNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdFNlbGVjdGlvbkxpc3QgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IE5nVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4uL25nLXZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi4vbmctdmVydGljYWwtdGFiL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4uL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy12ZXJ0aWNhbC10YWJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXZlcnRpY2FsLXRhYnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy12ZXJ0aWNhbC10YWJzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdWZXJ0aWNhbFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8TmdWZXJ0aWNhbFRhYkNvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGQoRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pIGR5bmFtaWNUYWJQbGFjZWhvbGRlcjogRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE1hdFNlbGVjdGlvbkxpc3QsIHsgc3RhdGljOiBmYWxzZSB9KSBsaXN0OiBNYXRTZWxlY3Rpb25MaXN0O1xuXG4gIEBJbnB1dCgpIG11bHRpID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VsZWN0Rmlyc3RUYWIgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U2VsZWN0QWxsID0gZmFsc2U7XG4gIGFsbFNlbGVjdGVkID0gdHJ1ZTtcblxuICBkeW5hbWljVGFiczogTmdWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gW107XG5cbiAgbGFzdFNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHVibGljIHRhYlNlcnZpY2U6IE5nVmVydGljYWxUYWJzU2VydmljZSkge1xuICAgIHRoaXMudGFiU2VydmljZS5tdWx0aSA9IHRoaXMubXVsdGk7XG4gIH1cblxuICAvLyBjb250ZW50Q2hpbGRyZW4gYXJlIHNldFxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHRhYiBzZXQsIGFjdGl2YXRlIHRoZSBmaXJzdFxuICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0VGFiICYmICF0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgICB9XG4gIH1cblxuICBvbk5nTW9kZWxDaGFuZ2UoLypzZWxlY3RlZDogc3RyaW5nW10qLykge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMudG9nZ2xlVGFiQWN0aXZhdGlvbnMoKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiOiBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50KSB7XG4gICAgdGhpcy5tdWx0aSA/XG4gICAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLnB1c2godGFiLnRhYlRpdGxlKVxuICAgICAgOiB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gW3RhYi50YWJUaXRsZV07XG4gICAgdGFiLmFjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5saXN0Lm9wdGlvbnMubWFwKHQgPT4gdC52YWx1ZSk7XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgdGhpcy5saXN0Lm9wdGlvbnMuZm9yRWFjaCh0ID0+IHtcbiAgICAgIHQuc2VsZWN0ZWQgPSBzLmhhcyh0LnZhbHVlKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhgJyR7dC52YWx1ZX0nIHNlbGVjdGVkOmAsIHQuc2VsZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9uc1NldCA9IG5ldyBTZXQob3B0aW9ucyk7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAoIW9wdGlvbnNTZXQuaGFzKG9wdGlvbikpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKGAnJHtvcHRpb259JyBub3QgZm91bmQgaW4gbWF0LXNlbGVjdGlvbi1saXN0YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBvcGVuVGFiKHRpdGxlOiBzdHJpbmcsIHRlbXBsYXRlLCBkYXRhLCBpc0Nsb3NlYWJsZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgTmdWZXJ0aWNhbFRhYkNvbXBvbmVudFxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgYSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIC8vIHNldCB0aGUgYWNjb3JkaW5nIHByb3BlcnRpZXMgb24gb3VyIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGluc3RhbmNlOiBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIE5nVmVydGljYWxUYWJDb21wb25lbnQ7XG4gICAgaW5zdGFuY2UudGFiVGl0bGUgPSB0aXRsZTtcbiAgICBpbnN0YW5jZS50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIGluc3RhbmNlLmRhdGFDb250ZXh0ID0gZGF0YTtcbiAgICBpbnN0YW5jZS5pc0Nsb3NlYWJsZSA9IGlzQ2xvc2VhYmxlO1xuICAgIGluc3RhbmNlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmR5bmFtaWNUYWJzLnB1c2goaW5zdGFuY2UpO1xuICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZHluYW1pY1RhYnNbdGhpcy5keW5hbWljVGFicy5sZW5ndGggLSAxXSk7XG4gIH1cblxuICBjbG9zZVRhYih0YWI6IE5nVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHluYW1pY1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmR5bmFtaWNUYWJzW2ldID09PSB0YWIpIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGFicy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5yZW1vdmUoaSk7XG4gICAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTsgIC8vIFRPRE86IGR1cGxpY2F0ZSBoYW5kbGluZ1xuICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgY2xvc2VBY3RpdmVUYWIoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2xvc2luZyB0aGUgZmlyc3QgYWN0aXZlIHRhYicpO1xuICAgIH1cbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmR5bmFtaWNUYWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSk7XG4gICAgaWYgKGFjdGl2ZVRhYi5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNsb3NlVGFiKGFjdGl2ZVRhYlswXSk7XG4gICAgfVxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdCgpIHtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID8gdGhpcy5saXN0LmRlc2VsZWN0QWxsKCkgOiB0aGlzLmxpc3Quc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVGFiQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgYXJyOiBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSB0aGlzLnRhYnMudG9BcnJheSgpLmNvbmNhdCh0aGlzLmR5bmFtaWNUYWJzKTtcbiAgICBpZiAoYXJyID09IG51bGwgfHwgYXJyLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgYXJyLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBzLmhhcyh0YWIudGFiVGl0bGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aSB8fCAhdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgfHwgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoXG4gICAgICB0YWJUaXRsZSA9PiB0YWJUaXRsZSAhPT0gdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zW3RoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdEFsbCgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gdGhpcy5saXN0Lm9wdGlvbnMubGVuZ3RoIDwgMSA/IGZhbHNlXG4gICAgICA6IHRoaXMubGlzdC5vcHRpb25zLnJlZHVjZSgocCwgYykgPT4gcCA/IGMuc2VsZWN0ZWQgOiBwLCB0cnVlIGFzIGJvb2xlYW4pO1xuICB9XG59XG4iXX0=