import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(private route: Router){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userStr = sessionStorage.getItem('account');
    const user: User = JSON.parse(userStr);

    if (user && user.account) {
      alert(user.account);
      console.log('路由守卫验证通过!');
      alert('路由守卫验证通过!');
      return true;
    } else {
      console.log('路由守卫验证失败!');
      alert('路由守卫验证失败!');
      this.route.navigateByUrl('/login');
      return false;
    }
  }
}
