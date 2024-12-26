import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class YoutubeService {
  private readonly baseURL = 'https://www.googleapis.com/youtube/v3';
  private readonly apiKey = process.env.YOUTUBE_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async search(query: string, maxResults = 10, pageToken?: string) {
    const params = {
      part: 'snippet',
      q: query,
      maxResults: maxResults.toString(),
      key: this.apiKey,
      pageToken,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/search`, { params }),
      );

      const modifiedResponse = response.data.items.map((item) => {
        return {
          videoId: item.id.videoId || item.id.playlistId || item.id.channelId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
        };
      });

      return {
        results: modifiedResponse,
        totalResults: response.data.pageInfo?.totalResults || 0,
        nextPageToken: response.data.nextPageToken || null,
        prevPageToken: response.data.prevPageToken || null,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new HttpException(axiosError.message, axiosError.response.status);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
