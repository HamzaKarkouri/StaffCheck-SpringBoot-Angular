import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { AppHttpInterceptor } from './app-http.interceptor';

describe('appHttpInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => AppHttpInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
