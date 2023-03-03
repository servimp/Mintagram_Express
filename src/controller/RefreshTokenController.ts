import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class RefreshTokenController {
    private userRepository = AppDataSource.getRepository(User);

    async refreshToken(request: Request, response: Response, next: NextFunction) {
        const refreshToken = request.cookies.refreshToken;

        if (!refreshToken) {
            console.log("unauthorized 1");
            return response.status(401).send('Unauthorized');
        }

        try {
            const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as { id: number };
            const userId = decoded.id;
            console.log("userID=" + userId)
            const user = await this.userRepository.findOne({
                where: { id: userId }
            });

            console.log("user=" + JSON.stringify(user))
            console.log("user.rtoken=" + user.rtoken)
            console.log("refreshToken=" + refreshToken)

            if (!user || user.rtoken !== refreshToken) {
                console.log("unauthorized 2");
                return response.status(401).send('Unauthorized');
            }

            const accessToken = sign({ 
                id: user.id,
                username: user.username,
                firstName: user.firstname,
                lastName: user.lastname
              }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            response.json({ accessToken });
        } catch (err) {
            console.log("unauthorized 3");
            return response.status(401).send('Unauthorized');
        }
    }
}
