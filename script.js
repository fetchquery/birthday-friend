import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = "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";
const openai = new OpenAIApi(
    new Configuration({
        apiKey: OPENAI_API_KEY,
    })
);

const form = document.querySelector("form");
const input = document.querySelector(`input[type="text"]`);
const chat = document.querySelector("#chat");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const req = input.value;
    input.value = "";
    if (req.length < 1) {
        return;
    }
    if (req.trim() === "") {
        return;
    }

    input.value = "";
    appendChat(req, "req");

    const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req,
        temperature: 0.8,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    }, {
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        }
    });
    appendChat(res.data.choices[0].text, "res");
});

function appendChat(message, className) {
    const content = document.createElement("div");
    content.innerHTML = message;
    content.classList.add("content");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.classList.add(className);

    wrapper.appendChild(content);
    chat.appendChild(wrapper);
};
