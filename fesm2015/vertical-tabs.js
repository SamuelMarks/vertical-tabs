import { Injectable, Directive, ViewContainerRef, Component, Input, NgModule, ComponentFactoryResolver, ContentChildren, ViewChild, defineInjectable } from '@angular/core';
import { MatSelectionList, MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VerticalTabsService {
    constructor() {
        this.selectedOptions = [];
    }
}
VerticalTabsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
VerticalTabsService.ctorParameters = () => [];
/** @nocollapse */ VerticalTabsService.ngInjectableDef = defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
DynamicTabAnchorDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                template: `<div *ngIf="active" class="pane">
  <h3 class="tab-heading" *ngIf="tabsService.multi && tabsService.selectedOptions.length > 1">
    {{tabTitle}}
  </h3>
  <ng-content></ng-content>
  <ng-container *ngIf="template"
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{person: dataContext}">
  </ng-container>
</div>
`,
                styles: [`
    .pane {
      padding: 1em;
    }
  `]
            },] },
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
 * @suppress {checkTypes} checked by tsc
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
    onNgModelChange() {
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
        const /** @type {?} */ options = this.list.options.map(t => t.value);
        const /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(t => {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        const /** @type {?} */ options_set = new Set(options);
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
        const /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
        // create a component instance
        const /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        const /** @type {?} */ instance = /** @type {?} */ (componentRef.instance);
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
        for (let /** @type {?} */ i = 0; i < this.dynamicTabs.length; i++) {
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
        const /** @type {?} */ activeTab = this.dynamicTabs.filter(tab => tab.active);
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
     * @return {?}
     */
    toggleTabActivations() {
        const /** @type {?} */ arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        const /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        arr.forEach(tab => tab.active = s.has(tab.tabTitle));
    }
    /**
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
                template: `<div fxLayout="row" fxLayoutGap="1px" fxLayout.xs="column">
  <div fxFlex="33%">
    <mat-selection-list #list [(ngModel)]="tabService.selectedOptions"
                        (ngModelChange)="onNgModelChange()">
      <mat-list-option *ngFor="let tab of [].concat(tabs.toArray(), dynamicTabs)" [value]="tab.tabTitle">
        {{tab.tabTitle}}
      </mat-list-option>
    </mat-selection-list>
    <mat-divider></mat-divider>
    <button mat-button color="primary" id="select"
            (click)="toggleSelect()" *ngIf="showSelectAll">
      {{allSelected ? 'Reset selection' : 'Select all'}}
    </button>
  </div>

  <div fxFlex="66%" *ngIf="tabService.selectedOptions.length">
    <ng-content></ng-content>
    <ng-template ngVerticalDynamicTabAnchor #container></ng-template>
  </div>
</div>
`,
                styles: []
            },] },
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
 * @suppress {checkTypes} checked by tsc
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { VerticalTabsService, VerticalTabsComponent, VerticalTabsModule, DynamicTabAnchorDirective as ɵb, VerticalTabComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFicy5zZXJ2aWNlLnRzIiwibmc6Ly92ZXJ0aWNhbC10YWJzL2xpYi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlLnRzIiwibmc6Ly92ZXJ0aWNhbC10YWJzL2xpYi92ZXJ0aWNhbC10YWIuY29tcG9uZW50LnRzIiwibmc6Ly92ZXJ0aWNhbC10YWJzL2xpYi92ZXJ0aWNhbC10YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIHtcbiAgbXVsdGk6IGJvb2xlYW47XG4gIHNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ1ZlcnRpY2FsRHluYW1pY1RhYkFuY2hvcl0nXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXZlcnRpY2FsLXRhYicsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImFjdGl2ZVwiIGNsYXNzPVwicGFuZVwiPlxuICA8aDMgY2xhc3M9XCJ0YWItaGVhZGluZ1wiICpuZ0lmPVwidGFic1NlcnZpY2UubXVsdGkgJiYgdGFic1NlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDFcIj5cbiAgICB7e3RhYlRpdGxlfX1cbiAgPC9oMz5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3BlcnNvbjogZGF0YUNvbnRleHR9XCI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgXG4gICAgLnBhbmUge1xuICAgICAgcGFkZGluZzogMWVtO1xuICAgIH1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJDb21wb25lbnQge1xuICBASW5wdXQoKSB0YWJUaXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGVtcGxhdGU7XG4gIEBJbnB1dCgpIGRhdGFDb250ZXh0O1xuICBASW5wdXQoKSBpc0Nsb3NlYWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNlbGVjdGlvbkxpc3QgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFicycsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMXB4XCIgZnhMYXlvdXQueHM9XCJjb2x1bW5cIj5cbiAgPGRpdiBmeEZsZXg9XCIzMyVcIj5cbiAgICA8bWF0LXNlbGVjdGlvbi1saXN0ICNsaXN0IFsobmdNb2RlbCldPVwidGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25OZ01vZGVsQ2hhbmdlKClcIj5cbiAgICAgIDxtYXQtbGlzdC1vcHRpb24gKm5nRm9yPVwibGV0IHRhYiBvZiBbXS5jb25jYXQodGFicy50b0FycmF5KCksIGR5bmFtaWNUYWJzKVwiIFt2YWx1ZV09XCJ0YWIudGFiVGl0bGVcIj5cbiAgICAgICAge3t0YWIudGFiVGl0bGV9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGlkPVwic2VsZWN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoKVwiICpuZ0lmPVwic2hvd1NlbGVjdEFsbFwiPlxuICAgICAge3thbGxTZWxlY3RlZCA/ICdSZXNldCBzZWxlY3Rpb24nIDogJ1NlbGVjdCBhbGwnfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg9XCI2NiVcIiAqbmdJZj1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctdGVtcGxhdGUgbmdWZXJ0aWNhbER5bmFtaWNUYWJBbmNob3IgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihWZXJ0aWNhbFRhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PFZlcnRpY2FsVGFiQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZChEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlKSBkeW5hbWljVGFiUGxhY2Vob2xkZXI6IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChNYXRTZWxlY3Rpb25MaXN0KSBsaXN0OiBNYXRTZWxlY3Rpb25MaXN0O1xuXG4gIEBJbnB1dCgpIG11bHRpID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VsZWN0Rmlyc3RUYWIgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U2VsZWN0QWxsID0gZmFsc2U7XG4gIGFsbFNlbGVjdGVkID0gdHJ1ZTtcblxuICBkeW5hbWljVGFiczogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IFtdO1xuXG4gIGxhc3RTZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyB0YWJTZXJ2aWNlOiBWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLm11bHRpID0gdGhpcy5tdWx0aTtcbiAgfVxuXG4gIC8vIGNvbnRlbnRDaGlsZHJlbiBhcmUgc2V0XG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBhY3RpdmUgdGFiIHNldCwgYWN0aXZhdGUgdGhlIGZpcnN0XG4gICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RUYWIgJiYgIXRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpLmxlbmd0aClcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgZWxzZSB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBvbk5nTW9kZWxDaGFuZ2UoLypzZWxlY3RlZDogc3RyaW5nW10qLykge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMudG9nZ2xlVGFiQWN0aXZhdGlvbnMoKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIHRoaXMubXVsdGkgP1xuICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRhYi50YWJUaXRsZSlcbiAgICAgIDogdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdO1xuICAgIHRhYi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubGlzdC5vcHRpb25zLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5vcHRpb25zLmZvckVhY2godCA9PiB7XG4gICAgICB0LnNlbGVjdGVkID0gcy5oYXModC52YWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYCcke3QudmFsdWV9JyBzZWxlY3RlZDpgLCB0LnNlbGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnNfc2V0ID0gbmV3IFNldChvcHRpb25zKTtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmICghb3B0aW9uc19zZXQuaGFzKG9wdGlvbikpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihgJyR7b3B0aW9ufScgbm90IGZvdW5kIGluIG1hdC1zZWxlY3Rpb24tbGlzdGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgb3BlblRhYih0aXRsZTogc3RyaW5nLCB0ZW1wbGF0ZSwgZGF0YSwgaXNDbG9zZWFibGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIFZlcnRpY2FsVGFiQ29tcG9uZW50XG4gICAgKTtcblxuICAgIC8vIGNyZWF0ZSBhIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgLy8gc2V0IHRoZSBhY2NvcmRpbmcgcHJvcGVydGllcyBvbiBvdXIgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgaW5zdGFuY2U6IFZlcnRpY2FsVGFiQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIFZlcnRpY2FsVGFiQ29tcG9uZW50O1xuICAgIGluc3RhbmNlLnRhYlRpdGxlID0gdGl0bGU7XG4gICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICBpbnN0YW5jZS5kYXRhQ29udGV4dCA9IGRhdGE7XG4gICAgaW5zdGFuY2UuaXNDbG9zZWFibGUgPSBpc0Nsb3NlYWJsZTtcbiAgICBpbnN0YW5jZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5keW5hbWljVGFicy5wdXNoKGluc3RhbmNlKTtcbiAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmR5bmFtaWNUYWJzW3RoaXMuZHluYW1pY1RhYnMubGVuZ3RoIC0gMV0pO1xuICB9XG5cbiAgY2xvc2VUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZHluYW1pY1RhYnNbaV0gPT09IHRhYikge1xuICAgICAgICB0aGlzLmR5bmFtaWNUYWJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLnJlbW92ZShpKTtcbiAgICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdOyAgLy8gVE9ETzogZHVwbGljYXRlIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBjbG9zZUFjdGl2ZVRhYigpIHtcbiAgICBpZiAodGhpcy5tdWx0aSkgY29uc29sZS53YXJuKCdDbG9zaW5nIHRoZSBmaXJzdCBhY3RpdmUgdGFiJyk7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5keW5hbWljVGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoID4gMCkgdGhpcy5jbG9zZVRhYihhY3RpdmVUYWJbMF0pO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdCgpIHtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID8gdGhpcy5saXN0LmRlc2VsZWN0QWxsKCkgOiB0aGlzLmxpc3Quc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVGFiQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgYXJyOiBWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gdGhpcy50YWJzLnRvQXJyYXkoKS5jb25jYXQodGhpcy5keW5hbWljVGFicyk7XG4gICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgYXJyLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBzLmhhcyh0YWIudGFiVGl0bGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aSB8fCAhdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgfHwgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoXG4gICAgICB0YWJUaXRsZSA9PiB0YWJUaXRsZSAhPT0gdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zW3RoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdEFsbCgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gdGhpcy5saXN0Lm9wdGlvbnMubGVuZ3RoIDwgMSA/IGZhbHNlXG4gICAgICA6IHRoaXMubGlzdC5vcHRpb25zLnJlZHVjZSgocCwgYykgPT4gcCA/IGMuc2VsZWN0ZWQgOiBwLCB0cnVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IFZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtWZXJ0aWNhbFRhYkNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0R5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUsIFZlcnRpY2FsVGFiQ29tcG9uZW50LCBWZXJ0aWNhbFRhYnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVmVydGljYWxUYWJDb21wb25lbnQsIFZlcnRpY2FsVGFic0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBWZXJ0aWNhbFRhYnNNb2R1bGUsIHByb3ZpZGVyczogW1ZlcnRpY2FsVGFic1NlcnZpY2VdIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFTRTtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0tBQzNCOzs7WUFURixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7QUNKRDs7OztJQU1FLFlBQW1CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtLQUNqRDs7O1lBTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7YUFDekM7Ozs7WUFKbUIsZ0JBQWdCOzs7Ozs7O0FDQXBDOzs7O0lBOEJFLFlBQW1CLFdBQWdDO1FBQWhDLGdCQUFXLEdBQVgsV0FBVyxDQUFxQjtzQkFMakMsS0FBSzsyQkFHQSxLQUFLO0tBRzNCOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7OztDQVVYO2dCQUNDLE1BQU0sRUFBRSxDQUFDOzs7O0dBSVIsQ0FBQzthQUNI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