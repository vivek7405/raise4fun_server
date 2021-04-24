import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import GitHub from 'github-api';

class GithubAPIService {
  //   public async findAllUser(): Promise<User[]> {
  //     const users: User[] = await this.users.find();
  //     return users;
  //   }

  //   public async getAllRepos(): Promise<Repository[]> {
  //     const users: User[] = await this.users.find();
  //     return users;
  //   }

  public async getAllRepos(token) {
    let gh = new GitHub({
      token: token,
    });

    let data: any = {};
    let me = gh.getUser();
    let repos = await me.listRepos();
    data.repos = repos.data;
    return data;
  }
}

export default GithubAPIService;
