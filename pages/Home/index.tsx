import {
  useWindowDimensions
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CodeDisplay from '../../components/CodeDisplay';
import Hover from '../../components/Hover';
import { useTheme } from '../../context/ThemeContext';

type ThemeConfig = {
  type: string,
  surface: string,
  background: string,
  container: string,
  onContainer: string,
  border: string,
  text: string,
  success: string,
  outstanding: string
}
type ThemeContextType = {
  theme: ThemeConfig;
  toggleTheme: () => void;
};
type DeviceProps = {
  code: string;
  countdown: number;
}
type KeyProps = {
  text?: string;
  press: (key: string) => void;
}

export default function Device (props: DeviceProps) {
  const { theme } = useTheme() as ThemeContextType;
  const styles = getStyles(theme);
  
  const { code: checkCode, countdown } = props;

  const keys: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '<'
  ];
  const totalTime = countdown * 1000; // Convert seconds to milliseconds
  const [inputCodes, setInputCodes] = useState<string[]>([]);
  const [seconds, setSeconds] = useState<number>(countdown);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [timeNearlyUp, setTimeNearlyUp] =useState(false);
  let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  let displayMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  const timerId = useRef<null | NodeJS.Timeout>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [timeoutStatus, setTimeoutStatus] = useState<boolean>(false);

  const [hover, setHover] = useState<boolean>(false);
  const [hoverText, setHoverText] = useState<string>('initial state...');

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  function reset () {
    setInputCodes([]);
    setTimeoutStatus(false);
    setSeconds(countdown);
    setProgress(1);
  }
  function verifyCode(input: string) {
    setVerifying(true);
    if (timerId.current) clearTimeout(timerId.current);
    if (input === checkCode) {
      setHoverText('Code accepted');
      reset();
    } else {
      setHoverText('Code rejected');
      reset();
    }
    setHover(true);
    setTimeout(() => {
      setVerifying(false);
      setTimeoutStatus(true);
      setHover(false);
    }, 1000);
  }
  function inputValue (key: string) {
    if (timeoutStatus) setTimeoutStatus(false);
    if (key === '<') {
      deleteValue();
      return;
    }
    if (inputCodes.length > 4) {
      console.log('Input limit reached');
      return;
    }
    const currentCode = [...inputCodes, key];
    setInputCodes(currentCode);

    if (currentCode.length === 4) {
      verifyCode(currentCode.join(''));
    }
  }
  function deleteValue () {
    console.log('Delete value');
    setInputCodes(value => {
      const newValue = [...value];
      newValue.pop();
      return newValue;
    });
  }

  useEffect(() => {
    if (verifying) {
      if (timerId.current) clearTimeout(timerId.current);
      return;
    }

    const startTime = Date.now();
    
    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = totalTime - elapsed;

      if (remainingTime <= 0) {
        console.log('Time is up!');
        if (timerId.current) clearTimeout(timerId.current)
        setInputCodes([]);
        setTimeoutStatus(true);
        setSeconds(countdown);
        setProgress(1);
        setTimeNearlyUp(false);
        return;
      }

      const currentSeconds = Math.floor(remainingTime / 1000);
      const currentMilliseconds = Math.floor((remainingTime % 1000) / 10);
      const currentProgress = Math.min(remainingTime / totalTime, 1);
      setSeconds(currentSeconds);
      setMilliseconds(currentMilliseconds);
      setProgress(currentProgress);

      if (currentSeconds < 2) {
        setTimeNearlyUp(true);
      } else {
        setTimeNearlyUp(false);
      }

      timerId.current = setTimeout(updateTimer, 10);
    };

    if (!verifying && !timeoutStatus) {
      updateTimer();
    }
  }, [
    verifying,
    timeoutStatus,
    totalTime,
    countdown
  ]);

  return (
    <View style={[
      styles.container,
      isLandscape ? styles.horizontal : styles.vertical,
    ]}>
      <Hover show={hover} text={hoverText} />
      <View style={
          isLandscape ? [styles.horizontalWidth, styles.marginRight] : {}
        }>
        <CodeDisplay code={inputCodes} />
        <View style={[
          styles.progressBar,
          { width: `${progress * 100}%`, },
          timeNearlyUp ? styles.warning : styles.success 
        ]} />
        <View style={styles.countContainer}>
        {
          timeoutStatus 
            ? <Text style={styles.indicateText}>Press key to verify</Text>
            : <>
                <Text style={styles.countdownText}>00</Text>
                <Text style={styles.indicateText}>:</Text>
                <Text style={styles.countdownText}>{displaySeconds}</Text>
                <Text style={styles.indicateText}>:</Text>
                <Text style={styles.countdownText}>{displayMilliseconds}</Text>
              </>
        }
        </View>
      </View>

      <View style={[
        styles.keyContainer,
        isLandscape ? styles.horizontalWidth : {}
      ]}>
        {
          keys.map((content) => 
            <Key key={content}
              text={content} 
              press={inputValue}
            />)
        }
      </View>
    </View>
  );
};

const Key = (props: KeyProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = getStyles(theme);

  const {text, press} = props;
  const theStyle = text === '0' ? styles.keyZero : {};
  return (
    <View style={[styles.key, theStyle]}>
      <Pressable onPress={() => press(text!)}>
        <Text style={styles.keyText}>{text}</Text>
      </Pressable>
    </View>
  );
}

// 02c820
const getStyles = (theme: any) => StyleSheet.create({
  success: { backgroundColor: theme.success },
  warning: { backgroundColor: theme.outstanding },
  marginRight: { marginRight: 4 },
  vertical: { flexDirection: 'column' },
  horizontal: { 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  horizontalWidth: { width: '50%' },
  container: {
    backgroundColor: theme.surface,
    justifyContent: 'space-evenly',
    padding: 8,
    height: '100%',
  },
  progressBar: {
    backgroundColor: theme.success,
    height: 24,
    width: '100%',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  indicateText: {
    color: theme.text,
    fontSize: 24,
  },
  countdownText: {
    color: theme.text,
    textAlign: 'center',
    fontSize: 24,
    width: 40,
  },
  keyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    maxWidth: 370,
    maxHeight: 260,
  },
  key: {
    backgroundColor: theme.surface,
    minWidth: 80,
    minHeight: 80,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: theme.border,
    borderWidth: 1,
  },
  keyZero: {
    flex: 2,
  },
  keyText: {
    color: theme.text,
    fontSize: 24,
    textAlign: 'center',
    // textAlignVertical: 'center', // TODO: not for vertical alignment
  },
});
