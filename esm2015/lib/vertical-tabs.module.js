/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VerticalTabsComponent } from './vertical-tabs.component';
import { VerticalTabComponent } from './vertical-tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabsService } from './vertical-tabs.service';
export class VerticalTabsModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFhOUQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUN0QixNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztJQUM1RSxDQUFDOzs7WUFiRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVksRUFBRSxXQUFXO29CQUN6QixnQkFBZ0I7b0JBQ2hCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO2lCQUNqRDtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDdkMsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7Z0JBQ3RGLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDO2FBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IFZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtWZXJ0aWNhbFRhYkNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0R5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUsIFZlcnRpY2FsVGFiQ29tcG9uZW50LCBWZXJ0aWNhbFRhYnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVmVydGljYWxUYWJDb21wb25lbnQsIFZlcnRpY2FsVGFic0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBWZXJ0aWNhbFRhYnNNb2R1bGUsIHByb3ZpZGVyczogW1ZlcnRpY2FsVGFic1NlcnZpY2VdIH07XG4gIH1cbn1cbiJdfQ==