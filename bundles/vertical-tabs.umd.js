(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/forms'), require('@angular/common'), require('@angular/flex-layout')) :
    typeof define === 'function' && define.amd ? define('vertical-tabs', ['exports', '@angular/core', '@angular/material', '@angular/forms', '@angular/common', '@angular/flex-layout'], factory) :
    (factory((global['vertical-tabs'] = {}),global.ng.core,global.ng.material,global.ng.forms,global.ng.common,global.ng['flex-layout']));
}(this, (function (exports,i0,material,forms,common,flexLayout) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabsService = (function () {
        function VerticalTabsService() {
            this.selectedOptions = [];
        }
        VerticalTabsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        VerticalTabsService.ctorParameters = function () { return []; };
        /** @nocollapse */ VerticalTabsService.ngInjectableDef = i0.defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });
        return VerticalTabsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DynamicTabAnchorDirective = (function () {
        function DynamicTabAnchorDirective(viewContainer) {
            this.viewContainer = viewContainer;
        }
        DynamicTabAnchorDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[ngVerticalDynamicTabAnchor]'
                    },] },
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
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabComponent = (function () {
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
                    },] },
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
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabsComponent = (function () {
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
                if (isCloseable === void 0) {
                    isCloseable = false;
                }
                var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
                // create a component instance
                var /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
                // set the according properties on our component instance
                var /** @type {?} */ instance = (componentRef.instance);
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
            { type: i0.Component, args: [{
                        selector: 'ng-vertical-tabs',
                        template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                        styles: []
                    },] },
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
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabsModule = (function () {
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

    exports.VerticalTabsService = VerticalTabsService;
    exports.VerticalTabsComponent = VerticalTabsComponent;
    exports.VerticalTabsModule = VerticalTabsModule;
    exports.ɵb = DynamicTabAnchorDirective;
    exports.ɵa = VerticalTabComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3ZlcnRpY2FsLXRhYnMvbGliL3ZlcnRpY2FsLXRhYnMuc2VydmljZS50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFiLmNvbXBvbmVudC50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFicy5jb21wb25lbnQudHMiLCJuZzovL3ZlcnRpY2FsLXRhYnMvbGliL3ZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzU2VydmljZSB7XG4gIG11bHRpOiBib29sZWFuO1xuICBzZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdWZXJ0aWNhbER5bmFtaWNUYWJBbmNob3JdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy12ZXJ0aWNhbC10YWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJhY3RpdmVcIiBjbGFzcz1cInBhbmVcIj5cbiAgPGgzIGNsYXNzPVwidGFiLWhlYWRpbmdcIiAqbmdJZj1cInRhYnNTZXJ2aWNlLm11bHRpICYmIHRhYnNTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPiAxXCI+XG4gICAge3t0YWJUaXRsZX19XG4gIDwvaDM+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntwZXJzb246IGRhdGFDb250ZXh0fVwiPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYFxuICAgIC5wYW5lIHtcbiAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsVGFiQ29tcG9uZW50IHtcbiAgQElucHV0KCkgdGFiVGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlO1xuICBASW5wdXQoKSBkYXRhQ29udGV4dDtcbiAgQElucHV0KCkgaXNDbG9zZWFibGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFic1NlcnZpY2U6IFZlcnRpY2FsVGFic1NlcnZpY2UpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3Rpb25MaXN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXZlcnRpY2FsLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjFweFwiIGZ4TGF5b3V0LnhzPVwiY29sdW1uXCI+XG4gIDxkaXYgZnhGbGV4PVwiMzMlXCI+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjbGlzdCBbKG5nTW9kZWwpXT1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uTmdNb2RlbENoYW5nZSgpXCI+XG4gICAgICA8bWF0LWxpc3Qtb3B0aW9uICpuZ0Zvcj1cImxldCB0YWIgb2YgW10uY29uY2F0KHRhYnMudG9BcnJheSgpLCBkeW5hbWljVGFicylcIiBbdmFsdWVdPVwidGFiLnRhYlRpdGxlXCI+XG4gICAgICAgIHt7dGFiLnRhYlRpdGxlfX1cbiAgICAgIDwvbWF0LWxpc3Qtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdGlvbi1saXN0PlxuICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBpZD1cInNlbGVjdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KClcIiAqbmdJZj1cInNob3dTZWxlY3RBbGxcIj5cbiAgICAgIHt7YWxsU2VsZWN0ZWQgPyAnUmVzZXQgc2VsZWN0aW9uJyA6ICdTZWxlY3QgYWxsJ319XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PVwiNjYlXCIgKm5nSWY9XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGhcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIG5nVmVydGljYWxEeW5hbWljVGFiQW5jaG9yICNjb250YWluZXI+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oVmVydGljYWxUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxWZXJ0aWNhbFRhYkNvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGQoRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSkgZHluYW1pY1RhYlBsYWNlaG9sZGVyOiBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U2VsZWN0aW9uTGlzdCkgbGlzdDogTWF0U2VsZWN0aW9uTGlzdDtcblxuICBASW5wdXQoKSBtdWx0aSA9IHRydWU7XG4gIEBJbnB1dCgpIHNlbGVjdEZpcnN0VGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1NlbGVjdEFsbCA9IGZhbHNlO1xuICBhbGxTZWxlY3RlZCA9IHRydWU7XG5cbiAgZHluYW1pY1RhYnM6IFZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSBbXTtcblxuICBsYXN0U2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdGFiU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICAgIHRoaXMudGFiU2VydmljZS5tdWx0aSA9IHRoaXMubXVsdGk7XG4gIH1cblxuICAvLyBjb250ZW50Q2hpbGRyZW4gYXJlIHNldFxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHRhYiBzZXQsIGFjdGl2YXRlIHRoZSBmaXJzdFxuICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0VGFiICYmICF0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKS5sZW5ndGgpXG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgIGVsc2UgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgb25OZ01vZGVsQ2hhbmdlKC8qc2VsZWN0ZWQ6IHN0cmluZ1tdKi8pIHtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLnRvZ2dsZVRhYkFjdGl2YXRpb25zKCk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYjogVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICB0aGlzLm11bHRpID9cbiAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMucHVzaCh0YWIudGFiVGl0bGUpXG4gICAgICA6IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTtcbiAgICB0YWIuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmxpc3Qub3B0aW9ucy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpc3Qub3B0aW9ucy5mb3JFYWNoKHQgPT4ge1xuICAgICAgdC5zZWxlY3RlZCA9IHMuaGFzKHQudmFsdWUpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKGAnJHt0LnZhbHVlfScgc2VsZWN0ZWQ6YCwgdC5zZWxlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zX3NldCA9IG5ldyBTZXQob3B0aW9ucyk7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAoIW9wdGlvbnNfc2V0LmhhcyhvcHRpb24pKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoYCcke29wdGlvbn0nIG5vdCBmb3VuZCBpbiBtYXQtc2VsZWN0aW9uLWxpc3RgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIG9wZW5UYWIodGl0bGU6IHN0cmluZywgdGVtcGxhdGUsIGRhdGEsIGlzQ2xvc2VhYmxlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBWZXJ0aWNhbFRhYkNvbXBvbmVudFxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgYSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIC8vIHNldCB0aGUgYWNjb3JkaW5nIHByb3BlcnRpZXMgb24gb3VyIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGluc3RhbmNlOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBWZXJ0aWNhbFRhYkNvbXBvbmVudDtcbiAgICBpbnN0YW5jZS50YWJUaXRsZSA9IHRpdGxlO1xuICAgIGluc3RhbmNlLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgaW5zdGFuY2UuZGF0YUNvbnRleHQgPSBkYXRhO1xuICAgIGluc3RhbmNlLmlzQ2xvc2VhYmxlID0gaXNDbG9zZWFibGU7XG4gICAgaW5zdGFuY2UuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuZHluYW1pY1RhYnMucHVzaChpbnN0YW5jZSk7XG4gICAgdGhpcy5zZWxlY3RUYWIodGhpcy5keW5hbWljVGFic1t0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIGNsb3NlVGFiKHRhYjogVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHluYW1pY1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmR5bmFtaWNUYWJzW2ldID09PSB0YWIpIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGFicy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5yZW1vdmUoaSk7XG4gICAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTsgIC8vIFRPRE86IGR1cGxpY2F0ZSBoYW5kbGluZ1xuICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgY2xvc2VBY3RpdmVUYWIoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkpIGNvbnNvbGUud2FybignQ2xvc2luZyB0aGUgZmlyc3QgYWN0aXZlIHRhYicpO1xuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMuZHluYW1pY1RhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKTtcbiAgICBpZiAoYWN0aXZlVGFiLmxlbmd0aCA+IDApIHRoaXMuY2xvc2VUYWIoYWN0aXZlVGFiWzBdKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3QoKSB7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA/IHRoaXMubGlzdC5kZXNlbGVjdEFsbCgpIDogdGhpcy5saXN0LnNlbGVjdEFsbCgpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5hbGxTZWxlY3RlZDtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVRhYkFjdGl2YXRpb25zKCkge1xuICAgIGNvbnN0IGFycjogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IHRoaXMudGFicy50b0FycmF5KCkuY29uY2F0KHRoaXMuZHluYW1pY1RhYnMpO1xuICAgIGlmIChhcnIgPT0gbnVsbCB8fCBhcnIubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIGFyci5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gcy5oYXModGFiLnRhYlRpdGxlKSk7XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkgfHwgIXRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIHx8XG4gICAgICAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zIHx8ICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZmlsdGVyKFxuICAgICAgdGFiVGl0bGUgPT4gdGFiVGl0bGUgIT09IHRoaXMubGFzdFNlbGVjdGVkT3B0aW9uc1t0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICApO1xuXG4gICAgdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tTZWxlY3RBbGwoKSB7XG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgIXRoaXMubGlzdC5vcHRpb25zKSByZXR1cm47XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9IHRoaXMubGlzdC5vcHRpb25zLmxlbmd0aCA8IDEgPyBmYWxzZVxuICAgICAgOiB0aGlzLmxpc3Qub3B0aW9ucy5yZWR1Y2UoKHAsIGMpID0+IHAgPyBjLnNlbGVjdGVkIDogcCwgdHJ1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuaW1wb3J0IHsgVmVydGljYWxUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdmVydGljYWwtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVmVydGljYWxUYWJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlLCBWZXJ0aWNhbFRhYkNvbXBvbmVudCwgVmVydGljYWxUYWJzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1ZlcnRpY2FsVGFiQ29tcG9uZW50LCBWZXJ0aWNhbFRhYnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsVGFic01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogVmVydGljYWxUYWJzTW9kdWxlLCBwcm92aWRlcnM6IFtWZXJ0aWNhbFRhYnNTZXJ2aWNlXSB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkRpcmVjdGl2ZSIsIlZpZXdDb250YWluZXJSZWYiLCJDb21wb25lbnQiLCJJbnB1dCIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIkNvbnRlbnRDaGlsZHJlbiIsIlZpZXdDaGlsZCIsIk1hdFNlbGVjdGlvbkxpc3QiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiRmxleExheW91dE1vZHVsZSIsIk1hdExpc3RNb2R1bGUiLCJNYXREaXZpZGVyTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFTRTtZQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzNCOztvQkFURkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7a0NBSkQ7Ozs7Ozs7QUNBQTtRQU1FLG1DQUFtQixhQUErQjtZQUEvQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7U0FDakQ7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