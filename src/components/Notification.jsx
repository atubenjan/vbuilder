import React, { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { FaHouse } from 'react-icons/fa6';

const initialNotifications = [
  {
    id: 1,
    avatar: 'https://berrydashboard.io/free/assets/user-round-QwaXuEgi.svg',
    name: 'John Doe',
    time: '2 min ago',
    message: 'It is a long established fact that a reader will be distracted',
    tags: [], // No initial tags
    tagColors: [],
  },
  {
    id: 2,
    avatar: 'https://via.placeholder.com/150',
    icon: <FaHouse />,
    title: 'Store Verification Done',
    time: '8 min ago',
    message: 'We have successfully received your request.',
    tags: [], // No initial tags
    tagColors: [],
  },
  {
    id: 3,
    avatar: 'https://via.placeholder.com/150',
    icon: <CiMail />,
    title: 'Check Your Mail',
    time: '2 min ago',
    message: "All done! Now check your inbox as you're in for a sweet treat!",
    tags: [], // No initial tags
    tagColors: [],
  },
  {
    id: 4,
    avatar: 'https://berrydashboard.io/free/assets/user-round-QwaXuEgi.svg',
    name: 'John Doe',
    time: '2 min ago',
    message: 'Uploaded two files on 21 Jan 2020',
    files: ['demo.jpg'],
    tags: [], // No initial tags
    tagColors: [],
  },
  {
    id: 5,
    avatar: 'https://berrydashboard.io/free/assets/user-round-QwaXuEgi.svg',
    name: 'John Doe',
    time: '2 min ago',
    message: 'It is a long established fact that a reader will be distracted',
    tags: [], // No initial tags
    tagColors: [],
  },
];

const tags = ['All Notifications', 'Unread', 'Read'];

const Notification = () => {
  const [notifications, setNotifications] = useState(
    initialNotifications.map((notif) => ({
      ...notif,
      tags: ['Unread', 'New'],
    })),
  );
  const [selectedTag, setSelectedTag] = useState('All Notifications');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id && notification.tags.includes('Unread')) {
        return {
          ...notification,
          tags: ['Read', 'Old'],
          tagColors: ['bg-gray-200 text-gray-800'],
        };
      }
      return notification;
    });
    setNotifications(updatedNotifications);

    const notification = updatedNotifications.find((notif) => notif.id === id);
    setCurrentNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredNotifications =
    selectedTag === 'All Notifications'
      ? notifications
      : notifications.filter((notification) =>
          notification.tags.includes(selectedTag),
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
            className={`p-4 cursor-pointer ${notification.tags.includes('Read') ? 'bg-white' : 'bg-gray-100'}`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className="flex items-start">
              <img
                src={notification.avatar}
                alt={notification.name || notification.title}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">
                    {notification.name || notification.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                {notification.tags && (
                  <div className="mt-2 flex space-x-2">
                    {notification.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${notification.tagColors[index]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {notification.buttonLabel && (
                  <button className="mt-2 bg-blue-500 text-white px-3 py-1 text-xs rounded-full">
                    {notification.buttonLabel}
                  </button>
                )}
                {notification.files && (
                  <div className="mt-2 w-fit px-4">
                    {notification.files.map((file, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 p-2 rounded-md flex items-center space-x-2"
                      >
                        <span className="text-sm font-medium">{file}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && currentNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-11/12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {currentNotification.name || currentNotification.title}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <p>{currentNotification.message}</p>
            {currentNotification.tags && (
              <div className="mt-4">
                <strong>Tags:</strong> {currentNotification.tags.join(', ')}
              </div>
            )}
            {currentNotification.files && (
              <div className="mt-4">
                <strong>Files:</strong> {currentNotification.files.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
