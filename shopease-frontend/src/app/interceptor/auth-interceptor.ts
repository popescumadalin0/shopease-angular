import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalService } from "../storage/local.service";



@Injectable({
    providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor{

    constructor(private localService: LocalService) {}

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        const token = this.localService.getData("auth-token");

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }

}
