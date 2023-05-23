// import { Configuration, OpenAIApi } from "openai";

import axios from "axios";

// const configuration = new Configuration({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
// });

// // remove 'User-Agent' header to bypass openai restriction on client application
// delete configuration.baseOptions.headers["User-Agent"];

// const openai = new OpenAIApi(configuration);
// var persona = "";

// export function setPersona(phrase) {
//   persona = phrase.trim();
// }

// function createPrompt(message, codeText, codeLang) {
//   let prompt = `${message}.
//     If applicable, here is some code for context written in ${codeLang}: \`\`\`${codeText}\`\`\``;

//   if (persona.length > 0) {
//     prompt = `Please assume the persona of ${persona}` + prompt;
//   }

//   return prompt;
// }

// TODO = change back

// // retrieve the response from chatgpt api and set it in a callback
// export const getGPTResponse = async (
//   message,
//   codeText,
//   codeLang,
//   setResponse
// ) => {
//   const prompt = createPrompt(message, codeText, codeLang);
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: prompt,
//     max_tokens: 500,
//   });

//   if (response.data.choices) {
//     setResponse(response.data.choices[0].text);
//     return response.data.choices[0].text;
//   }
// };

export const getGPTResponse = async (
  message,
  codeText,
  codeLang,
  setResponse
) => {
  // const prompt = createPrompt(message, codeText, codeLang);
  const response = await axios.get(
    "https://stormhacks2023-backend.onrender.com/chatgpt/getGPTResponse",
    {
      params: {
        msg: message,
        codeTxt: codeText,
        codeLng: codeLang,
        setRespnse: setResponse,
      },
    }
  );

  return response.data;
};
