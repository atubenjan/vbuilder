import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All Notifications');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve the user's name from local storage
    const storedUserId = localStorage.getItem('UserId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Define tags array here
  const tags = ['All Notifications', 'Unread', 'Read'];

  useEffect(() => {
    // Replace with actual user ID from context or local storage
    axios
      .get(`http://localhost:5000/notifications/${userId}`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  const handleNotificationClick = (id) => {
    axios
      .put(`http://localhost:5000/notifications/${id}`)
      .then(() => {
        const updatedNotifications = notifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, readStatus: true };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
        const notification = updatedNotifications.find(
          (notif) => notif.id === id,
        );
        setCurrentNotification(notification);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Error updating notification status:', error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredNotifications =
    selectedTag === 'All Notifications'
      ? notifications
      : notifications.filter((notification) =>
          selectedTag === 'Unread'
            ? !notification.read_status
            : notification.read_status,
        );

  return (
    <div className="w-full bg-white">
      <h2 className="pl-4 pt-4 text-xl font-semibold">All Notifications</h2>
      <div className="w-full border-b p-4 border-gray-300">
        <div className="border w-full md:w-1/2 rounded-lg border-gray-200 p-2">
          <select
            id="filter"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="divide-y divide-gray-200 border-b border-gray-200">
        {filteredNotifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-4 cursor-pointer ${notification.read_status ? 'bg-white' : 'bg-gray-100'}`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className="flex items-start">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Notification</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && currentNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-11/12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notification</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <p>{currentNotification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
