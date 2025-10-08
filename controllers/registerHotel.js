import prisma from "../prisma/prismaConnect.js"

const registerHotelController = async (req, res) => {
    const {name, address, city, state, country } = req.body

    try {
        const hotel = await prisma.hotel.create({
            data : {
                name,
                address,
                city,
                state,
                country,
                owner : {
                    connect : {
                        id : req.user.id
                    }
                }
            },
            include : {
                owner : true
            }
        })

        return res.status(201).json({
            'status': 'success',
            'message' : "Hotel created successfully",
            'data' : hotel
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default registerHotelController