import './SingleMessagePage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function SingleMessagePage() {
  const receiverId = useParams();
  const actualReceiverId = receiverId.receiverId || receiverId;
  console.log('receiverId:', actualReceiverId);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(
          `http://localhost:3000/chat/${actualReceiverId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        const { messages, loggedUserId } = data;
        console.log(data);
        setFetchedMessages(messages);
        setLoggedUser(loggedUserId);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [actualReceiverId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log('Receiver ID:', receiverId);
    event.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(
          `http://localhost:3000/chat/message/room/${actualReceiverId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              content: inputValue,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const responseData = await response.json();
        window.location.reload();
        // Update state with the new message
        setFetchedMessages([...fetchedMessages, responseData.data]);

        // Clear the input field
        setInputValue('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };
  return (
    <>
      <NavLink to="/messages" className="return-button">
        Return to all messages
      </NavLink>
      <div className="single-message-container">
        {fetchedMessages.length === 0 ? (
          <p>Start your conversation with the seller</p>
        ) : (
          <ul id="messages">
            {fetchedMessages.map((message) => (
              <li
                key={message.id}
                className={
                  message.sender.id === loggedUser
                    ? 'message-right'
                    : 'message-left'
                }
              >
                <strong>{message.sender.username}:</strong> {message.content}
              </li>
            ))}
          </ul>
        )}
        <form id="form" onSubmit={handleSubmit}>
          <input
            id="input"
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}
