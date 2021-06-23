import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { ErrorHandler } from "../classes/ErrorHandler";


class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      const err = {
        name: "TagNameError",
        statusCode: 406,
        message: "Incorrect name",
        description: "Missing tag name. Please provide a name"
      }

      throw new ErrorHandler(err);
    }

    if (name === "") {
      const err = {
        name: "TagNameError",
        statusCode: 406,
        message: "Empty name",
        description: "Empty tag name. Please provide a tag name"
      }

      throw new ErrorHandler(err);
    }

    const tagAlreadyExists = await tagsRepositories.findOne({
      name
    });

    if (tagAlreadyExists) {
      const err = {
        name: "TagAlreadyExistsError",
        statusCode: 419,
        message: "Tag already exists",
        description: "Tag already exists. Please enter a different tag name"
      }

      throw new ErrorHandler(err);
    }

    const tag = tagsRepositories.create({
      name
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };