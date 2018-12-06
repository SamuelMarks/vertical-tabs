/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabComponent } from './vertical-tab.component';
import { VerticalTabsService } from './vertical-tabs.service';
var VerticalTabsComponent = /** @class */ (function () {
    function VerticalTabsComponent(componentFactoryResolver, tabService) {
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
    VerticalTabsComponent.prototype.ngAfterContentInit = 
    // contentChildren are set
    /**
     * @return {?}
     */
    function () {
        // if there is no active tab set, activate the first
        if (this.selectFirstTab && !this.tabs.filter(function (tab) { return tab.active; }).length)
            this.selectTab(this.tabs.first);
        else
            this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.onNgModelChange = /**
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
    VerticalTabsComponent.prototype.selectTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.multi ?
            this.tabService.selectedOptions.push(tab.tabTitle)
            : this.tabService.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        /** @type {?} */
        var options = this.list.options.map(function (t) { return t.value; });
        /** @type {?} */
        var s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(function (t) {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        /** @type {?} */
        var options_set = new Set(options);
        this.tabService.selectedOptions.forEach(function (option) {
            if (!options_set.has(option))
                throw TypeError("'" + option + "' not found in mat-selection-list");
        });
        this.checkSelectAll();
    };
    /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    VerticalTabsComponent.prototype.openTab = /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    function (title, template, data, isCloseable) {
        if (isCloseable === void 0) { isCloseable = false; }
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
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
    VerticalTabsComponent.prototype.closeTab = /**
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
    VerticalTabsComponent.prototype.closeActiveTab = /**
     * @return {?}
     */
    function () {
        if (this.multi)
            console.warn('Closing the first active tab');
        /** @type {?} */
        var activeTab = this.dynamicTabs.filter(function (tab) { return tab.active; });
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
        this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.toggleSelect = /**
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
    VerticalTabsComponent.prototype.toggleTabActivations = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        /** @type {?} */
        var s = new Set(this.tabService.selectedOptions);
        arr.forEach(function (tab) { return tab.active = s.has(tab.tabTitle); });
    };
    /**
     * @private
     * @return {?}
     */
    VerticalTabsComponent.prototype.setOptions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter(function (tabTitle) { return tabTitle !== _this.lastSelectedOptions[_this.lastSelectedOptions.length - 1]; });
        this.lastSelectedOptions = this.tabService.selectedOptions;
    };
    /**
     * @private
     * @return {?}
     */
    VerticalTabsComponent.prototype.checkSelectAll = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.list || !this.list.options)
            return;
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce(function (p, c) { return p ? c.selected : p; }, true);
    };
    VerticalTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-vertical-tabs',
                    template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    VerticalTabsComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: VerticalTabsService }
    ]; };
    VerticalTabsComponent.propDecorators = {
        tabs: [{ type: ContentChildren, args: [VerticalTabComponent,] }],
        dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective,] }],
        list: [{ type: ViewChild, args: [MatSelectionList,] }],
        multi: [{ type: Input }],
        selectFirstTab: [{ type: Input }],
        showSelectAll: [{ type: Input }]
    };
    return VerticalTabsComponent;
}());
export { VerticalTabsComponent };
if (false) {
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
    /**
     * @type {?}
     * @private
     */
    VerticalTabsComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    VerticalTabsComponent.prototype.tabService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQ7SUFvQkUsK0JBQW9CLHdCQUFrRCxFQUNuRCxVQUErQjtRQUQ5Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ25ELGVBQVUsR0FBVixVQUFVLENBQXFCO1FBVnpDLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixnQkFBVyxHQUEyQixFQUFFLENBQUM7UUFNdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRUQsMEJBQTBCOzs7OztJQUMxQixrREFBa0I7Ozs7O0lBQWxCO1FBQ0Usb0RBQW9EO1FBQ3BELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sRUFBVixDQUFVLENBQUMsQ0FBQyxN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QUFDO0lBQzdELENBQUM7Ozs7O0lBRU8sOENBQWM7Ozs7SUFBdEI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWxCLENBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0JBcklGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QiwwMUJBQTZDO2lCQUU5Qzs7OztnQkFYcUMsd0JBQXdCO2dCQUtyRCxtQkFBbUI7Ozt1QkFRekIsZUFBZSxTQUFDLG9CQUFvQjt3Q0FDcEMsU0FBUyxTQUFDLHlCQUF5Qjt1QkFFbkMsU0FBUyxTQUFDLGdCQUFnQjt3QkFFMUIsS0FBSztpQ0FDTCxLQUFLO2dDQUNMLEtBQUs7O0lBeUhSLDRCQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0FqSVkscUJBQXFCOzs7SUFDaEMscUNBQTZFOztJQUM3RSxzREFBdUY7O0lBRXZGLHFDQUFvRDs7SUFFcEQsc0NBQXNCOztJQUN0QiwrQ0FBK0I7O0lBQy9CLDhDQUErQjs7SUFDL0IsNENBQW1COztJQUVuQiw0Q0FBeUM7O0lBRXpDLG9EQUE4Qjs7Ozs7SUFFbEIseURBQTBEOztJQUMxRCwyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNlbGVjdGlvbkxpc3QgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFicycsXG4gIHRlbXBsYXRlVXJsOiAnLi92ZXJ0aWNhbC10YWJzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihWZXJ0aWNhbFRhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PFZlcnRpY2FsVGFiQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZChEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlKSBkeW5hbWljVGFiUGxhY2Vob2xkZXI6IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChNYXRTZWxlY3Rpb25MaXN0KSBsaXN0OiBNYXRTZWxlY3Rpb25MaXN0O1xuXG4gIEBJbnB1dCgpIG11bHRpID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VsZWN0Rmlyc3RUYWIgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U2VsZWN0QWxsID0gZmFsc2U7XG4gIGFsbFNlbGVjdGVkID0gdHJ1ZTtcblxuICBkeW5hbWljVGFiczogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IFtdO1xuXG4gIGxhc3RTZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyB0YWJTZXJ2aWNlOiBWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLm11bHRpID0gdGhpcy5tdWx0aTtcbiAgfVxuXG4gIC8vIGNvbnRlbnRDaGlsZHJlbiBhcmUgc2V0XG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBhY3RpdmUgdGFiIHNldCwgYWN0aXZhdGUgdGhlIGZpcnN0XG4gICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RUYWIgJiYgIXRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpLmxlbmd0aClcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgZWxzZSB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBvbk5nTW9kZWxDaGFuZ2UoLypzZWxlY3RlZDogc3RyaW5nW10qLykge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMudG9nZ2xlVGFiQWN0aXZhdGlvbnMoKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIHRoaXMubXVsdGkgP1xuICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRhYi50YWJUaXRsZSlcbiAgICAgIDogdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdO1xuICAgIHRhYi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubGlzdC5vcHRpb25zLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5vcHRpb25zLmZvckVhY2godCA9PiB7XG4gICAgICB0LnNlbGVjdGVkID0gcy5oYXModC52YWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYCcke3QudmFsdWV9JyBzZWxlY3RlZDpgLCB0LnNlbGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnNfc2V0ID0gbmV3IFNldChvcHRpb25zKTtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmICghb3B0aW9uc19zZXQuaGFzKG9wdGlvbikpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihgJyR7b3B0aW9ufScgbm90IGZvdW5kIGluIG1hdC1zZWxlY3Rpb24tbGlzdGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgb3BlblRhYih0aXRsZTogc3RyaW5nLCB0ZW1wbGF0ZSwgZGF0YSwgaXNDbG9zZWFibGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIFZlcnRpY2FsVGFiQ29tcG9uZW50XG4gICAgKTtcblxuICAgIC8vIGNyZWF0ZSBhIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgLy8gc2V0IHRoZSBhY2NvcmRpbmcgcHJvcGVydGllcyBvbiBvdXIgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgaW5zdGFuY2U6IFZlcnRpY2FsVGFiQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIFZlcnRpY2FsVGFiQ29tcG9uZW50O1xuICAgIGluc3RhbmNlLnRhYlRpdGxlID0gdGl0bGU7XG4gICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICBpbnN0YW5jZS5kYXRhQ29udGV4dCA9IGRhdGE7XG4gICAgaW5zdGFuY2UuaXNDbG9zZWFibGUgPSBpc0Nsb3NlYWJsZTtcbiAgICBpbnN0YW5jZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5keW5hbWljVGFicy5wdXNoKGluc3RhbmNlKTtcbiAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmR5bmFtaWNUYWJzW3RoaXMuZHluYW1pY1RhYnMubGVuZ3RoIC0gMV0pO1xuICB9XG5cbiAgY2xvc2VUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZHluYW1pY1RhYnNbaV0gPT09IHRhYikge1xuICAgICAgICB0aGlzLmR5bmFtaWNUYWJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLnJlbW92ZShpKTtcbiAgICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdOyAgLy8gVE9ETzogZHVwbGljYXRlIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBjbG9zZUFjdGl2ZVRhYigpIHtcbiAgICBpZiAodGhpcy5tdWx0aSkgY29uc29sZS53YXJuKCdDbG9zaW5nIHRoZSBmaXJzdCBhY3RpdmUgdGFiJyk7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5keW5hbWljVGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoID4gMCkgdGhpcy5jbG9zZVRhYihhY3RpdmVUYWJbMF0pO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdCgpIHtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID8gdGhpcy5saXN0LmRlc2VsZWN0QWxsKCkgOiB0aGlzLmxpc3Quc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVGFiQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgYXJyOiBWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gdGhpcy50YWJzLnRvQXJyYXkoKS5jb25jYXQodGhpcy5keW5hbWljVGFicyk7XG4gICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgYXJyLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBzLmhhcyh0YWIudGFiVGl0bGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aSB8fCAhdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgfHwgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoXG4gICAgICB0YWJUaXRsZSA9PiB0YWJUaXRsZSAhPT0gdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zW3RoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdEFsbCgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gdGhpcy5saXN0Lm9wdGlvbnMubGVuZ3RoIDwgMSA/IGZhbHNlXG4gICAgICA6IHRoaXMubGlzdC5vcHRpb25zLnJlZHVjZSgocCwgYykgPT4gcCA/IGMuc2VsZWN0ZWQgOiBwLCB0cnVlKTtcbiAgfVxufVxuIl19