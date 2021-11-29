import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EventManager, EventWithContent } from '../util/event-manager.service';
import { LoginService } from '../../login/login.service';
import { StateStorageService } from '../auth/state-storage.service';
import { Router } from '@angular/router';
import { AccountService } from '../auth/account.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NoobsInterceptor implements HttpInterceptor {
  // constructor(private eventManager: EventManager) {}

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router,
    private accountService: AccountService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request);
  }
}
