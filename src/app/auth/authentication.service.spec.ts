import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { CredentialsService, Credentials } from './credentials.service';
import { MockCredentialsService } from './credentials.service.mock';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let credentialsService: MockCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CredentialsService, useClass: MockCredentialsService }, AuthenticationService],
    });

    authenticationService = TestBed.inject(AuthenticationService);
    credentialsService = TestBed.inject(CredentialsService);
    credentialsService.credentials = null;
    spyOn(credentialsService, 'setCredentials').and.callThrough();
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe((credentials) => {
        // @ts-ignore
        expect(credentials).toBeDefined();
        // @ts-ignore
        expect(credentials.token).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(() => {
      // @ts-ignore
      expect(credentialsService.isAuthenticated()).toBe(false);

      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {
        // @ts-ignore
        expect(credentialsService.isAuthenticated()).toBe(true);
        // @ts-ignore
        expect(credentialsService.credentials).not.toBeNull();
        // @ts-ignore
        expect((credentialsService.credentials as Credentials).token).toBeDefined();
        // @ts-ignore
        expect((credentialsService.credentials as Credentials).token).not.toBeNull();
      });
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {
        // @ts-ignore
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        // @ts-ignore
        expect((credentialsService.setCredentials as jasmine.Spy).calls.mostRecent().args[1]).toBe(undefined);
      });
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
        remember: true,
      });
      tick();

      // Assert
      request.subscribe(() => {
        // @ts-ignore
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        // @ts-ignore
        expect((credentialsService.setCredentials as jasmine.Spy).calls.mostRecent().args[1]).toBe(true);
      });
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        // @ts-ignore
        expect(credentialsService.isAuthenticated()).toBe(true);

        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {
          // @ts-ignore
          expect(credentialsService.isAuthenticated()).toBe(false);
          // @ts-ignore
          expect(credentialsService.credentials).toBeNull();
        });
      });
    }));
  });
});
