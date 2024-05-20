import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.model';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [ReservationsService],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllReservations', () => {
    it('should return all reservations', async () => {
      const mockReservations: Reservation[] = [
        {
          id: 1,
          username: 'User 1',
          concertId: 11,
        },
        {
          id: 2,
          username: 'User 2',
          concertId: 22,
        },
      ];
      jest
        .spyOn(service, 'getAllReservations')
        .mockReturnValue(mockReservations);

      expect(await controller.getAllReservations()).toEqual(mockReservations);
    });
  });

  describe('createReservation', () => {
    it('should successfully create a reservation', async () => {
      const mockBody: CreateReservationDto = {
        username: 'User 1',
        concertId: 11,
      };

      const mockReservation: Reservation = {
        id: 1,
        ...mockBody,
      };

      jest
        .spyOn(service, 'createReservation')
        .mockImplementation(() => mockReservation);

      const result = await controller.createReservation(mockBody);

      expect(result).toEqual(mockReservation);
      expect(service.createReservation).toHaveBeenCalledWith(mockBody);
    });
  });

  describe('deleteReservation', () => {
    it('should successfully delete a reservation', async () => {
      const reservationIdToDelete = 1;
      jest.spyOn(service, 'deleteReservation').mockReturnValue(true);

      const result = await controller.deleteReservation(reservationIdToDelete);

      expect(result).toEqual({ message: 'Reservation deleted successfully' });
    });
  });
});
