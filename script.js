import { AutoModelForCausalLM, AutoTokenizer } from './libs/transformers.min.js';

let model, tokenizer;

// Load the tokenizer and model from local ONNX folder
async function loadModel() {
    tokenizer = await AutoTokenizer.from_pretrained('/models/gpt2/tokenizer.json');
    model = await AutoModelForCausalLM.from_pretrained('/models/gpt2/decoder_with_past_model.onnx');

    console.log('Model loaded successfully!');
}

loadModel();

// Button click handler
document.getElementById('run').addEventListener('click', async () => {
    const prompt = document.getElementById('input').value;
    const outputElement = document.getElementById('output');

    if (!model || !tokenizer) {
        outputElement.textContent = 'Model is still loading...';

        // for now
        outputElement.textContent = 'Model isnt fucking working because weeeeh...';
        return;
    }

    const inputIds = tokenizer.encode(prompt);
    const outputIds = await model.generate(inputIds, { max_length: 100 });
    const text = tokenizer.decode(outputIds);

    outputElement.textContent = text;
});
