export class RegisterRequest {
    constructor(
      public username: string,
      public password: string
    ) {}
  }
  
  export class AuthenticationRequest {
    constructor(
      public username: string,
      public password: string
    ) {}
  }

  export class AuthenticationResponse {
    constructor(
      public accessToken: string,
      public password: string
    ) {}
  }