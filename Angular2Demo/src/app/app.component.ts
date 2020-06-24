import { Component } from "@angular/core";



@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    pageHeader: string = 'Employee Details';
    firstName: string = 'john';
    lastName: string = 'doe';

    name: string = 'Tom';

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}


