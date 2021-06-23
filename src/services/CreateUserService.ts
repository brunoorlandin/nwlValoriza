import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../classes/ErrorHandler";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      const err = {
        name: 'UserEmailError',
        statusCode: 400,
        message: 'Invalid user email',
        description: 'Empty User email. Please provide an email'
      }

      throw new ErrorHandler(err);
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      const err = {
        name: 'UserAlreadyExistsError',
        statusCode: 400,
        message: 'User already exists',
        description: 'Please provide another username'
      }

      throw new ErrorHandler(err);
    }

    const user = usersRepository.create({
      name,
      email,
      admin
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };