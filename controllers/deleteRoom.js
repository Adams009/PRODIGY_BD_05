import prisma from '../prisma/prismaConnect.js';

const deleteRoomController = async (req, res) => {
    const  id  = parseInt(req.params.id, 10);
    const hotelId  = parseInt(req.body.hotelId, 10);

    if (isNaN(hotelId) || isNaN(id)) {
        return res.status(400).json({ message: "Invalid hotel ID" });
    }

    try {
        // Find the room to be deleted
        const room = await prisma.room.findUnique({ where: { id } });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Check if the user owns the hotel
        const hotel = await prisma.hotel.findFirst({
                where: { id: hotelId, ownerId: req.user.id },
        });

        if (!hotel) {
            return res.status(403).json({ message: "You do not own this hotel or it does not exist" });
        }

        // Check if the room belongs to the specified hotel
        if (room.hotelId !== hotelId) {
            return res.status(400).json({ message: "Room does not belong to the specified hotel" });
        }

        // Delete the room
        await prisma.room.delete({ where: { id } });

        res.status(200).json({
            status: "success",
            message: "Room deleted successfully",
            deletedRoom: {
                id: room.id,
                roomNumber: room.roomNumber,
                hotelId: room.hotelId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export default deleteRoomController;