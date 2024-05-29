import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Message {
    id: number;
    created_date: Date;
    currentTime: string;
    likes: number;
    message: string;
    status: boolean;
    userId: number;
}

interface AddingMessage {
    userId: number;
    message: string;
    messageId: number | null;
}

function useMessage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getAllMessages = async () => {
        setIsLoading(true);
        await axios.get("http://localhost:8080/WCSB3/api/message")
            .then(response => {
                setMessages(response.data.data as Message[]);
            }).catch(error => {
                console.log("Error fetching messages: ", error);
            }).finally(() => {
                setIsLoading(false);
            })
    };

    const addMessage = async (inputData: AddingMessage) => {
        try {
            const response = await axios.post("http://localhost:8080/WCSB3/api/message/create", {
                userId: inputData.userId,
                message: inputData.message,
                messageId: inputData.messageId || 0
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setMessages((prevMessages) => [...prevMessages, response.data.data as Message]);
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    

    const likeMessage = async (messageId: number, userId: number) => {
        try {
            // Add your logic to like a message here
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        getAllMessages();
    }, []);

    return { messages, isLoading, getAllMessages, addMessage, likeMessage, setMessages };
}

export default useMessage;
