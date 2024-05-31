import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { CreateUserDto } from "../dto/user/create-user-dto";
import { UserResponse } from "../responses/user.response";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  constructor() {
    // this.userRepository = AppDataSource.getRepository(User);
  }

  async create(modelDto: CreateUserDto): Promise<UserResponse> {
    const entity = this.userRepository.create(modelDto);
    console.log(entity);
    const user = await this.userRepository.save(entity);

    return this.toUserResponseDto(user);
  }

  private toUserResponseDto(user: User): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = user.id;
    userResponse.email = user.email;
    userResponse.createdAt = user.createdAt;

    return userResponse;
  }
}
