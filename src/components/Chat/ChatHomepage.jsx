import { NavLink } from 'react-router-dom';
import './ChatHomepage.scss';
import { useState, useEffect } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function ChatHomepage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/chat`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch chat messages');
        }

        const data = await response.json();
        setConversations(data);
        console.log('conversation', data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat-container">
      <h2>All Messages</h2>
      <ul>
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <li key={conversation.id}>
              {console.log('Other User ID:', conversation?.otherUser.id)}
              <NavLink to={`/messages/${conversation?.otherUser.id}`}>
                {conversation.otherUser.username} : {conversation.content}...
              </NavLink>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
