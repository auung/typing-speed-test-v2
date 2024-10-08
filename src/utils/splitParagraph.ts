function splitParagraph(paragraph: string, containerWidth: number, fontSize: number): number[] {
  const maxLetters = Math.floor(containerWidth / fontSize); 
  const words = paragraph.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxLetters) {
      if (currentLine.length > 0) {
        currentLine += ' ';
      }
      currentLine += word;

    } else {
      currentLine += ' ';
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  return lines.map(v => v.length);
}

export default splitParagraph;