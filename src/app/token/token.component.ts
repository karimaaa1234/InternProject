import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  private token!: string;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['code'];
    });
    this.authService.loggedIn(this.token);
    this.router.navigate(['/home']);
  }
}
