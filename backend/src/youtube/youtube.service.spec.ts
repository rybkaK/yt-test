import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YoutubeService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should return formatted video search results', async () => {
      const mockResponse: AxiosResponse = {
        data: {
          items: [
            {
              id: { videoId: 'video1' },
              snippet: {
                title: 'Test Video',
                description: 'Test Description',
                thumbnails: {
                  high: { url: 'http://example.com/thumbnail.jpg' },
                },
                publishedAt: '2024-01-01T00:00:00Z',
              },
            },
          ],
          pageInfo: { totalResults: 1 },
          nextPageToken: 'NEXT_TOKEN',
          prevPageToken: 'PREV_TOKEN',
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders(),
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const result = await service.search('test query');

      expect(result).toEqual({
        results: [
          {
            videoId: 'video1',
            title: 'Test Video',
            description: 'Test Description',
            thumbnailUrl: 'http://example.com/thumbnail.jpg',
            publishedAt: '2024-01-01T00:00:00Z',
          },
        ],
        totalResults: 1,
        nextPageToken: 'NEXT_TOKEN',
        prevPageToken: 'PREV_TOKEN',
      });
    });

    it('should handle errors from the API and throw HttpException', async () => {
      const mockError = {
        response: { status: 403, statusText: 'Forbidden' },
        message: 'Request failed',
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(throwError(() => mockError));

      await expect(service.search('test query')).rejects.toThrow(
          new HttpException('Request failed', 403),
      );
    });

    it('should handle unexpected errors and throw Internal Server Error', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(throwError(() => new Error('Unexpected error')));

      await expect(service.search('test query')).rejects.toThrow(
          new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
});
