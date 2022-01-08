import { ReduceTextPipe } from './reduce-text.pipe';

describe('ReduceText pipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  })

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('use transform correctly', () => {
    const text = 'This is a text to check the pipe';

    const newText = pipe.transform(text, 5);

    expect(newText.length).toBe(5);
  });
});