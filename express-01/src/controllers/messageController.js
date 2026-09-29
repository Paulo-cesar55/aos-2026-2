import { messageService } from "../services/index.js";

const getMessages = async (req, res) => {
  const messages = await messageService.getAllMessages();
  return res.status(200).send(messages);
};

const getMessage = async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);
  if (!message) {
    return res.status(404).send();
  }
  return res.status(200).send(message);
};

const createMessage = async (req, res) => {
  if (!req.context?.me?.id) {
    return res.status(404).send();
  }

  const { text } = req.body || {};
  const message = await messageService.createMessage({
    text,
    userId: req.context.me.id,
  });

  return res.status(201).send(message);
};

const updateMessage = async (req, res) => {
  const { text } = req.body || {};
  const message = await messageService.updateMessage(req.params.messageId, {
    text,
  });
  if (!message) {
    return res.status(404).send();
  }
  return res.status(200).send(message);
};

const deleteMessage = async (req, res) => {
  const isDeleted = await messageService.deleteMessage(req.params.messageId);
  if (!isDeleted) {
    return res.status(404).send();
  }
  return res.status(204).send();
};

export default {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
