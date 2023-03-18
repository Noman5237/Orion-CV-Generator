import { exec } from 'child_process';
import process from 'process';
import { promisify } from 'util';
import path from 'path';

import { ExecutorContext } from '@nrwl/devkit';

import { RunCommandExecutorSchema } from './schema';

const processOptions = (options: object): object => JSON.parse(
	JSON.stringify(options)
		.replace(/\$(\w+)/g, (_, key) => process.env[key] || '')
		.replace(/'/g, '"')
);

const straightenLiquibaseOutput = (output: { stdout: string, stderr: string }, options: RunCommandExecutorSchema): { success: boolean, stdout: string, stderr: string } => {
	const successTest = new RegExp(String.raw`command '${options.command}' was executed successfully`);

	let { stdout, stderr } = output
	let success = true;

	if (successTest.test(output.stdout)) {
		[stdout, stderr] = [output.stdout, output.stderr]
	} else if (successTest.test(output.stderr)) {
		[stdout, stderr] = [output.stderr, output.stdout]
	} else {
		success = false;
	}

	return { success, stdout, stderr };
}

const getOverrides = (process) => {
	const { overrides } = JSON.parse(process.argv[2]);
	return {
		parsed: overrides,
		original: Object.entries(overrides)
			.filter(([key, _]) => !key.startsWith('__') && key !== 'command')
			.map(([key, value]) => `--${key}=${value}`)
			.join(' ')
	}
}

export default async function runExecutor(
	options: RunCommandExecutorSchema,
	context: ExecutorContext
) {
	options = processOptions(options) as RunCommandExecutorSchema;

	// if any args are passed in via the command line, add them to the command as forward args
	const extraArgs = getOverrides(process).original;
	options.args.forward = options.args.forward ? options.args.forward + ' ' + extraArgs : extraArgs;

	const command = `docker run --rm --network ${options.docker.network}` +
		` ${options.docker.volumes
			.map(v => `-v ${path.join(context.root, options.cwd, v.hostPath)}:${v.containerPath}`)
			.join(' ')}` +
		` ${options.docker.image}` +
		` --url=${options.args.url}` +
		` --username=${options.args.username}` +
		` --password=${options.args.password}` +
		` --changelog-file=${options.args['changelog-file']}` +
		` ${options.command}` +
		`${options.args.forward ? ' ' + options.args.forward : ''}`;

	console.log(command);

	process.chdir(options.cwd);

	let output = await promisify(exec)(command);
	const { success, stdout, stderr } = straightenLiquibaseOutput(output, options);

	console.log(stdout);

	if (stderr) {
		console.log(stderr);
	}

	return { success };
}
