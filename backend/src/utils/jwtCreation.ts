import jwt from "jsonwebtoken"

export const  AdminJwtCreation = async (data: any): Promise<any> =>{
    if (data !== null) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables.");
        }

        const token = jwt.sign({ id: data._id, adminId: data.adminId }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        data.token = token;
        data.password = "";
        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        const credentials = { token, options, data };
        return credentials;
    } else {
        throw new Error("Email not found");
    }
}