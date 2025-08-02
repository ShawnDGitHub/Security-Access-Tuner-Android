import {
  Text,
 } from "react-native"

type LetterProps = {
  content: string,
  styles?: any
}

export default function Letter (props: LetterProps) {
  const {content, styles} = props;
  const letters = content.split('').map(
    (letter, index) => 
      <Text key={index} style={styles}>
          {letter}
      </Text>)
  return letters;
}
