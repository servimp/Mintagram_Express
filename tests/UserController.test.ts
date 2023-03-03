import 'reflect-metadata';
import { UserController } from '../src/controller/UserController';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
require('dotenv').config();

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-access-token'),
}));

describe('UserController', () => {
  let userController: UserController;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    userController = new UserController();
    request = {
      body: {
        username: 'test-username',
        password: 'test-password',
      },
    } as Request;
    response = {
      cookie: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as Response;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should return a JSON response with the access token', async () => {
      userController.userRepository = {
        findOne: jest.fn().mockResolvedValue({
          id: 1,
          username: 'test-username',
          password: 'hashed-password',
          firstname: 'Test',
          lastname: 'User',
        }),
        save: jest.fn().mockResolvedValue(undefined),
      };

      await userController.login(request, response, undefined);

      expect(compare).toHaveBeenCalledWith('test-password', 'hashed-password');
      expect(sign).toHaveBeenCalledWith(
        {
          id: 1,
          username: 'test-username',
          firstName: 'Test',
          lastName: 'User',
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2m' },
      );
      expect(response.cookie).toHaveBeenCalledWith('refreshToken', 'mock-access-token', {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      expect(response.json).toHaveBeenCalledWith({ accessToken: 'mock-access-token' });
    });
  });
});
