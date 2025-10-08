import prisma from "../prisma/prismaConnect.js";

const profileController = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        res.status(200).json({
            status : "success",
            data : user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default profileController;