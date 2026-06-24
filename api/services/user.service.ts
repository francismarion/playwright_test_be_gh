import { userInfo } from "node:os";
import { BaseClient } from "../clients/base.client";
import { ENDPOINTS } from "../routes/endpoints";

export class UserService {
  constructor(private client: BaseClient) {}

  addUser(params: {
    id?: string;
    username: string;
    email: string;
    password: string;
    headers?: Record<string, string>;
  }) {
    const { id, username, email, password, headers } = params;

    return this.client.post(ENDPOINTS.ADD_USER, {
      data: {
        id,
        username,
        email,
        password,
      },
      headers,
    });
  }

  getAllUser(headers?: Record<string, string>) {
    return this.client.get(ENDPOINTS.GET_ALL_USER, {
      headers,
    });
  }

  getSingleUser(id: string, headers?: Record<string, string>) {
    return this.client.get(ENDPOINTS.GET_SINGLE_USER(id), {
      headers,
    });
  }

  updateUser(params : {
    idParam: string, id:string, username: string, password: string, email: string, headers?: Record<string, string>
  }) {
    const {idParam,id, username, password, email, headers} = params

    return this.client.put(ENDPOINTS.UPDATE_USER(idParam), {
      data : {
        id,
        username,
        password,
        email,
      },
      headers,
      
    }) 
  }
}