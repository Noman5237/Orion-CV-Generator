export interface RunCommandExecutorSchema {
	command: string;
	cwd: string;
	args: {
		url: string;
		username: string;
		password: string;
		'changelog-file': string;
		forward?: string = '';
	};
	docker: {
		image: string;
		volumes: {
			hostPath: string;
			containerPath: string;
		}[];
		network: string;
	};
};
