import { CanActivate } from "@angular/router/src/interfaces";

export class LoginGuard implements CanActivate {
    
    canActivate(flag): boolean{
        if (flag) {
            return true;
        }
    }
    
}