import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import GitHub from 'github-api';
const g = require('graphql-request');
import axios from 'axios';

const { GraphQLClient, gql } = g;
const url = 'https://api.github.com/graphql';
class GithubService {
  public users = userModel;

  //   public async findAllUser(): Promise<User[]> {
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

  public async getProfile(token) {
    const graphQLClient = new GraphQLClient(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const query = gql`
      {
        viewer {
          login
          name
          company
          url
          bio
        }
      }
    `;
    const profile = await graphQLClient.request(query);

    return profile;
  }

  private async getRandomToken() {
    const user = await this.users.findOne();
    const token = user.token;

    return token;
  }

  public async getOpenfestRepoIssues(owner: string, repoName: string) {
    // const token = this.getRandomToken();
    const issues = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/issues`, {
      params: {
        state: 'all',
        labels: 'openfest',
        // owned: true,
      },
    });
    return issues.data;
  }

  public async getPullRequestsForRepo(owner: string, repoName: string) {
    // const token = this.getRandomToken();
    const pulls = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/pulls`, {
      params: {
        state: 'all',
      },
    });
    return pulls.data;
  }

  // public async getOpenfestIssues() {
  //   const token = this.getRandomToken();

  //   const graphQLClient = new GraphQLClient(url, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const query = gql`
  //     query FindOpenfestIssues($queryString: String!, $first: Int!, $after: String) {
  //       rateLimit {
  //         cost
  //         limit
  //         remaining
  //         resetAt
  //       }
  //       search(query: $queryString, type: ISSUE, first: $first, after: $after) {
  //         issueCount
  //         pageInfo {
  //           endCursor
  //           hasNextPage
  //         }
  //         edges {
  //           node {
  //             ... on Issue {
  //               bodyText
  //               databaseId
  //               number
  //               title
  //               url
  //               participants {
  //                 totalCount
  //               }
  //               timeline {
  //                 totalCount
  //               }
  //               repository {
  //                 databaseId
  //                 description
  //                 name
  //                 nameWithOwner
  //                 url
  //                 primaryLanguage {
  //                   name
  //                 }
  //                 stargazers {
  //                   totalCount
  //                 }
  //                 watchers {
  //                   totalCount
  //                 }
  //                 forks {
  //                   totalCount
  //                 }
  //                 codeOfConduct {
  //                   url
  //                 }
  //                 repositoryTopics(first: 100) {
  //                   edges {
  //                     node {
  //                       topic {
  //                         name
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `;

  //   const variables = {
  //     queryString: 'state:open label:openfest no:assignee',
  //     first: 10,
  //   };

  //   const data = await graphQLClient.request(query, variables);

  //   return data;
  // }
}

export default GithubService;
