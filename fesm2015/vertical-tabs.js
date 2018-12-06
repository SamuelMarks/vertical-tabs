import { Injectable, Directive, ViewContainerRef, Component, Input, NgModule, ComponentFactoryResolver, ContentChildren, ViewChild, defineInjectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectionList, MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalTabsService {
    constructor() {
        this.selectedOptions = [];
    }
}
VerticalTabsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
VerticalTabsService.ctorParameters = () => [];
/** @nocollapse */ VerticalTabsService.ngInjectableDef = defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DynamicTabAnchorDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
DynamicTabAnchorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngVerticalDynamicTabAnchor]'
            },] }
];
/** @nocollapse */
DynamicTabAnchorDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalTabComponent {
    /**
     * @param {?} tabsService
     */
    constructor(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
}
VerticalTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-vertical-tab',
                template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                styles: [`
    .pane {
      padding: 1em;
    }
  `]
            }] }
];
/** @nocollapse */
VerticalTabComponent.ctorParameters = () => [
    { type: VerticalTabsService }
];
VerticalTabComponent.propDecorators = {
    tabTitle: [{ type: Input }],
    active: [{ type: Input }],
    template: [{ type: Input }],
    dataContext: [{ type: Input }],
    isCloseable: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalTabsComponent {
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
        if (this.selectFirstTab && !this.tabs.filter(tab => tab.active).length)
            this.selectTab(this.tabs.first);
        else
            this.checkSelectAll();
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
        if (!this.list.options)
            return;
        /** @type {?} */
        const options = this.list.options.map(t => t.value);
        /** @type {?} */
        const s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(t => {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        /** @type {?} */
        const options_set = new Set(options);
        this.tabService.selectedOptions.forEach(option => {
            if (!options_set.has(option))
                throw TypeError(`'${option}' not found in mat-selection-list`);
        });
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
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
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
        if (this.multi)
            console.warn('Closing the first active tab');
        /** @type {?} */
        const activeTab = this.dynamicTabs.filter(tab => tab.active);
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
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
        if (arr == null || arr.length < 1)
            return;
        /** @type {?} */
        const s = new Set(this.tabService.selectedOptions);
        arr.forEach(tab => tab.active = s.has(tab.tabTitle));
    }
    /**
     * @private
     * @return {?}
     */
    setOptions() {
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter(tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]);
        this.lastSelectedOptions = this.tabService.selectedOptions;
    }
    /**
     * @private
     * @return {?}
     */
    checkSelectAll() {
        if (!this.list || !this.list.options)
            return;
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce((p, c) => p ? c.selected : p, true);
    }
}
VerticalTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-vertical-tabs',
                template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n"
            }] }
];
/** @nocollapse */
VerticalTabsComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: VerticalTabsService }
];
VerticalTabsComponent.propDecorators = {
    tabs: [{ type: ContentChildren, args: [VerticalTabComponent,] }],
    dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective,] }],
    list: [{ type: ViewChild, args: [MatSelectionList,] }],
    multi: [{ type: Input }],
    selectFirstTab: [{ type: Input }],
    showSelectAll: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalTabsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: VerticalTabsModule, providers: [VerticalTabsService] };
    }
}
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