import jwt from "jsonwebtoken"

export const  AdminJwtCreation = async (data: any): Promise<any> =>{
    if (data !== null) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables.");
        }

        const token = jwt.sign(
            { id: data._id, adminId: data.adminId },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d", // Change the expiration time to 7 days
            }
        );
        
        // Assuming you're setting a cookie with the token
        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set cookie expiration time to 7 days
            httpOnly: true,
        };
        const credentials = { token, options, data };
        return credentials;
    } else {
        throw new Error("Email not found");
    }
}