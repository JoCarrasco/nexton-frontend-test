import { StatusToStatusIdentifierPipe } from './status-to-status-identifier-pipe';

describe('StatusToStatusIdentifierPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusToStatusIdentifierPipe();
    expect(pipe).toBeTruthy();
  });
});
