import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private route: Router, private user: User){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userStr = localStorage.getItem("userFlag");
    var path = next.routeConfig.path;  
    // nextRoute: 设置需要路由守卫的路由集合
    const nextRoute = ['home', 'leave', 'good-detail', 'cart', 'profile'];
    let user: User = JSON.parse(userStr);
    console.log(user);

    if (!user.flagLogin) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      this.route.navigate(['/login']);
      return false;
    }
  }
}
