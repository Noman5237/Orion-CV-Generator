import { Body, Controller, Get, Post, Param, Res } from '@nestjs/common';
import { CvService } from './cv.service';
import { connectToMongo } from '../Utils/DB/mongo-client';
import { Public } from '../Utils/Decorators';
import mongoose, { Schema } from 'mongoose';

const Any = new Schema({
  id: Schema.Types.ObjectId,
  profile: Object,
}, { strict: false });
const AnyModel = mongoose.model('Any', Any);

@Controller('cv')
@Public()
export class CvController {

  public client: typeof mongoose;

  constructor(private readonly cvService: CvService) {
    this.setClient();
  }

  private async setClient() {
    this.client = await connectToMongo();
  }


  @Get('/')
  public async helloWorld() {
    return 'Hello World';
  }

  @Post('/create/:id')
  public async createCv(@Body() body: any, @Param('id') id: string) {
    console.log(body);
    // get the object by id
    let cv;
    try {
      cv = await AnyModel.findById(id);
    } catch (e) {
    }
    if (!cv) {
      // create the object
      cv = new AnyModel({
        profile: body,
      });
    }
    // update the object
    cv.profile = body;
    // save the object
    const profile = await cv.save();
    return profile;
  }

  @Get('/get/:id')
  public async getCv(@Param('id') id: string, @Res() res: any) {
    console.log(id);
    try {
      const profile = await AnyModel.findById(id);
      console.log(profile);
      return res.status(200).json(profile);
    } catch (e) {
    }
    return res.status(404).send('Not found');
  }
}
