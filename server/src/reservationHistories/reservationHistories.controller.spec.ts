import { Test, TestingModule } from '@nestjs/testing';
import { ReservationHistoriesController } from './reservationHistories.controller';
import { ReservationHistoriesService } from './reservationHistories.service';
import { ReservationHistory } from './reservationHistory.model';
import { CreateReservationHistoryDto } from './dto/create-reservation-history.dto';

describe('ReservationHistoriesController', () => {
  let controller: ReservationHistoriesController;
  let service: ReservationHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationHistoriesController],
      providers: [ReservationHistoriesService],
    }).compile();

    controller = module.get<ReservationHistoriesController>(
      ReservationHistoriesController,
    );
    service = module.get<ReservationHistoriesService>(
      ReservationHistoriesService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllReservationHistories', () => {
    it('should return all reservation histories', async () => {
      const mockHistories: ReservationHistory[] = [
        {
          id: 1,
          username: 'User 1',
          concertName: 'Concert A',
          action: 'Reserve',
          timestamp: new Date(),
        },
        {
          id: 2,
          username: 'User 2',
          concertName: 'Concert B',
          action: 'Cancel',
          timestamp: new Date(),
        },
      ];
      jest
        .spyOn(service, 'getAllReservationHistories')
        .mockImplementation(() => mockHistories);

      expect(await controller.getAllReservationHistories()).toBe(mockHistories);
    });
  });

  describe('createReservationHistory', () => {
    it('should successfully create a reservation history', async () => {
      const mockBody: CreateReservationHistoryDto = {
        username: 'User 1',
        concertName: 'Concert A',
        action: 'Reserve',
      };

      const mockHistory: ReservationHistory = {
        id: 1,
        timestamp: new Date(),
        ...mockBody,
      };

      jest
        .spyOn(service, 'createReservationHistory')
        .mockImplementation(() => mockHistory);

      const result = await controller.createReservationHistory(mockBody);

      expect(result).toEqual(mockHistory);
      expect(service.createReservationHistory).toHaveBeenCalledWith(mockBody);
    });
  });

  describe('getReservationHistoriesByUsername', () => {
    it('should return reservation histories for a specific username', async () => {
      const username = 'User 1';
      const mockHistories: ReservationHistory[] = [
        {
          id: 1,
          username: 'User 1',
          concertName: 'Concert A',
          action: 'Reserve',
          timestamp: new Date(),
        },
        {
          id: 2,
          username: 'User 2',
          concertName: 'Concert B',
          action: 'Cancel',
          timestamp: new Date(),
        },
        {
          id: 3,
          username: 'User 1',
          concertName: 'Concert C',
          action: 'Reserve',
          timestamp: new Date(),
        },
      ];
      jest
        .spyOn(service, 'getReservationHistoriesByUsername')
        .mockImplementation((username: string) => {
          return mockHistories.filter(
            (history) => history.username === username,
          );
        });

      expect(controller.getReservationHistoriesByUsername(username)).toEqual([
        {
          id: 1,
          username: 'User 1',
          concertName: 'Concert A',
          action: 'Reserve',
          timestamp: expect.any(Date),
        },
        {
          id: 3,
          username: 'User 1',
          concertName: 'Concert C',
          action: 'Reserve',
          timestamp: expect.any(Date),
        },
      ]);
      expect(service.getReservationHistoriesByUsername).toHaveBeenCalledWith(
        username,
      );
    });
  });
});
