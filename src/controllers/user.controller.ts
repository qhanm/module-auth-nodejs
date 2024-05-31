import { Body, JsonController, Post } from "routing-controllers";
import { CreateUserDto } from "../dto/user/create-user-dto";
import { UserService } from "../services/user.service";
import { validateOrReject } from "class-validator";

@JsonController("/users")
export class UserController {
  private userService = new UserService();

  @Post("/")
  async createUser(@Body() dto: CreateUserDto) {
    // try {
    //   await validateOrReject(dto);
    //   return this.userService.create(dto);
    // } catch (err) {
    //   throw new BadRequestError("Validation failed: " + JSON.stringify(err));
    // }

    await validateOrReject(dto);
    return this.userService.create(dto);
  }
}
