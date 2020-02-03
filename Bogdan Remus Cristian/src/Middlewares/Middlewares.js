import temporary from './temporary'
import register from './register'
import uploadVehicle from './uploadVehicle'
import sendpack from './sendpack'

const middlewares = [
	temporary,
	register,
	uploadVehicle,
	sendpack
]

export default middlewares
