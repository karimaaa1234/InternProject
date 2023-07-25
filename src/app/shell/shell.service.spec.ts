import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationGuard, AuthenticationService } from '@app/auth';
import { MockAuthenticationService } from '@app/auth/authentication.service.mock';
import { ShellComponent } from './shell.component';
import { Shell } from './shell.service';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellComponent],
      providers: [AuthenticationGuard, { provide: AuthenticationService, useClass: MockAuthenticationService }],
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      // @ts-ignore
      expect(result.path).toBe('');
      // @ts-ignore
      expect(result.children).toBe(testRoutes);
      // @ts-ignore
      expect(result.component).toBe(ShellComponent);
    });
  });
});
