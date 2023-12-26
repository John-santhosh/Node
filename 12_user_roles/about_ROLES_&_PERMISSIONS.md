# user roles & permission.

- Authentication - the process of verifying who someone is.
- Authorization - the process of verifying what resources a user has access to.

### after authentication (using userName and password) a JSON token issued this

- 1). confirm the authentication.
- 2). also allow access to the API endpoint which provide our API data (this is AUTHORIZATION)
- 3). jwt token uses the authorization header.

### user roles and permission.

> provide different level of access.
> sent in access token payload.
> verified with middleware.
