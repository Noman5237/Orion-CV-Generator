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


}
