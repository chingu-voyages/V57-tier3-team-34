import { partyData } from "@/model/UserModel";
import { User } from "@prisma/client";

export const createPartyService = async (
  data: partyData
): Promise<User | undefined> => {
    try {
        /**
         * Check if party exists in the system
         */

        // const existingParty = await findUserByEmail
    }
};
