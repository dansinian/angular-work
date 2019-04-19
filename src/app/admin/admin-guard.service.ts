import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
	providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
	constructor(private user: User, private route: Router) { }
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		var path = next.routeConfig.path;
		// nextRoute: 设置需要路由守卫的路由集合
		const nextRoute = ['home', 'leave', 'good-detail', 'cart', 'profile'];
		let flagLogin = this.user.flagLogin;  // 是否登录

		if (nextRoute.indexOf(path) >= 0) {
			if (!flagLogin) {
				// 未登录，跳转到login
				this.route.navigate(['login']);
				return false;
			} else {
				// 已登录，跳转到当前路由
				return true;
			}
		}

		if (path === "login") {
			if (!flagLogin) {
				// 未登录，跳转到当前路由
				return true;
			} else {
				// 已登录，跳转到home
				this.route.navigate(['home']);
				return false;
			}
		}
	}
}

