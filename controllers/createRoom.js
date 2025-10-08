import prisma from "../prisma/prismaConnect.js";

const createRoomController = async (req, res) => {
  const { hotelId, roomNumber, roomType, capacity, price, description, amenities } = req.body;

  try {
    // 1. Verify hotel belongs to this owner
    const hotel = await prisma.hotel.findFirst({
      where: {
        id: hotelId,
        ownerId: req.user.id, // ensure logged-in owner owns this hotel
      },
    });

    if (!hotel) {
      return res.status(403).json({
        status: "error",
        message: "You do not own this hotel or it does not exist",
      });
    }

    // 2. Create the room
    const room = await prisma.room.create({
      data: {
        roomNumber,
        roomType,
        capacity,
        price,
        description,
        amenities,
        hotel: {
          connect: { id: hotel.id },
        },
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    // Handle unique constraint violation (roomNumber must be unique per hotel)
    if (error.code === "P2002") {
      return res.status(400).json({
        status: "error",
        message: `Room number '${roomNumber}' already exists for this hotel`,
      });
    }

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default createRoomController;
