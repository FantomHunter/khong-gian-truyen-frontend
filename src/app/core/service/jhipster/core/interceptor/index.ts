import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '../../core/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '../../core/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '../../core/interceptor/error-handler.interceptor';
import { NotificationInterceptor } from '../../core/interceptor/notification.interceptor';
import { NoobsInterceptor } from './noobs.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: NoobsInterceptor,
  //   multi: true,
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true,
  },
];
