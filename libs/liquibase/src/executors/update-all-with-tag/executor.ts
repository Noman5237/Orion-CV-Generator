import path from 'path';
import fs from 'fs';

import { ExecutorContext } from '@nrwl/devkit';

import { UpdateAllWithTagExecutorSchema } from './schema';
import { promisify } from 'util';
import { exec } from 'child_process';

export default async function multipleExecutor(
	options: UpdateAllWithTagExecutorSchema,
	context: ExecutorContext
) {

	let success = true;

	try {
		const changelogsPath = path.join(options.cwd, 'changelogs');
		const fileNames = fs.readdirSync(changelogsPath);
		const tagNames = fileNames.map(file => file.split('.')[0]);
		console.log(tagNames);

		for await (const tagName of tagNames) {
			const { stdout, stderr } = await promisify(exec)(
				`npx nx update-with-tag ${context.projectName} --tag=${tagName}`,
			);
			console.log(stdout);
			console.log(stderr);

			if (stderr) {
				throw new Error(`Failed to update changelog ${tagName}`);
			}
		}
	} catch (e) {
		success = false;
	}

	return {
		success
	};
}

