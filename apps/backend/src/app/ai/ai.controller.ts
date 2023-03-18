import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { Get } from '@nestjs/common';
import { Public } from '../Utils/Decorators';

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-srnz1ZdFx7uAZAPiaS6YJBR5",
  apiKey: process.env.OPENAI_API_KEY,
});

@Controller('ai')
@Public()
export class AiController {
  public openai: OpenAIApi;
  constructor(private readonly aiService: AiService) {
    this.openai = new OpenAIApi(configuration);
  }

  @Get('/test')
  public async test() {
    const engines = await this.openai.listEngines();
    console.log(engines);
  }

  @Post('/generate-cover-letter')
  public async generateCoverLetter(@Body() body: { jobDescription: string, skills: string[] }) {
    const { jobDescription, skills } = body;
    console.log(body);

    const prompt = `
    Write a cover letter in 300 words for the following job description:
    ${jobDescription}
    My skills include:
    ${skills.join(' ')}
    `;

    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
    });

    console.log(response.data);

    return response.data.choices[0].text;
  }

  @Post('/grammar-correction')
  public async grammarCorrection(@Body() body: { text: string }) {
    const { text } = body;
    console.log(body);

    const prompt = `
    Correct this to standard English:
    ${text}
    `;

    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: text.length,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response.data);
    return response.data.choices[0].text;
  }

  @Post('/job-matching')
  public async jobMatching(@Body() body: {
    jobDescription: string,
    skills: string[],
    projects: { name: string, description: string, technologies: string[] }[]
  }) {
    const { jobDescription, skills, projects } = body;
    console.log(body);

    const prompt = `
      Sort the following items in order of relevance to the following job description in '{"skills":[0, 2, 1], "projects": [0, 1]}' format:
      Job Description: ${jobDescription}
      Skills: ${skills.join(', ')}
      Projects: ${projects.join(', ')}
    `;

    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response.data);
    // \n    {skills: [2, 1, 3, 4, 0], projects: [0, 1, 2]};
    const usefulData = response.data.choices[0].text.match(/{.*}/)[0]
    console.log(usefulData);
    const result = JSON.parse(usefulData);
    return result;
  }

}
