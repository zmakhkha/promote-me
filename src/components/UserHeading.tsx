import { Heading } from '@chakra-ui/react'
import { GameQuery } from '../App'

interface Props{
	gameQuery: GameQuery; 
}

const UserHeading = ({gameQuery}: Props) => {
	const heading = `${gameQuery.platform?.name ||''} ${gameQuery.genre?.name || ''} Users`
  return (
	<Heading fontSize='5xl' marginY={5} as='h1'>
		{heading}
	</Heading>
  )
}

export default UserHeading