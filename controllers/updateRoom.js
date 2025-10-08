import prisma from "../prisma/prismaConnect.js";
import {buildUpdateData} from "../utils/buildUpdateData.js";
// Update Room
const updateRoomController = async (req, res) => {
    const roomId = parseInt(req.params.id, 10);
   

  try {

    // Build update data dynamically
    const updateData = buildUpdateData(req.body, ["roomNumber", "roomType", "capacity", "price", "description", "amenities"]);

    //  const { roomNumber, roomType, capacity, price, description, amenities } = req.body;
    // const updateData = {};

    // if (roomNumber !== undefined) updateData.roomNumber = roomNumber;
    // if (roomType !== undefined) updateData.roomType = roomType;
    // if (capacity !== undefined) updateData.capacity = capacity;
    // if (price !== undefined) updateData.price = price;
    // if (description !== undefined) updateData.description = description;
    // if (amenities !== undefined) updateData.amenities = amenities;

    // Check if the room exists and belongs to a hotel owned by the user
    const room = await prisma.room.findUnique({
      where: { id: roomId },
        include: {
            hotel: true,
        },
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Check if the user owns the hotel
    if (room.hotel.ownerId !== req.user.id) {
      return res.status(403).json({ error: "You do not have permission to update this room" });
    }

    // Run Prisma update
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: updateData,
    });

    return res.status(200).json({
        status: "success",
        message: "Room updated successfully",
        room: updatedRoom,
    });
  } catch (error) {
    console.error("Update Room Error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Room not found" });
    }

    return res.status(500).json({ error: "Something went wrong while updating the room" });
  }
};

export default updateRoomController;