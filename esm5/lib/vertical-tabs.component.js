/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.ngAfterContentInit = /**
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
    function () {
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
        var /** @type {?} */ options = this.list.options.map(function (t) { return t.value; });
        var /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(function (t) {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        var /** @type {?} */ options_set = new Set(options);
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
        var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
        // create a component instance
        var /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        var /** @type {?} */ instance = /** @type {?} */ (componentRef.instance);
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
        for (var /** @type {?} */ i = 0; i < this.dynamicTabs.length; i++) {
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
        var /** @type {?} */ activeTab = this.dynamicTabs.filter(function (tab) { return tab.active; });
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
     * @return {?}
     */
    VerticalTabsComponent.prototype.toggleTabActivations = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        var /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        arr.forEach(function (tab) { return tab.active = s.has(tab.tabTitle); });
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.setOptions = /**
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
     * @return {?}
     */
    VerticalTabsComponent.prototype.checkSelectAll = /**
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
                    template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                    styles: []
                },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBMEM1RCwrQkFBb0Isd0JBQWtELEVBQ25EO1FBREMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNuRCxlQUFVLEdBQVYsVUFBVTtxQkFWWixJQUFJOzhCQUNLLElBQUk7NkJBQ0wsS0FBSzsyQkFDaEIsSUFBSTsyQkFFb0IsRUFBRTtRQU10QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3BDO0lBRUQsMEJBQTBCOzs7O0lBQzFCLGtEQUFrQjs7O0lBQWxCOztRQUVFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLEVBQVYsQ0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQUMsSUFBSSxDQUFDLGNBQWMsRUFB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LElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDOzs7OztJQUdyRCw4Q0FBYzs7OztRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O2dCQXhKcEUsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxnMUJBb0JYO29CQUNDLE1BQU0sRUFBRSxFQUFFO2lCQUNYOzs7O2dCQS9CcUMsd0JBQXdCO2dCQUtyRCxtQkFBbUI7Ozt1QkE0QnpCLGVBQWUsU0FBQyxvQkFBb0I7d0NBQ3BDLFNBQVMsU0FBQyx5QkFBeUI7dUJBRW5DLFNBQVMsU0FBQyxnQkFBZ0I7d0JBRTFCLEtBQUs7aUNBQ0wsS0FBSztnQ0FDTCxLQUFLOztnQ0F4Q1I7O1NBZ0NhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0aW9uTGlzdCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdmVydGljYWwtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy12ZXJ0aWNhbC10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxcHhcIiBmeExheW91dC54cz1cImNvbHVtblwiPlxuICA8ZGl2IGZ4RmxleD1cIjMzJVwiPlxuICAgIDxtYXQtc2VsZWN0aW9uLWxpc3QgI2xpc3QgWyhuZ01vZGVsKV09XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvbk5nTW9kZWxDaGFuZ2UoKVwiPlxuICAgICAgPG1hdC1saXN0LW9wdGlvbiAqbmdGb3I9XCJsZXQgdGFiIG9mIFtdLmNvbmNhdCh0YWJzLnRvQXJyYXkoKSwgZHluYW1pY1RhYnMpXCIgW3ZhbHVlXT1cInRhYi50YWJUaXRsZVwiPlxuICAgICAgICB7e3RhYi50YWJUaXRsZX19XG4gICAgICA8L21hdC1saXN0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Rpb24tbGlzdD5cbiAgICA8bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgaWQ9XCJzZWxlY3RcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdCgpXCIgKm5nSWY9XCJzaG93U2VsZWN0QWxsXCI+XG4gICAgICB7e2FsbFNlbGVjdGVkID8gJ1Jlc2V0IHNlbGVjdGlvbicgOiAnU2VsZWN0IGFsbCd9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleD1cIjY2JVwiICpuZ0lmPVwidGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxuZy10ZW1wbGF0ZSBuZ1ZlcnRpY2FsRHluYW1pY1RhYkFuY2hvciAjY29udGFpbmVyPjwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKFZlcnRpY2FsVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8VmVydGljYWxUYWJDb21wb25lbnQ+O1xuICBAVmlld0NoaWxkKER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUpIGR5bmFtaWNUYWJQbGFjZWhvbGRlcjogRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE1hdFNlbGVjdGlvbkxpc3QpIGxpc3Q6IE1hdFNlbGVjdGlvbkxpc3Q7XG5cbiAgQElucHV0KCkgbXVsdGkgPSB0cnVlO1xuICBASW5wdXQoKSBzZWxlY3RGaXJzdFRhYiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dTZWxlY3RBbGwgPSBmYWxzZTtcbiAgYWxsU2VsZWN0ZWQgPSB0cnVlO1xuXG4gIGR5bmFtaWNUYWJzOiBWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gW107XG5cbiAgbGFzdFNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHVibGljIHRhYlNlcnZpY2U6IFZlcnRpY2FsVGFic1NlcnZpY2UpIHtcbiAgICB0aGlzLnRhYlNlcnZpY2UubXVsdGkgPSB0aGlzLm11bHRpO1xuICB9XG5cbiAgLy8gY29udGVudENoaWxkcmVuIGFyZSBzZXRcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSB0YWIgc2V0LCBhY3RpdmF0ZSB0aGUgZmlyc3RcbiAgICBpZiAodGhpcy5zZWxlY3RGaXJzdFRhYiAmJiAhdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSkubGVuZ3RoKVxuICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICBlbHNlIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIG9uTmdNb2RlbENoYW5nZSgvKnNlbGVjdGVkOiBzdHJpbmdbXSovKSB7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgdGhpcy50b2dnbGVUYWJBY3RpdmF0aW9ucygpO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHNlbGVjdFRhYih0YWI6IFZlcnRpY2FsVGFiQ29tcG9uZW50KSB7XG4gICAgdGhpcy5tdWx0aSA/XG4gICAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLnB1c2godGFiLnRhYlRpdGxlKVxuICAgICAgOiB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gW3RhYi50YWJUaXRsZV07XG4gICAgdGFiLmFjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMubGlzdC5vcHRpb25zKSByZXR1cm47XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5saXN0Lm9wdGlvbnMubWFwKHQgPT4gdC52YWx1ZSk7XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgdGhpcy5saXN0Lm9wdGlvbnMuZm9yRWFjaCh0ID0+IHtcbiAgICAgIHQuc2VsZWN0ZWQgPSBzLmhhcyh0LnZhbHVlKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhgJyR7dC52YWx1ZX0nIHNlbGVjdGVkOmAsIHQuc2VsZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9uc19zZXQgPSBuZXcgU2V0KG9wdGlvbnMpO1xuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKCFvcHRpb25zX3NldC5oYXMob3B0aW9uKSlcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKGAnJHtvcHRpb259JyBub3QgZm91bmQgaW4gbWF0LXNlbGVjdGlvbi1saXN0YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBvcGVuVGFiKHRpdGxlOiBzdHJpbmcsIHRlbXBsYXRlLCBkYXRhLCBpc0Nsb3NlYWJsZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgVmVydGljYWxUYWJDb21wb25lbnRcbiAgICApO1xuXG4gICAgLy8gY3JlYXRlIGEgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAvLyBzZXQgdGhlIGFjY29yZGluZyBwcm9wZXJ0aWVzIG9uIG91ciBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBpbnN0YW5jZTogVmVydGljYWxUYWJDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgVmVydGljYWxUYWJDb21wb25lbnQ7XG4gICAgaW5zdGFuY2UudGFiVGl0bGUgPSB0aXRsZTtcbiAgICBpbnN0YW5jZS50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIGluc3RhbmNlLmRhdGFDb250ZXh0ID0gZGF0YTtcbiAgICBpbnN0YW5jZS5pc0Nsb3NlYWJsZSA9IGlzQ2xvc2VhYmxlO1xuICAgIGluc3RhbmNlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmR5bmFtaWNUYWJzLnB1c2goaW5zdGFuY2UpO1xuICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZHluYW1pY1RhYnNbdGhpcy5keW5hbWljVGFicy5sZW5ndGggLSAxXSk7XG4gIH1cblxuICBjbG9zZVRhYih0YWI6IFZlcnRpY2FsVGFiQ29tcG9uZW50KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5keW5hbWljVGFic1tpXSA9PT0gdGFiKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1RhYnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgIHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIucmVtb3ZlKGkpO1xuICAgICAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gW3RhYi50YWJUaXRsZV07ICAvLyBUT0RPOiBkdXBsaWNhdGUgaGFuZGxpbmdcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIGNsb3NlQWN0aXZlVGFiKCkge1xuICAgIGlmICh0aGlzLm11bHRpKSBjb25zb2xlLndhcm4oJ0Nsb3NpbmcgdGhlIGZpcnN0IGFjdGl2ZSB0YWInKTtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmR5bmFtaWNUYWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSk7XG4gICAgaWYgKGFjdGl2ZVRhYi5sZW5ndGggPiAwKSB0aGlzLmNsb3NlVGFiKGFjdGl2ZVRhYlswXSk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0KCkge1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPyB0aGlzLmxpc3QuZGVzZWxlY3RBbGwoKSA6IHRoaXMubGlzdC5zZWxlY3RBbGwoKTtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuYWxsU2VsZWN0ZWQ7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVUYWJBY3RpdmF0aW9ucygpIHtcbiAgICBjb25zdCBhcnI6IFZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSB0aGlzLnRhYnMudG9BcnJheSgpLmNvbmNhdCh0aGlzLmR5bmFtaWNUYWJzKTtcbiAgICBpZiAoYXJyID09IG51bGwgfHwgYXJyLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICBhcnIuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IHMuaGFzKHRhYi50YWJUaXRsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm11bHRpIHx8ICF0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCB8fFxuICAgICAgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyB8fCAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZpbHRlcihcbiAgICAgIHRhYlRpdGxlID0+IHRhYlRpdGxlICE9PSB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnNbdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aCAtIDFdXG4gICAgKTtcblxuICAgIHRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrU2VsZWN0QWxsKCkge1xuICAgIGlmICghdGhpcy5saXN0IHx8ICF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSB0aGlzLmxpc3Qub3B0aW9ucy5sZW5ndGggPCAxID8gZmFsc2VcbiAgICAgIDogdGhpcy5saXN0Lm9wdGlvbnMucmVkdWNlKChwLCBjKSA9PiBwID8gYy5zZWxlY3RlZCA6IHAsIHRydWUpO1xuICB9XG59XG4iXX0=