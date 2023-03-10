# Back-end for the Mintagram APP (Express/TypeORM)

Notes: 
* Postgres is the DB used in the project.
* Migrations are located in the folder src/migration
* To run the migrations:
  
  `npm run typeorm -- -d src/data-source.ts migration:run`
  
  This will seed the DB with two users and 4 posts.
  
* A JWT is generated on Login, the life of this first token is 2 minutes.
* After two minutes the Refresh Token Controller refreshes the token and defines an hour as life of the token as default.
* Test can be run using `npm run test`
  
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run the migrations
3. Run `npm run dev` command
