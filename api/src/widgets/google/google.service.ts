import { Injectable, InternalServerErrorException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class GoogleService {
    constructor() {}

    async getNbunreadMail(token: string): Promise<number> {
        const url = `https://www.googleapis.com/gmail/v1/users/me/messages?q=is%3Aunread`;

        try {
            const res = await axios.get(url, {
                headers: {
                    Accepte: 'application/json',
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            return res.data.resultSizeEstimate;
        } catch (error) {
            console.log(error.response);
            throw new InternalServerErrorException('Failed to get number of unread mails');
        }
    }
}

// https://www.googleapis.com/gmail/v1/users/me/messages?q=is%3Aunread&access_token={YOUR_ACCESS_TOKEN}