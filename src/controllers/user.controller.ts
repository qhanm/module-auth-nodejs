import {
  BadRequestError,
  Body,
  JsonController,
  Post,
} from "routing-controllers";
import { CreateUserDto } from "../dto/user/create-user-dto";
import { UserService } from "../services/user.service";
import { validateOrReject } from "class-validator";
import {
  BadRequestResponse,
  StandardResponse,
} from "../traits/StandardResponse";

@JsonController("/users")
export class UserController {
  private userService = new UserService();

  @Post("/")
  async createUser(@Body() dto: CreateUserDto) {
    try {
      await validateOrReject(dto);
      return this.userService.create(dto);
    } catch (err) {
      const { message } = err as Error;
      return new BadRequestResponse<undefined>({
        message: message,
      });
    }
  }
}
