import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../classes/ErrorHandler";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
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

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };