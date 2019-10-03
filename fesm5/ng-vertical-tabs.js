import { Injectable, ɵɵdefineInjectable, Component, Input, Directive, ViewContainerRef, ComponentFactoryResolver, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { MatSelectionList, MatListModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgVerticalTabsService = /** @class */ (function () {
    function NgVerticalTabsService() {
        this.selectedOptions = [];
    }
    NgVerticalTabsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgVerticalTabsService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgVerticalTabsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgVerticalTabsService_Factory() { return new NgVerticalTabsService(); }, token: NgVerticalTabsService, providedIn: "root" });
    return NgVerticalTabsService;
}());
if (false) {
    /** @type {?} */
    NgVerticalTabsService.prototype.multi;
    /** @type {?} */
    NgVerticalTabsService.prototype.selectedOptions;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgVerticalTabComponent = /** @class */ (function () {
    function NgVerticalTabComponent(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
    NgVerticalTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-vertical-tab',
                    template: "ng-vertical-tab.component.html\n<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                    styles: [".pane{padding:1em}"]
                }] }
    ];
    /** @nocollapse */
    NgVerticalTabComponent.ctorParameters = function () { return [
        { type: NgVerticalTabsService }
    ]; };
    NgVerticalTabComponent.propDecorators = {
        tabTitle: [{ type: Input }],
        active: [{ type: Input }],
        template: [{ type: Input }],
        dataContext: [{ type: Input }],
        isCloseable: [{ type: Input }]
    };
    return NgVerticalTabComponent;
}());
if (false) {
    /** @type {?} */
    NgVerticalTabComponent.prototype.tabTitle;
    /** @type {?} */
    NgVerticalTabComponent.prototype.active;
    /** @type {?} */
    NgVerticalTabComponent.prototype.template;
    /** @type {?} */
    NgVerticalTabComponent.prototype.dataContext;
    /** @type {?} */
    NgVerticalTabComponent.prototype.isCloseable;
    /** @type {?} */
    NgVerticalTabComponent.prototype.tabsService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DynamicTabAnchorDirective = /** @class */ (function () {
    function DynamicTabAnchorDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DynamicTabAnchorDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[ngVerticalDynamicTabAnchor]'
                },] }
    ];
    /** @nocollapse */
    DynamicTabAnchorDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return DynamicTabAnchorDirective;
}());
if (false) {
    /** @type {?} */
    DynamicTabAnchorDirective.prototype.viewContainer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                    template: "ng-vertical-tabs.component.html\n<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgVerticalTabsModule = /** @class */ (function () {
    function NgVerticalTabsModule() {
    }
    /**
     * @return {?}
     */
    NgVerticalTabsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: NgVerticalTabsModule, providers: [NgVerticalTabsService] };
    };
    NgVerticalTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule,
                        FlexLayoutModule,
                        MatListModule, MatDividerModule, MatButtonModule
                    ],
                    entryComponents: [NgVerticalTabComponent],
                    declarations: [DynamicTabAnchorDirective, NgVerticalTabComponent, NgVerticalTabsComponent, NgVerticalTabComponent],
                    exports: [NgVerticalTabComponent, NgVerticalTabsComponent]
                },] }
    ];
    return NgVerticalTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgVerticalTabComponent, NgVerticalTabsComponent, NgVerticalTabsModule, NgVerticalTabsService, DynamicTabAnchorDirective as ɵa };
//# sourceMappingURL=ng-vertical-tabs.js.map
