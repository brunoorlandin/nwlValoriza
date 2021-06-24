import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../classes/ErrorHandler";
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateService {
  email: string,
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateService) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    //check if user exists
    const user = await usersRepositories.findOne({
      email
    });

    if (!user) {
      //if user doesn't exists, send an error
      const err = {
        name: "UserNotFoundError",
        statusCode: 401,
        message: "Email or Password incorrect",
        description: "Please provide a valid email and password"
      }

      throw new ErrorHandler(err);
    }

    //check if password match
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      //if password doesn't match, send an error
      const err = {
        name: "UserNotFoundError",
        statusCode: 401,
        message: "Email or Password incorrect",
        description: "Please provide a valid email and password"
      }

      throw new ErrorHandler(err);
    }

    //generateToken
    const token = sign({
      email: user.email
    }, "a59fcedf1d7deb95d605696799efba0a", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService }