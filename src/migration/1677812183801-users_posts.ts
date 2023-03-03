import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';
import { Post } from '../entity/Post';
import { hash } from 'bcrypt';

export class usersPosts1677812183801 implements MigrationInterface {
    name = 'usersPosts1677812183801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" text NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "imgUrl" text NOT NULL, "imgFilter" text NOT NULL, "idUser" integer NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" text NOT NULL, "firstname" text NOT NULL, "lastname" text NOT NULL, "password" text NOT NULL, "rtoken" text NOT NULL, "tokenExpiresAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_b19d2120615494c3f8c64dc338c" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        const userRepository = queryRunner.manager.getRepository(User);
        const postRepository = queryRunner.manager.getRepository(Post);
        const saltRounds = 10;
    let passUser1 = "12345"
    let passUser2 = "67890"

    passUser1 =  await hash(passUser1, saltRounds);
    passUser2 =  await hash(passUser2, saltRounds);
    const now = Date.now();
    const oneDayFromNow = now + 24 * 60 * 60 * 1000;

    const user1 = userRepository.create({
      firstname: "Timber",
      lastname: "Saw",
      username: "@timbr",
      password: passUser1,
      rtoken: 'refresh-token-1', 
      tokenExpiresAt: new Date(oneDayFromNow)
    });

    const user2 = userRepository.create({
      firstname: "Phantom",
      lastname: "Assassin",
      username: "@Phant",
      password: passUser2,
      rtoken: 'refresh-token-2', 
      tokenExpiresAt: new Date(oneDayFromNow)
    });

    await userRepository.save([user1, user2]);

    const post1 = postRepository.create({
      title: "My first post",
      creationDate: new Date(),
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Turkish_Van_Cat.jpg/700px-Turkish_Van_Cat.jpg",
      imgFilter: "sepia",
      user: user1,
      idUser: user1.id
    })

    const post2 = postRepository.create({
      title: "My second post",
      creationDate: new Date(),
      imgUrl: "https://static.onecms.io/wp-content/uploads/sites/47/2022/05/04/what-is-a-group-of-cats-called-2-1226896610-2000.jpg",
      imgFilter: "black-and-white",
      user: user1,
      idUser: user1.id
    })

    const post3 = postRepository.create({
      title: "My first post User 2",
      creationDate: new Date(),
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Turkish_Van_Cat.jpg/700px-Turkish_Van_Cat.jpg",
      imgFilter: "sepia",
      user: user2,
      idUser: user2.id
    })

    const post4 = postRepository.create({
      title: "My second post User 2",
      creationDate: new Date(),
      imgUrl: "https://static.onecms.io/wp-content/uploads/sites/47/2022/05/04/what-is-a-group-of-cats-called-2-1226896610-2000.jpg",
      imgFilter: "black-and-white",
      user: user2,
      idUser: user2.id
    })

    const posts = [post1, post2, post3, post4];
    await queryRunner.manager.save(posts);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_b19d2120615494c3f8c64dc338c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }
}
