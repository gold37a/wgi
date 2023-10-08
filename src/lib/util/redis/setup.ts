import { client } from '.';
import { index } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';

export const setup = async () => {
	try {
		await client.ft.create(
			index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 768,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.n': {
					AS: 'n',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX,
				NOHL: true
			}
		);
	} catch (e) {
		console.error('redis setup error:', e);
	}
};
