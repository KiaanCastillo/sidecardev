import { Configuration, OpenAIApi } from "openai";
require('dotenv').config

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

// remove 'User-Agent' header to bypass openai restriction on client application
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration);

// retrieve the response from chatgpt api and set it in a callback
export const getGPTResponse = async (prompt, setResponse) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 2000,
  });

  if (response.data.choices) {
    setResponse(response.data.choices[0].text);
  }
};

