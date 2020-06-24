import { Component } from "@angular/core";
import { UserPreferencesService } from '../employee/userPreferences.service';



@Component({
    template: `
            <h1>This is the home page</h1>
            <div>
                Colour Preference :
                <input type='text' [(ngModel)]='colour' [style.background]="colour"/>
            </div>`,
    providers: [UserPreferencesService],
})
export class HomeComponent {

    constructor(private _userPreferencesService: UserPreferencesService) {}

    get colour(): string {
        return this._userPreferencesService.colourPreference;
    }

    // Implement a setter to change the colourPreference value
    // of the service
    set colour(value: string) {
        this._userPreferencesService.colourPreference = value;
    }

}