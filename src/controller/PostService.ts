import { EntityManager, Repository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from 'jsonwebtoken';
import { Post } from "../../src/entity/Post";

export class PostService {
  private postRepository: Repository<Post>;

  constructor(manager: EntityManager) {
    this.postRepository = manager.getRepository(Post);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { title, creationDate, imgUrl, imgFilter, idUser } = request.body;

    // Get the access token from the headers
    const accessToken = request.headers.authorization?.replace('Bearer ', '');

    try {
      // Verify the access token
      const decoded = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
      
      // Create the post
      const post = Object.assign(new Post(), {
          title,
          creationDate,
          imgUrl,
          imgFilter,
          idUser
      })

      // Set the user property of the post to the username from the decoded JWT payload
      post.user = decoded.username;
      
      const savedPost = await this.postRepository.save(post);
      response.send(savedPost);
    } catch (err) {
      console.log(err);
      response.status(401).send('Unauthorized');
    }
  }
}
