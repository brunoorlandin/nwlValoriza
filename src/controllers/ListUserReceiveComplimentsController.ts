import { Request, Response } from "express";
import { ListUserReceiveComplimentService } from "../services/ListUserReceiveComplimentService";

class ListUserReceiveComplimentsController {

  async handle(request: Request, response: Response) {

    const { user_id } = request;

    const listUserSendComplimentsService = new ListUserReceiveComplimentService();

    const compliments = await listUserSendComplimentsService.execute(user_id);

    return response.json(compliments);

  }

}

export { ListUserReceiveComplimentsController }

