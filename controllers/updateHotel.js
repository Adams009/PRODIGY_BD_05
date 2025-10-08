import  prisma  from "../prisma/prismaConnect.js";
import {buildUpdateData} from "../utils/buildUpdateData.js";
const updateHotelController = async (req, res) => {
    const hotelId = parseInt(req.params.id, 10);

  try {

    // Build update data dynamically
    const updateData = buildUpdateData(req.body, ["name", "address", "city", "state", "country"]);
    

    // check if the owner is updating their own hotel
    const hotel = await prisma.hotel.findFirst({
      where: { 
        id: hotelId,
        ownerId: req.user.id
      } 
    });


    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found or you are not the owner" });
    }

    // // Ensure at least one field is provided
    // if (Object.keys(updateData).length === 0) {
    //   return res.status(400).json({ error: "At least one field must be provided for update" });
    // }


    const updatedHotel = await prisma.hotel.update({
      where: { 
        id: hotelId 
      },
      data: updateData,
    });

    return res.status(200).json({
        status: "success",
        message: "Hotel updated successfully",
        hotel: updatedHotel,
    });

  } catch (error) {
    console.error("Update Hotel Error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Hotel not found" });
    }

    return res.status(500).json({ error: "Something went wrong while updating the hotel" });
  }
};


export default updateHotelController;