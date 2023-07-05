import React from "react";

interface IHighlightTextProps {
  text: string;
  highlightWord: string;
}

const HighlightText = ({ text, highlightWord }: IHighlightTextProps) => {
  if (!highlightWord) {
    return <React.Fragment>text</React.Fragment>;
  }

  const regex = new RegExp(`(${highlightWord})`, "gi");
  const wordsInText = text.split(regex);
  return (
    <>
      {wordsInText.map((word: string, index: number) => {
        if (regex.test(word)) {
          return (
            <React.Fragment key={index}>
              {word
                .split(regex)
                .map((match: string, i: number) =>
                  regex.test(match) ? <mark key={i}>{match}</mark> : match
                )}
            </React.Fragment>
          );
        }
        return <React.Fragment key={index}>{word}</React.Fragment>;
      })}
    </>
  );
};

export default HighlightText;
