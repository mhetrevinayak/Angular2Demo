import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'my-employee',
    templateUrl: 'app/employee/employee.component.html'
})
export class EmployeeComponent implements OnInit {

    employee: IEmployee;
    statusMessage: string = 'Loading data. Please wait...';

    constructor(private _employeeService: EmployeeService,
        private _activatedRoutes: ActivatedRoute,
        private _router: Router) { }

    onBackButtonClick(): void {
        this._router.navigate(['/employees']);
    }

    ngOnInit(): void {
        let empCode: string = this._activatedRoutes.snapshot.params['code'];
        this._employeeService.getEmployeeByCode(empCode).then((employeeData) => {
            if (employeeData == null) {
                this.statusMessage = 'Employee with the specified Employee Code does not exist';
            } else {
                this.employee = employeeData;
            }
        }, (error) => {
            this.statusMessage = 'Problem with the service. Please try again after sometime';
            console.error(error);
        });
    }

}