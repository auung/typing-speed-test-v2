function calcSpeed(letterCount: number, elapsedTime: number): number {
  const wordCount = letterCount / 5;
  return wordCount * (60 / elapsedTime);
}

export default calcSpeed;