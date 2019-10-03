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
var NgVerticalTabsModule = /** @class */ (function () {
    function NgVerticalTabsModule() {
    }
    /**
     * @return {?}
     */
    NgVerticalTabsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: NgVerticalTabsModule, providers: [NgVerticalTabsService] };
    };
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
    return NgVerticalTabsModule;
}());
export { NgVerticalTabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmVydGljYWwtdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy12ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL25nLXZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFckY7SUFBQTtJQWNBLENBQUM7Ozs7SUFIZSw0QkFBTzs7O0lBQXJCO1FBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7SUFDaEYsQ0FBQzs7Z0JBYkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLEVBQUUsV0FBVzt3QkFDekIsZ0JBQWdCO3dCQUNoQixhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZTtxQkFDakQ7b0JBQ0QsZUFBZSxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ3pDLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDO29CQUNsSCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx1QkFBdUIsQ0FBQztpQkFDM0Q7O0lBS0QsMkJBQUM7Q0FBQSxBQWRELElBY0M7U0FKWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IE5nVmVydGljYWxUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi9uZy12ZXJ0aWNhbC10YWJzL25nLXZlcnRpY2FsLXRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9uZy12ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vbmctdmVydGljYWwtdGFiL25nLXZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ1ZlcnRpY2FsVGFiQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSwgTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCwgTmdWZXJ0aWNhbFRhYnNDb21wb25lbnQsIE5nVmVydGljYWxUYWJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmdWZXJ0aWNhbFRhYkNvbXBvbmVudCwgTmdWZXJ0aWNhbFRhYnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nVmVydGljYWxUYWJzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBOZ1ZlcnRpY2FsVGFic01vZHVsZSwgcHJvdmlkZXJzOiBbTmdWZXJ0aWNhbFRhYnNTZXJ2aWNlXSB9O1xuICB9XG59XG4iXX0=