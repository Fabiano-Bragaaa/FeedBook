import {convertToUtc} from '../getTimezoneOffset';

describe('getTimezoneOffset', () => {
  describe('convertToUtc', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });
    it('should convert the date from the America/Sao_Paulo time zone to UTC', () => {
      jest.setSystemTime(new Date(2023, 0, 1, 13, 40));
      const time = convertToUtc(new Date(), 'America/Sao_Paulo');

      expect(time.toISOString()).toBe('2023-01-01T16:40:00.000Z');
    });
  });
});
