import { Configuration, OpenAIApi } from "openai";

let openai;
const form = document.querySelector("form");
const input = document.querySelector(`input[type="text"]`);
const chat = document.querySelector("#chat");
const textarea = document.querySelector("textarea");

textarea.addEventListener("change", () => {
    openai = new OpenAIApi(
        new Configuration({
            apiKey: textarea.value,
        })
    );
});


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
    chat.scrollTo(0, chat.scrollHeight);

    const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req,
        temperature: 0.8,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });
    appendChat(res.data.choices[0].text, "res");
    chat.scrollTo(0, chat.scrollHeight);
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
