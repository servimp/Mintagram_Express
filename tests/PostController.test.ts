import 'reflect-metadata';
import { PostController } from '../src/controller/PostController';
import { AppDataSource } from "../src/data-source"
import { Post } from '../src/entity/Post';
import { sign } from 'jsonwebtoken';
require('dotenv').config();

describe('PostController', () => {
  let postController: PostController;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  beforeEach(async () => {
    postController = new PostController();
  });

  console.log(Reflect.getMetadata('design:type', Post));
console.log(Reflect.getMetadata('design:paramtypes', Post));

  describe('save', () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
      req = {
        body: {
          title: 'Test Post',
          creationDate: new Date(),
          imgUrl: 'https://example.com/image.jpg',
          imgFilter: 'grayscale',
          idUser: 1,
        },
        headers: {
          authorization: `Bearer ${sign({ id: 1, username: 'testuser', firstName: 'test', lastName: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' })}`,
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      next = jest.fn();
    });
    

      
    
    it('should return 401 Unauthorized with an invalid access token', async () => {
      req.headers.authorization = `Bearer invalidtoken`;
      console.log('Access token when invalid:', req.headers.authorization);
      console.log('Token secret:', process.env.ACCESS_TOKEN_SECRET);
      await postController.save(req, res, next);
      console.log('Response status:', res.status.mock.calls);
      console.log('Response send:', res.send.mock.calls);
    
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Unauthorized');
      expect(next).not.toHaveBeenCalled();
    });


/*
    it('should save the post successfully with a valid access token', async () => {
    

      console.log('Access token when valid:', req.headers.authorization);
      console.log('Token secret:', process.env.ACCESS_TOKEN_SECRET);
      await postController.save(req, res, next);
      console.log('Response status:', res.status.mock.calls);
      console.log('Response send:', res.send.mock.calls);
    
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(expect.any(Post));
      expect(next).not.toHaveBeenCalled();
    });
*/

  });
});
