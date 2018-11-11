import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class LeaveGuard implements CanDeactivate<any> {
    canDeactivate(comp: any): boolean {
        if (comp.canShow == true) {
            delete comp.databaseService.sAny;

            return confirm("Deseja realmente deixar este formulário?");
        }

        return true;
    }
}