import { embedding_model } from "$lib/constants";
import { openai } from "$lib/util/openai";

export const embedding = (input: string) =>
	openai
		.embeddings.create({ model: embedding_model, input })
		.then((r) => {
			return r.data[0].embedding;
		})
		.catch((e) => {
			console.error(e)
			const error = e.status === 429 ? "We experienced an error. Please try again in a few moments" : e.response.data
			throw new Error(`createEmbedding error, ${error}`);
		});