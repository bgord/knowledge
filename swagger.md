**Basic template**

```
swagger: '2.0'
info:
  title: Example app
  description: >
    Example app with longer description
  version: 1.0.0
basePath: /api/v1
schemes:
  - https
consumes:
  - application/json; charset=utf-8
produces:
  - application/json; charset=utf-8
paths:
  /user:
    post:
      summary: Creates a user
      tags:
        - User creation
      operationId: UserCreation
      parameters:
        - $ref: '#/parameters/ApiKey'
        - name: userBody
          in: body
          description: User Creation Body
          required: true
          schema:
            $ref: '#/definitions/UserCreationBody'
      responses:
        '200':
          $ref: '#/definitions/Success'
        '400':
          $ref: '#/definitions/BadRequest'
        '500':
          $ref: '#/definitions/Failure'
parameters:
  ApiKey:
    in: header
    name: x-api-key
    type: string
    required: true
    description: >-
      The API key acts as both a unique identifier and a secret token for
      authentication.
definitions:
  UserCreationBody:
    required:
      - name
      - age
    properties:
      name:
        type: string
      age:
        type: number
  Success:
    description: Success
  Failure:
    description: Failed
  BadRequest:
    description: Bad Request
```
