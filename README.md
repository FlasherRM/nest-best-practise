<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

> ### This project i made to show you [Nest.js](https://nestjs.com/) knowledge. Beautiful project architecture based on single entity CRUD and [JWT](https://jwt.io) token authentication

----------

# Getting started

## Installation

Clone the repository

    git clone https://github.com/FlasherRM/nest-best-practise.git

Switch to the repo folder

    cd nest-best-practise

Install dependencies

    npm install

Copy config file and set JsonWebToken secret key

    cp src/config.ts.example src/config.ts
    
----------

## Database

Database I built with typeorm

In `src/app.module.ts` you can see database configuration like that:

    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'database_name',
      password: 'database_password',
      database: 'nest_project',
      autoLoadEntities: true,
      synchronize: true,
    }

Just edit it as you need with your configuration

----------
