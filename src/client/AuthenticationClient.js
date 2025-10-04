import {
  setWithExpiry,
  getWithExpiry,
} from "../util/LocalStorageUtil";
import { WEATHER_API_URL, CLIENT_ID } from "../config/config.js";

export async function getToken() {
   let token = '';
    try {
        token = getWithExpiry("jwt_auth");
                if (!token) {
                  const res = await fetch(`${WEATHER_API_URL}/v1/auth/token`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      clientId: CLIENT_ID,
                    }),
                  });
        
                  if (!res.ok) {
                    throw new Error("Unauthorised access...");
                  }
                  const data = await res.json();
                  token = data.data.token;
                  setWithExpiry("jwt_auth", token, data.data.expiresIn);
                }
    } catch (e) {
       throw new Error("Unauthorised access...");
    }

    return token;
}