import botModel from "../models/botModel.js";
import fs from "fs";

// Create Bot

export const createBot = async (req, res) => {
  try {
    const { assistantId, botName, message, color, question, show } = req.fields;
    const { avatar, userAvatar } = req.files;

    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant id is required!",
      });
    }

    const isExisting = await botModel.findOne({ assistantId: assistantId });
    if (isExisting) {
      return res.status(201).send({
        success: true,
        message: "This bot already exist. Update this assistant is settings!",
      });
    }
    const questions = JSON.parse(question);
    const bot = new botModel({
      assistantId,
      botName,
      message,
      color,
      questions,
      show,
    });
    if (avatar) {
      bot.avatar.data = fs.readFileSync(avatar.path);
      bot.avatar.contentType = bot.type;
    }
    if (userAvatar) {
      bot.userAvatar.data = fs.readFileSync(userAvatar.path);
      bot.userAvatar.contentType = bot.type;
    }

    await bot.save();

    res.status(200).send({
      success: true,
      message: "Bot created!",
      bot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating bot!",
    });
  }
};

// Update Bot
export const updateBot = async (req, res) => {
  try {
    const assistantId = req.params.id;
    const { botName, message, color, question, show } = req.fields;
    const { avatar, userAvatar } = req.files;

    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant id is required!",
      });
    }

    const bot = await botModel.findOne({ assistantId: assistantId });
    if (!bot) {
      return res.status(201).send({
        success: true,
        message: "Bot not found!",
      });
    }

    const questions = JSON.parse(question) || JSON.parse(bot.questions);

    const updateBot = await botModel.findOneAndUpdate(
      { assistantId: bot.assistantId },
      {
        $set: {
          botName: botName || bot.botName,
          message: message || bot.message,
          color: color || bot.color,
          questions: questions || bot.questions,
          show: show || bot.show,
        },
      },
      { new: true }
    );
    if (avatar) {
      bot.avatar.data = fs.readFileSync(avatar.path);
      bot.avatar.contentType = bot.type;
    }
    if (userAvatar) {
      bot.userAvatar.data = fs.readFileSync(userAvatar.path);
      bot.userAvatar.contentType = bot.type;
    }

    await updateBot.save();

    res.status(200).send({
      success: true,
      message: "Bot updated successfully!",
      updateBot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update bot!",
    });
  }
};

// Get User Bot

export const getBot = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant Id is reqired!",
      });
    }

    const bot = await botModel
      .findOne({ assistantId: assistantId })
      .select("-avatar -userAvatar");

    if (!bot) {
      return res.status(400).send({
        success: false,
        message: "Bot not found!",
      });
    } else {
      res.status(200).send({
        success: true,
        bot: bot,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get bot!",
    });
  }
};

// Get Avatar Image
export const botAvatarImage = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant Id is reqired!",
      });
    }

    const bot = await botModel
      .findOne({ assistantId: assistantId })
      .select("avatar");

    if (bot.avatar.data) {
      res.set("Content-Type", bot.avatar.contentType);
      res.status(200).send(bot.avatar.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in avatar image!",
    });
  }
};

// Get User Image
export const userAvatarImage = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant Id is reqired!",
      });
    }

    const bot = await botModel
      .findOne({ assistantId: assistantId })
      .select("userAvatar");

    if (bot.userAvatar.data) {
      res.set("Content-Type", bot.userAvatar.contentType);
      res.status(200).send(bot.userAvatar.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user_avatar image!",
    });
  }
};

// Published Bot
export const publishedBot = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant id is required!",
      });
    }
    const { published } = req.body;
    console.log(published, assistantId);

    const bot = await botModel
      .findOne({ assistantId: assistantId })
      .select("-avatar -userAvatar");
    if (!bot) {
      return res.status(400).send({
        success: false,
        message: "Bot not found!",
      });
    }

    const updatebot = await botModel
      .findOneAndUpdate(
        { assistantId },
        { $set: { published: published } },
        { new: true }
      )
      .select("-avatar -userAvatar");
    await updatebot.save();

    res.status(200).send({
      success: true,
      message: "Bot published successfully!",
      updatebot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in published bot controller!",
    });
  }
};
