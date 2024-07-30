import { Badge } from '@chakra-ui/react';

interface Props {
	score: number;
}

const CriticScore = ({score}: Props) => {
	let color = score > 30 ? 'red' : score > 18 ? 'green' : '';
  return (
	<Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius='4px'>{score}</Badge>
  )
}

export default CriticScore