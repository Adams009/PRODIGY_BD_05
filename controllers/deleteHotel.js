import prisma from "../prisma/prismaConnect.js";

const deleteHotelController = async (req, res) => {
    const hotelId = parseInt(req.params.id, 10);
    if (isNaN(hotelId)) {
        return res.status(400).json({ message: "Invalid hotel ID" });
    }

    try {
        //Verify hotel belongs to this owner
        // const hotel = await prisma.hotel.findFirst({
        //     where: {
        //         id: hotelId,
        //         ownerId: req.user.id, // ensure logged-in owner owns this hotel
        //     },
        // });
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId },
        });

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        if (hotel.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this hotel" });
        }

        // Delete the hotel
        await prisma.hotel.delete({
            where: {
                id: hotelId,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Hotel deleted successfully",
            deletedHotel: {
                id: hotel.id,
                name: hotel.name,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export default deleteHotelController;