import * as path from 'path';
import os from 'os';

import {
	formatFiles,
	generateFiles,
	names,
	Tree,
	getProjects
} from '@nrwl/devkit';

import { ChangelogGeneratorSchema } from './schema';

interface NormalizedSchema extends ChangelogGeneratorSchema {
	timestamp: number;
	outputPath: string;
	prefix: string;
}

function normalizeOptions(tree: Tree, options: ChangelogGeneratorSchema): NormalizedSchema {
	const name = names(options.name).fileName
	const projectName = options.project;
	const projectRoot = getProjects(tree).get(projectName).root
	const outputPath = path.join(projectRoot, options.directory);
	const timestamp = Math.floor(Date.now() / 1000);
	const prefix = `${timestamp}-${name}`;

	return {
		...options,
		timestamp,
		prefix,
		outputPath,
	};
}

function addFiles(tree: Tree, options: NormalizedSchema) {
	const templateOptions = {
		...options,
		author: options.author || os.userInfo().username,
	};
	generateFiles(tree, path.join(__dirname, 'files', 'src', options.format), options.outputPath, templateOptions);
}

export default async function (tree: Tree, options: ChangelogGeneratorSchema) {
	const normalizedOptions = normalizeOptions(tree, options);
	addFiles(tree, normalizedOptions);
	await formatFiles(tree);
}
