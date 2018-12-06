/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { VerticalTabsService } from './vertical-tabs.service';
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
export { VerticalTabComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZlcnRpY2FsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvdmVydGljYWwtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHOUQ7SUFnQkUsOEJBQW1CLFdBQWdDO1FBQWhDLGdCQUFXLEdBQVgsV0FBVyxDQUFxQjtRQUwxQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2YsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFHN0IsQ0FBQzs7Z0JBakJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixxWUFBNEM7NkJBQ25DLCtDQUlSO2lCQUNGOzs7O2dCQVhRLG1CQUFtQjs7OzJCQWF6QixLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7O0lBSVIsMkJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQVRZLG9CQUFvQjs7O0lBQy9CLHdDQUEwQjs7SUFDMUIsc0NBQXdCOztJQUN4Qix3Q0FBa0I7O0lBQ2xCLDJDQUFxQjs7SUFDckIsMkNBQTZCOztJQUVqQiwyQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXZlcnRpY2FsLXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtgXG4gICAgLnBhbmUge1xuICAgICAgcGFkZGluZzogMWVtO1xuICAgIH1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJDb21wb25lbnQge1xuICBASW5wdXQoKSB0YWJUaXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGVtcGxhdGU7XG4gIEBJbnB1dCgpIGRhdGFDb250ZXh0O1xuICBASW5wdXQoKSBpc0Nsb3NlYWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICB9XG59XG4iXX0=