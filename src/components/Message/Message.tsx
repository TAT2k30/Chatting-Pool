import React, { useEffect, useState } from 'react';
import useMessage from '../../hook/useMessage';
import loadingImage from '../../assets/c7e1b7b5753737039e1bdbda578132b8.gif';
import toast, { Toaster } from 'react-hot-toast';
import useClient from '../../hook/useClient';
import styles from './Message.module.css';
import { error } from 'console';

interface MessageSending {
    userId: number;
    message: string;
    messageId: number | null;
}

const Message = () => {
    const { user, isLoggedIn } = useClient();
    const { isLoading, messages, addMessage, getAllMessages} = useMessage();
    const [showLoading, setShowLoading] = useState(true);
    const [message, setMessage] = useState<string>('');

    const notify = (message: string, type: 'success' | "error") => {
        if (type === "success") toast.success(<div style={{ color: "green" }}>{message}</div>);
        if (type === "error") toast.error(<div style={{ color: "red" }}>{message}</div>);
    };

    const handleMessaging = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleSubmitMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoggedIn() && user !== null) {
            const newMessage: MessageSending = {
                userId: user.id,
                message: message,
                messageId: null,
            };
            try {
                await addMessage(newMessage);
                notify('Message sent successfully!', "success");
                setMessage('');
            } catch (error) {
                notify('Failed to send message.', 'error');
            }
        } else {
            notify('You must be logged in to send a message.', 'error');
        }
    }

    useEffect(() => {
        const simulateLoading = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowLoading(false);
            getAllMessages();
        };
        simulateLoading();
    }, []);

    return (
        <div>
            <Toaster />
            <div className="bg-dark d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="container bg-light rounded shadow" style={{ width: '70%', height: '90%' }}>
                    <div className="p-3" style={{ height: 'calc(100% - 100px)', overflowY: 'scroll' }}>
                        {showLoading || isLoading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '90%' }}>
                                <img src={loadingImage} alt="Loading..." style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`${styles.message_box} ${message.userId === user?.id ? `${styles.message_right}` : `${styles.message_left}`}`}
                                >
                                    <div className={styles.message_content}>
                                        <h3>{message.message}</h3>
                                        <p>{message.currentTime}</p>
                                        <p>{message.userId}</p>
                                        <p>{message.likes} likes</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <form onSubmit={handleSubmitMessage} className="p-3 rounded-bottom d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleMessaging}
                        />
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Message;
