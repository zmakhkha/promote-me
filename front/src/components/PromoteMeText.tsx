import React, { useState, useEffect } from "react";
import { Box, useColorModeValue, Text } from "@chakra-ui/react";

const sentences = [
  "Meet new friends",
  "Find real love",
  "Expand your social network",
];

interface TypingEffectProps {
  text: string;
}

const typingSpeed = 100; // Speed of typing effect in milliseconds
const eraseSpeed = 200; // Speed of erasing effect in milliseconds
const pauseDuration = 5000; // Pause between sentences in milliseconds

const TypingEffect = ({ text }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[displayText.length]);
        if (displayText.length === text.length) {
          setIsTyping(false);
        }
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText.length === 0) {
          setIsTyping(true);
          setSentenceIndex(prev => (prev + 1) % sentences.length);
        }
      }, eraseSpeed);
      return () => clearTimeout(timer);
    }
  }, [displayText, isTyping, text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, pauseDuration);
    return () => clearTimeout(timer);
  }, [sentenceIndex]);

  useEffect(() => {
    setDisplayText("");
  }, [sentenceIndex]);

  return <Text>{displayText}</Text>;
};

const PromoteMeText = () => {
  const textColor = useColorModeValue("gray.800", "white");
  
  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="4xl" fontWeight="bold" color={textColor}>
        Promote-me <TypingEffect text={sentences[1]} />
      </Text>
    </Box>
  );
};

export default PromoteMeText;
