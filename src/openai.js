import { Configuration, OpenAIApi } from "openai";
import config from "config";
import { createReadStream } from "fs";

const CHAT_GPT_MODEL = "gpt-3.5-turbo";

class OpenAi {
  roles = {
    ASSISTANT: "assistant",
    USER: "user",
    SYSTEM: "system",
  };
  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async chat(messages = []) {
    try {
      const response = await this.openai.createChatCompletion({
        model: CHAT_GPT_MODEL,
        messages,
      });
      return response.data.choices[0].message;
    } catch (error) {
      console.log("Error while gtp chat", error.message);
    }
  }

  async transcription(filePath) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filePath),
        "whisper-1"
      );
      return response.data.text;
    } catch (error) {
      console.log("Error while transcription", error.message);
    }
  }
}

export const openai = new OpenAi(config.get("OPENAI_KEY"));
