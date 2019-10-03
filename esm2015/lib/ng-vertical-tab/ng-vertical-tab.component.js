/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NgVerticalTabsService } from '../ng-vertical-tabs.service';
export class NgVerticalTabComponent {
    /**
     * @param {?} tabsService
     */
    constructor(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
}
NgVerticalTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ng-vertical-tab',
                template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                styles: [".pane{padding:1em}"]
            }] }
];
/** @nocollapse */
NgVerticalTabComponent.ctorParameters = () => [
    { type: NgVerticalTabsService }
];
NgVerticalTabComponent.propDecorators = {
    tabTitle: [{ type: Input }],
    active: [{ type: Input }],
    template: [{ type: Input }],
    dataContext: [{ type: Input }],
    isCloseable: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXZlcnRpY2FsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvbmctdmVydGljYWwtdGFiL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBT3BFLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFPakMsWUFBbUIsV0FBa0M7UUFBbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBTDVDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFHZixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUc3QixDQUFDOzs7WUFiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscVlBQStDOzthQUVoRDs7OztZQU5RLHFCQUFxQjs7O3VCQVEzQixLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7Ozs7SUFKTiwwQ0FBMEI7O0lBQzFCLHdDQUF3Qjs7SUFDeEIsMENBQWtCOztJQUNsQiw2Q0FBcUI7O0lBQ3JCLDZDQUE2Qjs7SUFFakIsNkNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ1ZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuLi9uZy12ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmctdmVydGljYWwtdGFiJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nVmVydGljYWxUYWJDb21wb25lbnQge1xuICBASW5wdXQoKSB0YWJUaXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGVtcGxhdGU7XG4gIEBJbnB1dCgpIGRhdGFDb250ZXh0O1xuICBASW5wdXQoKSBpc0Nsb3NlYWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogTmdWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gIH1cbn1cbiJdfQ==