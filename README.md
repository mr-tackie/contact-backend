# Twitter custom resolver
A resolver to return a twitter profile url from a username

## Installation
Clone this repository using `git clone https://github.com/mr-tackie/contact-backend`. In the project directory, run the command `npm` install to install required dependencies

## Usage
Run `npm start` to start the Apollo server. The project will be available on `localhost:4000` by default unless set otherwise in your .env file

### Schema:

```
type Query {
  get_twitter: String
}
```
