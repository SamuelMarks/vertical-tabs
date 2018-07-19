import { Injectable, Component, Input, Directive, ViewContainerRef, NgModule, ComponentFactoryResolver, ContentChildren, ViewChild, defineInjectable } from '@angular/core';
import { MatSelectionList, MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VerticalTabsService = /** @class */ (function () {
    function VerticalTabsService() {
        this.selectedOptions = [];
    }
    VerticalTabsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    VerticalTabsService.ctorParameters = function () { return []; };
    /** @nocollapse */ VerticalTabsService.ngInjectableDef = defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });
    return VerticalTabsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicTabAnchorDirective = /** @class */ (function () {
    function DynamicTabAnchorDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DynamicTabAnchorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngVerticalDynamicTabAnchor]'
                },] },
    ];
    /** @nocollapse */
    DynamicTabAnchorDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return DynamicTabAnchorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VerticalTabComponent = /** @class */ (function () {
    function VerticalTabComponent(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
    VerticalTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-vertical-tab',
                    template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                    styles: ["\n    .pane {\n      padding: 1em;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    VerticalTabComponent.ctorParameters = function () { return [
        { type: VerticalTabsService }
    ]; };
    VerticalTabComponent.propDecorators = {
        tabTitle: [{ type: Input }],
        active: [{ type: Input }],
        template: [{ type: Input }],
        dataContext: [{ type: Input }],
        isCloseable: [{ type: Input }]
    };
    return VerticalTabComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VerticalTabsModule = /** @class */ (function () {
    function VerticalTabsModule() {
    }
    /**
     * @return {?}
     */
    VerticalTabsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: VerticalTabsModule, providers: [VerticalTabsService] };
    };
    VerticalTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule,
                        FlexLayoutModule,
                        MatListModule, MatDividerModule, MatButtonModule
                    ],
                    entryComponents: [VerticalTabComponent],
                    declarations: [DynamicTabAnchorDirective, VerticalTabComponent, VerticalTabsComponent],
                    exports: [VerticalTabComponent, VerticalTabsComponent]
                },] },
    ];
    return VerticalTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { VerticalTabsService, VerticalTabsComponent, VerticalTabsModule, DynamicTabAnchorDirective as ɵb, VerticalTabComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFicy5zZXJ2aWNlLnRzIiwibmc6Ly92ZXJ0aWNhbC10YWJzL2xpYi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlLnRzIiwibmc6Ly92ZXJ0aWNhbC10YWJzL2xpYi92ZXJ0aWNhbC10YWIuY29tcG9uZW50LnRzIiwibmc6Ly92ZXJ0aWNhbC10YWJzL2xpYi92ZXJ0aWNhbC10YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIHtcbiAgbXVsdGk6IGJvb2xlYW47XG4gIHNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ1ZlcnRpY2FsRHluYW1pY1RhYkFuY2hvcl0nXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXZlcnRpY2FsLXRhYicsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImFjdGl2ZVwiIGNsYXNzPVwicGFuZVwiPlxuICA8aDMgY2xhc3M9XCJ0YWItaGVhZGluZ1wiICpuZ0lmPVwidGFic1NlcnZpY2UubXVsdGkgJiYgdGFic1NlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDFcIj5cbiAgICB7e3RhYlRpdGxlfX1cbiAgPC9oMz5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3BlcnNvbjogZGF0YUNvbnRleHR9XCI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgXG4gICAgLnBhbmUge1xuICAgICAgcGFkZGluZzogMWVtO1xuICAgIH1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJDb21wb25lbnQge1xuICBASW5wdXQoKSB0YWJUaXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGVtcGxhdGU7XG4gIEBJbnB1dCgpIGRhdGFDb250ZXh0O1xuICBASW5wdXQoKSBpc0Nsb3NlYWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNlbGVjdGlvbkxpc3QgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFicycsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMXB4XCIgZnhMYXlvdXQueHM9XCJjb2x1bW5cIj5cbiAgPGRpdiBmeEZsZXg9XCIzMyVcIj5cbiAgICA8bWF0LXNlbGVjdGlvbi1saXN0ICNsaXN0IFsobmdNb2RlbCldPVwidGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25OZ01vZGVsQ2hhbmdlKClcIj5cbiAgICAgIDxtYXQtbGlzdC1vcHRpb24gKm5nRm9yPVwibGV0IHRhYiBvZiBbXS5jb25jYXQodGFicy50b0FycmF5KCksIGR5bmFtaWNUYWJzKVwiIFt2YWx1ZV09XCJ0YWIudGFiVGl0bGVcIj5cbiAgICAgICAge3t0YWIudGFiVGl0bGV9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGlkPVwic2VsZWN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoKVwiICpuZ0lmPVwic2hvd1NlbGVjdEFsbFwiPlxuICAgICAge3thbGxTZWxlY3RlZCA/ICdSZXNldCBzZWxlY3Rpb24nIDogJ1NlbGVjdCBhbGwnfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg9XCI2NiVcIiAqbmdJZj1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctdGVtcGxhdGUgbmdWZXJ0aWNhbER5bmFtaWNUYWJBbmNob3IgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihWZXJ0aWNhbFRhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PFZlcnRpY2FsVGFiQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZChEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlKSBkeW5hbWljVGFiUGxhY2Vob2xkZXI6IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChNYXRTZWxlY3Rpb25MaXN0KSBsaXN0OiBNYXRTZWxlY3Rpb25MaXN0O1xuXG4gIEBJbnB1dCgpIG11bHRpID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VsZWN0Rmlyc3RUYWIgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U2VsZWN0QWxsID0gZmFsc2U7XG4gIGFsbFNlbGVjdGVkID0gdHJ1ZTtcblxuICBkeW5hbWljVGFiczogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IFtdO1xuXG4gIGxhc3RTZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyB0YWJTZXJ2aWNlOiBWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLm11bHRpID0gdGhpcy5tdWx0aTtcbiAgfVxuXG4gIC8vIGNvbnRlbnRDaGlsZHJlbiBhcmUgc2V0XG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBhY3RpdmUgdGFiIHNldCwgYWN0aXZhdGUgdGhlIGZpcnN0XG4gICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RUYWIgJiYgIXRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpLmxlbmd0aClcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgZWxzZSB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBvbk5nTW9kZWxDaGFuZ2UoLypzZWxlY3RlZDogc3RyaW5nW10qLykge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMudG9nZ2xlVGFiQWN0aXZhdGlvbnMoKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIHRoaXMubXVsdGkgP1xuICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRhYi50YWJUaXRsZSlcbiAgICAgIDogdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdO1xuICAgIHRhYi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubGlzdC5vcHRpb25zLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5vcHRpb25zLmZvckVhY2godCA9PiB7XG4gICAgICB0LnNlbGVjdGVkID0gcy5oYXModC52YWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYCcke3QudmFsdWV9JyBzZWxlY3RlZDpgLCB0LnNlbGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnNfc2V0ID0gbmV3IFNldChvcHRpb25zKTtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmICghb3B0aW9uc19zZXQuaGFzKG9wdGlvbikpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihgJyR7b3B0aW9ufScgbm90IGZvdW5kIGluIG1hdC1zZWxlY3Rpb24tbGlzdGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgb3BlblRhYih0aXRsZTogc3RyaW5nLCB0ZW1wbGF0ZSwgZGF0YSwgaXNDbG9zZWFibGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIFZlcnRpY2FsVGFiQ29tcG9uZW50XG4gICAgKTtcblxuICAgIC8vIGNyZWF0ZSBhIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgLy8gc2V0IHRoZSBhY2NvcmRpbmcgcHJvcGVydGllcyBvbiBvdXIgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgaW5zdGFuY2U6IFZlcnRpY2FsVGFiQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIFZlcnRpY2FsVGFiQ29tcG9uZW50O1xuICAgIGluc3RhbmNlLnRhYlRpdGxlID0gdGl0bGU7XG4gICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICBpbnN0YW5jZS5kYXRhQ29udGV4dCA9IGRhdGE7XG4gICAgaW5zdGFuY2UuaXNDbG9zZWFibGUgPSBpc0Nsb3NlYWJsZTtcbiAgICBpbnN0YW5jZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5keW5hbWljVGFicy5wdXNoKGluc3RhbmNlKTtcbiAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmR5bmFtaWNUYWJzW3RoaXMuZHluYW1pY1RhYnMubGVuZ3RoIC0gMV0pO1xuICB9XG5cbiAgY2xvc2VUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZHluYW1pY1RhYnNbaV0gPT09IHRhYikge1xuICAgICAgICB0aGlzLmR5bmFtaWNUYWJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLnJlbW92ZShpKTtcbiAgICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdOyAgLy8gVE9ETzogZHVwbGljYXRlIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBjbG9zZUFjdGl2ZVRhYigpIHtcbiAgICBpZiAodGhpcy5tdWx0aSkgY29uc29sZS53YXJuKCdDbG9zaW5nIHRoZSBmaXJzdCBhY3RpdmUgdGFiJyk7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5keW5hbWljVGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoID4gMCkgdGhpcy5jbG9zZVRhYihhY3RpdmVUYWJbMF0pO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdCgpIHtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID8gdGhpcy5saXN0LmRlc2VsZWN0QWxsKCkgOiB0aGlzLmxpc3Quc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVGFiQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgYXJyOiBWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gdGhpcy50YWJzLnRvQXJyYXkoKS5jb25jYXQodGhpcy5keW5hbWljVGFicyk7XG4gICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgYXJyLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBzLmhhcyh0YWIudGFiVGl0bGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aSB8fCAhdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgfHwgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoXG4gICAgICB0YWJUaXRsZSA9PiB0YWJUaXRsZSAhPT0gdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zW3RoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdEFsbCgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gdGhpcy5saXN0Lm9wdGlvbnMubGVuZ3RoIDwgMSA/IGZhbHNlXG4gICAgICA6IHRoaXMubGlzdC5vcHRpb25zLnJlZHVjZSgocCwgYykgPT4gcCA/IGMuc2VsZWN0ZWQgOiBwLCB0cnVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IFZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtWZXJ0aWNhbFRhYkNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0R5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUsIFZlcnRpY2FsVGFiQ29tcG9uZW50LCBWZXJ0aWNhbFRhYnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVmVydGljYWxUYWJDb21wb25lbnQsIFZlcnRpY2FsVGFic0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBWZXJ0aWNhbFRhYnNNb2R1bGUsIHByb3ZpZGVyczogW1ZlcnRpY2FsVGFic1NlcnZpY2VdIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFTRTtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0tBQzNCOztnQkFURixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozs4QkFKRDs7Ozs7OztBQ0FBO0lBTUUsbUNBQW1CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtLQUNqRDs7Z0JBTEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7aUJBQ3pDOzs7O2dCQUptQixnQkFBZ0I7O29DQUFwQzs7Ozs7OztBQ0FBO0lBOEJFLDhCQUFtQixXQUFnQztRQUFoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7c0JBTGpDLEtBQUs7MkJBR0EsS0FBSztLQUczQjs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsMlhBVVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsK0NBSVIsQ0FBQztp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