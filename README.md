# Project Name

![Imgur](https://i.imgur.com/RTcglTs.png)

> [Know-how: A knowledge base app.](https://pure-tor-28594.herokuapp.com/addarticle)

## Team

  - __Product Owner__: Amena Kauser Syeda
  - __Scrum Master__: Sravanthi Karanam
  - __Development Team Members__: Adelle Housker, Ted Green, Sravanthi Karanam, Amena Kauser Syeda

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Create a .env file in the root directory.

> Create a DB instance on Amazon RDS (or create a local MySQL database).

> Go to sendgrid.com, sign up for an account and generate an API key.

Add the following code in the .env file.

DBNAME=database-name
DBUSERNAME=database-username
DBPASSWORD=database-password
DBHOST=amazonrds-db-hostname or localhost
DBPORT=3306
SENDGRID_API_KEY=sendgrid-api-key
S3accessKeyId =S3-access-keyId
S3secretAccessKey=S3-secret-access-key
S3Bucket=S3-bucket
S3apiVersion=S3-version
S3key=S3-key

## Requirements

- ReactJS
- Node
- Express
- MySQL
- Sequelize

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```

To start the server, run
```
npm run dev-start
```

In another terminal, run
```
npm run dev-react
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
