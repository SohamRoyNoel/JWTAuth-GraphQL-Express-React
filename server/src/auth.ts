import { sign } from 'jsonwebtoken';
import { User } from './entity/User';

export const createAccessToken = (user: User) => {
      return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: "15m"
      })
}

// by adding ! it refers that the type is already defined
export const createRefreshToken = (user: User) => {
      return sign({userId: user.id, }, process.env.REFRESH_TOKEN_SECRET!, {
            expiresIn: "1d"
      })
}