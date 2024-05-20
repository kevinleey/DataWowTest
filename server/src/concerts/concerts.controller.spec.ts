import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { Concert } from './concert.model';
import { CreateConcertDto } from './dto/create-concert.dto';

describe('ConcertsController', () => {
  let controller: ConcertsController;
  let service: ConcertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [ConcertsService],
    }).compile();

    controller = module.get<ConcertsController>(ConcertsController);
    service = module.get<ConcertsService>(ConcertsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllConcerts', () => {
    it('should return all concerts', async () => {
      const mockConcerts = [
        {
          id: 1,
          name: 'Concert A',
          description: 'Description A',
          reservations: 100,
        },
        {
          id: 2,
          name: 'Concert B',
          description: 'Description B',
          reservations: 200,
        },
      ];
      jest
        .spyOn(service, 'getAllConcerts')
        .mockImplementation(() => mockConcerts);

      expect(await controller.getAllConcerts()).toBe(mockConcerts);
    });
  });

  describe('createConcert', () => {
    it('should successfully create a concert', async () => {
      const mockBody: CreateConcertDto = {
        name: 'Concert A',
        description: 'Description A',
        reservations: 100,
      };

      const mockConcert: Concert = {
        id: 1,
        ...mockBody,
      };

      jest
        .spyOn(service, 'createConcert')
        .mockImplementation(() => mockConcert);

      const result = await controller.createConcert(mockBody);

      expect(result).toEqual(mockConcert);
      expect(service.createConcert).toHaveBeenCalledWith(mockBody);
    });
  });

  describe('deleteConcert', () => {
    it('should successfully delete a concert', async () => {
      const concertIdToDelete = 1;
      jest.spyOn(service, 'deleteConcert').mockReturnValueOnce(true);

      const result = await controller.deleteConcert(concertIdToDelete);

      expect(result).toEqual({ message: 'Concert deleted successfully' });
    });
  });
});
