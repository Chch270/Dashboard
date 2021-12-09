export const jwtConstants = {
    secret: process.env.JWT_SECRET || "secret_key",
    expires_in: process.env.JWT_EXPIRES_IN || '30h',
};
