import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Letter from './Letter';
import { useTheme } from '../context/ThemeContext';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
type CodeDisplayProps = {
  code?: string[];
}
type CodeBlockProps = {
  text?: string;
  style?: object;
}

export default function CodeDisplay(props: CodeDisplayProps) {
  const { theme } = useTheme() as ThemeContextType;
    const styles = getStyles(theme);

  const { code } = props;
  const copyCode = code?.slice();
  const filledCode = copyCode
    ? [...copyCode, ...Array(4 - copyCode.length).fill('')]
    : Array(4).fill('');

  const codeBlocks = filledCode;
  const title = 'CALLBACK CODE';

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Letter content={title} styles={styles.title} />
      </View>
      <View style={styles.codeContainer}>
        {codeBlocks.map((text, index) => (
          <CodeBlock style={styles.codeBlock} key={index}
            text={text}
          />
        ))}
      </View>
    </View>
  );
}

const CodeBlock = (props: CodeBlockProps) => {
  const { text, style } = props;
  return (
    <Text style={style}>{text || ''}</Text>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    flexDirection: 'column',
    borderColor: theme.border,
    borderWidth: 8,
    borderTopWidth: 0,
    height: 150,
  },
  title: {
    backgroundColor: theme.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.onBorder,
    fontSize: 24,
  },
  codeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  codeBlock: {
    width: 20,
    color: theme.text,
    textAlign: 'center',
    fontSize: 32,
    borderColor: theme.border,
    borderBottomWidth: 4,
  },
});
