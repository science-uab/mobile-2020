import React from 'react'
import { isLoadingIcon } from '../Images'

export default ({className, imageClass, src}) => {

	const [isLoaded, setLoaded] = React.useState(false)

	return (
		<Box className={className}>
			{
				!isLoaded && (
				<img src={isLoadingIcon} className={[imageClass,classes.fixedClass].join(' ')} />
				)
			}
			<img src={src} className={imageClass} onLoad={() => setLoaded(true)}/>
		</Box>
	)

}
