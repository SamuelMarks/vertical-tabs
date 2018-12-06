/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { VerticalTabsService } from './vertical-tabs.service';
export class VerticalTabComponent {
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
if (false) {
    /** @type {?} */
    VerticalTabComponent.prototype.tabTitle;
    /** @type {?} */
    VerticalTabComponent.prototype.active;
    /** @type {?} */
    VerticalTabComponent.prototype.template;
    /** @type {?} */
    VerticalTabComponent.prototype.dataContext;
    /** @type {?} */
    VerticalTabComponent.prototype.isCloseable;
    /** @type {?} */
    VerticalTabComponent.prototype.tabsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZlcnRpY2FsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvdmVydGljYWwtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFZOUQsTUFBTSxPQUFPLG9CQUFvQjs7OztJQU8vQixZQUFtQixXQUFnQztRQUFoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7UUFMMUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBRzdCLENBQUM7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IscVlBQTRDO3lCQUNuQzs7OztHQUlSO2FBQ0Y7Ozs7WUFYUSxtQkFBbUI7Ozt1QkFhekIsS0FBSztxQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzs7O0lBSk4sd0NBQTBCOztJQUMxQixzQ0FBd0I7O0lBQ3hCLHdDQUFrQjs7SUFDbEIsMkNBQXFCOztJQUNyQiwyQ0FBNkI7O0lBRWpCLDJDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFiJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW2BcbiAgICAucGFuZSB7XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRhYlRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0ZW1wbGF0ZTtcbiAgQElucHV0KCkgZGF0YUNvbnRleHQ7XG4gIEBJbnB1dCgpIGlzQ2xvc2VhYmxlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYnNTZXJ2aWNlOiBWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gIH1cbn1cbiJdfQ==