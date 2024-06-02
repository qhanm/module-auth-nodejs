import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { AppDataSource } from "../data-source";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments | undefined
  ): Promise<boolean> {
    if (!validationArguments?.constraints) return false;
    const [EntityClass, property] = validationArguments?.constraints;
    const repository = AppDataSource.getRepository(EntityClass);
    const entity = await repository.findOne({ where: { [property]: value } });
    return !entity;
  }

  defaultMessage(args?: ValidationArguments | undefined): string {
    if (!args?.constraints) {
      return ``;
    }
    const [, property] = args?.constraints;
    return `${property} already exists.`;
  }
}
