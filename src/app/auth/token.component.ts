import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      let code = params['code'];
      if (code) {
        this.authService
          .getToken(code)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe(() => {
            this.router.navigate(['/home']);
          });
      }
    });
  }
}
