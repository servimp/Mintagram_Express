import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"
import { verify, JwtPayload } from 'jsonwebtoken';

export class PostController {

    private postRepository = AppDataSource.getRepository(Post)

    async all(request: Request, response: Response, next: NextFunction) {
        const page = parseInt(request.query.page as string || '1');
        const limit = parseInt(request.query.limit as string || '2');
        const skip = (page - 1) * limit;
    
        const posts = await AppDataSource.getRepository(Post).find({
            take: limit,
            skip: skip,
            relations: ["user"]
        });
    
        response.send(posts);
    }    

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ["user"]
        })
        if (!post) {
            return "unregistered post"
        }
        return post
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
            //
            post.user = decoded.username;
            
            const savedPost = await this.postRepository.save(post);
            response.send(savedPost);
        } catch (err) {
            console.log(err);
            response.status(401).send('Unauthorized');
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        let postToRemove = await this.postRepository.findOneBy({ id })
        if (!postToRemove) {
            return "this post not exist"
        }
        await this.postRepository.remove(postToRemove)
        return "post has been removed"
    }

}
