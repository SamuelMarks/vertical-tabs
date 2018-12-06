import { Injectable, Directive, ViewContainerRef, Component, Input, NgModule, ComponentFactoryResolver, ContentChildren, ViewChild, defineInjectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectionList, MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VerticalTabsService = /** @class */ (function () {
    function VerticalTabsService() {
        this.selectedOptions = [];
    }
    VerticalTabsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    VerticalTabsService.ctorParameters = function () { return []; };
    /** @nocollapse */ VerticalTabsService.ngInjectableDef = defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });
    return VerticalTabsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DynamicTabAnchorDirective = /** @class */ (function () {
    function DynamicTabAnchorDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DynamicTabAnchorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngVerticalDynamicTabAnchor]'
                },] }
    ];
    /** @nocollapse */
    DynamicTabAnchorDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return DynamicTabAnchorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                }] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] }
    ];
    return VerticalTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { VerticalTabsService, VerticalTabsComponent, VerticalTabsModule, DynamicTabAnchorDirective as ɵb, VerticalTabComponent as ɵa };

//# sourceMappingURL=vertical-tabs.js.map