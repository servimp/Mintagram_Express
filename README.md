# Back-end for the Mintagram APP (Express/TypeORM)

Notes: 
* Postgres is the DB used in the project.
* Migrations are located in the folder src/migration
* To run the migrations:

  `npm run typeorm -- -d ./src/data-source.ts migration:generate src/migration/users_posts`
  
  `npm run typeorm -- -d src/data-source.ts migration:run`
  
  This will seed the DB with two users and 4 posts.
  
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
