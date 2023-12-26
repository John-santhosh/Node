# JWT Authentication.

## What is JWT.

- JWT - JSON Web tokens.
- JWT considered to be a form of user identification that is issued after the initial user authentication takes place.
- when a user completes their login process and they are authenticated our res API will issue the client application an access token and a refresh token
  -- the 'Access Token' is given a short time before it expire
  -- the 'refresh token' is given a longer time before it expire(several hours, day or even days).
  -- no security were perfect we have the risk of XSS AND CSRF.
  -- it is recommended the client's not to store the 'Access Token' in local storage or in a cookie

### Refresh Token

- sent as httpOnly cookie.
- not accessible via javascript.
- Must have expiry at some point.
- should not the ability to issue new refresh token
