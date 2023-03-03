import 'reflect-metadata';
import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;
        const user = await this.userRepository.findOne({
            where: { username }
        });

        if (user) {
            const passwordMatch = await compare(password, user.password);
            if (passwordMatch) {
                // Generate the access token and refresh token
                const accessToken = sign({ 
                    id: user.id,
                    username: user.username,
                    firstName: user.firstname,
                    lastName: user.lastname
                  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
                const refreshToken = sign({ username, id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

                // Set the refresh token as an HTTP-only cookie
                response.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                // Update the user's refresh token in the database
                user.rtoken = refreshToken;
                user.tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                await this.userRepository.save(user);

                // Send the access token in the response body
                response.json({ accessToken });
            } else {
                response.status(401).send('Invalid credentials');
            }
        } else {
            response.status(401).send('Invalid credentials');
        }
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const user = await this.userRepository.findOne({
            where: { id }
        })
        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }
}
