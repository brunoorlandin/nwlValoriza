import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../classes/ErrorHandler";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest {
  tag_id: string,
  user_sender: string,
  user_receiver: string,
  message: string
}

class CreateComplimentService {

  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      const err = {
        name: "UserReceiverError",
        statusCode: 406,
        message: "Receiver user has to be different than sender user",
        description: "Please enter another receiver user"
      }

      throw new ErrorHandler(err);
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      const err = {
        name: "UserReceiverError",
        statusCode: 406,
        message: "User receiver does not exists",
        description: "Please enter a valid user receiver"
      }

      throw new ErrorHandler(err);
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepositories.save(compliment);

    return compliment
  }

}

export { CreateComplimentService }