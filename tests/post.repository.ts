import { EntityManager, Repository } from "typeorm";
import { Post } from "../src/entity/Post";

export class PostRepository extends Repository<Post> {
  constructor(manager: EntityManager) {
    super(Post, manager);
  }
}


