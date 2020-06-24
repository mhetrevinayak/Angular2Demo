import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import {EmployeeService } from './employee.service';
import { Console } from '@angular/core/src/console';
import { UserPreferencesService } from './userPreferences.service';

@Component({
    selector: 'list-employee',
    templateUrl: 'app/employee/employeeList.component.html',
    styleUrls: ['app/employee/employeeList.component.css'],
    providers: [UserPreferencesService],
    
})
export class EmployeeListComponent implements OnInit {
    employees: IEmployee[];
    selectedEmployeeCountRadioButton: string = "All";
    statusMessage: string = 'Loading data. Please wait...';

    constructor(private _employeeService: EmployeeService, private _userPreferencesService: UserPreferencesService) {        
    }

    get colour(): string {
        return this._userPreferencesService.colourPreference;
    }

    set colour(value: string) {
        this._userPreferencesService.colourPreference = value;
    }

    ngOnInit(): void {
        this._employeeService.getEmployees()
            .subscribe(employeeData => this.employees = employeeData,
                error => {
                    this.statusMessage = 'error with employee service. please try later...';
                    console.error('from component ' + error);
                });
    }



    onEmployeeCountRadioButtonChange(selectedRadioButtonValue: string): void {
        this.selectedEmployeeCountRadioButton = selectedRadioButtonValue;
    }

    getTotalEmployeeCount(): number {
        return this.employees.length;
    }

    getTotalMaleEmployeeCount(): number {
        return this.employees.filter(x => x.gender === 'Male').length;
    }

    getTotalFemaleEmployeeCount(): number {
        return this.employees.filter(x => x.gender === 'Female').length;
    }


    getEmployees(): void {
        this.employees = [
            {
                code: 'emp101', name: 'Tom', gender: 'Male',
                annualSalary: 5500, dateOfBirth: '10/6/1988'
            },
            {
                code: 'emp102', name: 'Alex', gender: 'Male',
                annualSalary: 5700.95, dateOfBirth: '9/6/1982'
            },
            {
                code: 'emp103', name: 'Mike', gender: 'Male',
                annualSalary: 5900, dateOfBirth: '12/8/1979'
            },
            {
                code: 'emp104', name: 'Mary', gender: 'Female',
                annualSalary: 6500.826, dateOfBirth: '12/10/1980'
            },
            {
                code: 'emp105', name: 'Nancy', gender: 'Female',
                annualSalary: 6700.826, dateOfBirth: '12/15/1982'
            },
        ];
    }

    trackByEmpCode(index: number, employee: any): string {
        return employee.code;
    }
    
}