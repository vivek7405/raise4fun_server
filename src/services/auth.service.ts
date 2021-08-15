import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class AuthService {
  public users = userModel;

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Invalid user object');

    let findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) {
      // New user
      findUser = await this.users.create({ ...userData });
    } else {
      // Update user
      findUser = await this.users.findOneAndUpdate({ email: userData.email }, { ...userData });
    }

    if (!findUser) throw new HttpException(409, `User with email ${userData.email} not found`);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Invalid user object');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `User with email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 30 * 24 * 60 * 60; // 1 month

    // return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    return `Authorization=${tokenData.token}; HttpOnly; Max-age=${oneYear}`;
  }
}

export default AuthService;
