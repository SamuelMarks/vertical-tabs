(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/material'), require('@angular/flex-layout')) :
    typeof define === 'function' && define.amd ? define('vertical-tabs', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@angular/material', '@angular/flex-layout'], factory) :
    (factory((global['vertical-tabs'] = {}),global.ng.core,global.ng.forms,global.ng.common,global.ng.material,global.ng['flex-layout']));
}(this, (function (exports,i0,forms,common,material,flexLayout) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var VerticalTabsService = /** @class */ (function () {
        function VerticalTabsService() {
            this.selectedOptions = [];
        }
        VerticalTabsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        VerticalTabsService.ctorParameters = function () { return []; };
        /** @nocollapse */ VerticalTabsService.ngInjectableDef = i0.defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });
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
            { type: i0.Directive, args: [{
                        selector: '[ngVerticalDynamicTabAnchor]'
                    },] }
        ];
        /** @nocollapse */
        DynamicTabAnchorDirective.ctorParameters = function () {
            return [
                { type: i0.ViewContainerRef }
            ];
        };
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
            { type: i0.Component, args: [{
                        selector: 'ng-vertical-tab',
                        template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                        styles: ["\n    .pane {\n      padding: 1em;\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        VerticalTabComponent.ctorParameters = function () {
            return [
                { type: VerticalTabsService }
            ];
        };
        VerticalTabComponent.propDecorators = {
            tabTitle: [{ type: i0.Input }],
            active: [{ type: i0.Input }],
            template: [{ type: i0.Input }],
            dataContext: [{ type: i0.Input }],
            isCloseable: [{ type: i0.Input }]
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
                if (isCloseable === void 0) {
                    isCloseable = false;
                }
                /** @type {?} */
                var componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
                // create a component instance
                /** @type {?} */
                var componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
                // set the according properties on our component instance
                /** @type {?} */
                var instance = ( /** @type {?} */(componentRef.instance));
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
            { type: i0.Component, args: [{
                        selector: 'ng-vertical-tabs',
                        template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n"
                    }] }
        ];
        /** @nocollapse */
        VerticalTabsComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver },
                { type: VerticalTabsService }
            ];
        };
        VerticalTabsComponent.propDecorators = {
            tabs: [{ type: i0.ContentChildren, args: [VerticalTabComponent,] }],
            dynamicTabPlaceholder: [{ type: i0.ViewChild, args: [DynamicTabAnchorDirective,] }],
            list: [{ type: i0.ViewChild, args: [material.MatSelectionList,] }],
            multi: [{ type: i0.Input }],
            selectFirstTab: [{ type: i0.Input }],
            showSelectAll: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule, forms.FormsModule,
                            flexLayout.FlexLayoutModule,
                            material.MatListModule, material.MatDividerModule, material.MatButtonModule
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

    exports.VerticalTabsService = VerticalTabsService;
    exports.VerticalTabsComponent = VerticalTabsComponent;
    exports.VerticalTabsModule = VerticalTabsModule;
    exports.ɵb = DynamicTabAnchorDirective;
    exports.ɵa = VerticalTabComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=vertical-tabs.umd.js.map