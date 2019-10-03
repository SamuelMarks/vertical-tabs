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
                selector: 'ng-vertical-tab',
                template: "ng-vertical-tab.component.html\n<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXZlcnRpY2FsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvbmctdmVydGljYWwtdGFiL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBT3BFLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFPakMsWUFBbUIsV0FBa0M7UUFBbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBTDVDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFHZixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUc3QixDQUFDOzs7WUFiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IscWFBQStDOzthQUVoRDs7OztZQU5RLHFCQUFxQjs7O3VCQVEzQixLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7Ozs7SUFKTiwwQ0FBMEI7O0lBQzFCLHdDQUF3Qjs7SUFDeEIsMENBQWtCOztJQUNsQiw2Q0FBcUI7O0lBQ3JCLDZDQUE2Qjs7SUFFakIsNkNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ1ZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuLi9uZy12ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy12ZXJ0aWNhbC10YWInLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctdmVydGljYWwtdGFiLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmctdmVydGljYWwtdGFiLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRhYlRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0ZW1wbGF0ZTtcbiAgQElucHV0KCkgZGF0YUNvbnRleHQ7XG4gIEBJbnB1dCgpIGlzQ2xvc2VhYmxlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYnNTZXJ2aWNlOiBOZ1ZlcnRpY2FsVGFic1NlcnZpY2UpIHtcbiAgfVxufVxuIl19