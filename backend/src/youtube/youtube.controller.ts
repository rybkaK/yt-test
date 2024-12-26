import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('search')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  async search(
    @Query('q') query: string,
    @Query('maxResults') maxResults: number = 10,
    @Query('pageToken') pageToken?: string,
  ) {
    if (!query) {
      return { error: 'Query parameter "q" is required' };
    }

    return this.youtubeService.search(query, maxResults, pageToken);
  }
}
