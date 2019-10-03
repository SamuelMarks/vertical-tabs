/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { NgVerticalTabsComponent } from './ng-vertical-tabs/ng-vertical-tabs.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { NgVerticalTabsService } from './ng-vertical-tabs.service';
import { NgVerticalTabComponent } from './ng-vertical-tab/ng-vertical-tab.component';
export class NgVerticalTabsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: NgVerticalTabsModule, providers: [NgVerticalTabsService] };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy12ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL25nLXZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFZckYsTUFBTSxPQUFPLG9CQUFvQjs7OztJQUN4QixNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQztJQUNoRixDQUFDOzs7WUFiRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVksRUFBRSxXQUFXO29CQUN6QixnQkFBZ0I7b0JBQ2hCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO2lCQUNqRDtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDekMsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLENBQUM7Z0JBQ2xILE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLHVCQUF1QixDQUFDO2FBQzNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBOZ1ZlcnRpY2FsVGFic0NvbXBvbmVudCB9IGZyb20gJy4vbmctdmVydGljYWwtdGFicy9uZy12ZXJ0aWNhbC10YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5nVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vbmctdmVydGljYWwtdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IE5nVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL25nLXZlcnRpY2FsLXRhYi9uZy12ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdWZXJ0aWNhbFRhYkNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0R5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUsIE5nVmVydGljYWxUYWJDb21wb25lbnQsIE5nVmVydGljYWxUYWJzQ29tcG9uZW50LCBOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nVmVydGljYWxUYWJDb21wb25lbnQsIE5nVmVydGljYWxUYWJzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ1ZlcnRpY2FsVGFic01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogTmdWZXJ0aWNhbFRhYnNNb2R1bGUsIHByb3ZpZGVyczogW05nVmVydGljYWxUYWJzU2VydmljZV0gfTtcbiAgfVxufVxuIl19