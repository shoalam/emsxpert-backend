import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN ?? "15m";
const JWT_REFRESH_EXPIRES_IN: string | number =
  process.env.JWT_REFRESH_EXPIRES_IN ?? "1d";

export const formatDate = (date: Date, format: string): string => {
  // Implement date formatting logic here
  return ""; // Placeholder return
};

export function generateTokens(user: any) {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );
  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  } as jwt.SignOptions);
  return { accessToken, refreshToken };
}

export const parseJson = (jsonString: string): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Invalid JSON string");
  }
};
