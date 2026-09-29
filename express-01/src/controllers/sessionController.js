import { userService } from "../services/index.js";

const getSession = async (req, res) => {
  const user = req.context?.me?.id
    ? await userService.getUserById(req.context.me.id)
    : null;
  if (!user) {
    return res.status(404).send();
  }
  return res.status(200).send(user);
};

export default {
  getSession,
};
