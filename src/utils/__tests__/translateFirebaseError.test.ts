import {translateFirebaseError} from '../translateFirebaseError';

describe('translateFirebaseError', () => {
  it('should return the correct message for known error codes', () => {
    expect(translateFirebaseError('auth/email-already-in-use')).toBe(
      'Este e-mail já está em uso.',
    );
  });
});
