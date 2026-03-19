export interface Alert {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string; // formatted "dd MMM yyyy, hh:mm a"
  updatedAt: string;
}

// Mock alerts matching backend schema
export const mockAlerts: Alert[] = [
  {
    _id: '1',
    title: 'Server Maintenance',
    message: 'The system will be under maintenance from 2 AM to 4 AM.',
    type: 'warning',
    isRead: false,
    createdAt: '15 Oct 2024, 10:30 AM',
    updatedAt: '15 Oct 2024, 10:30 AM',
  },
  {
    _id: '2',
    title: 'New User Registered',
    message: 'User John Doe has successfully registered.',
    type: 'info',
    isRead: true,
    createdAt: '14 Oct 2024, 09:15 AM',
    updatedAt: '14 Oct 2024, 09:15 AM',
  },
  {
    _id: '3',
    title: 'Payment Failed',
    message: 'Payment for subscription failed. Please update your card.',
    type: 'error',
    isRead: false,
    createdAt: '13 Oct 2024, 03:45 PM',
    updatedAt: '13 Oct 2024, 03:45 PM',
  },
  {
    _id: '4',
    title: 'System Update',
    message: 'All services updated to v2.1.0 successfully.',
    type: 'info',
    isRead: true,
    createdAt: '12 Oct 2024, 11:20 PM',
    updatedAt: '12 Oct 2024, 11:20 PM',
  },
  {
    _id: '5',
    title: 'High CPU Usage',
    message: 'Server CPU usage exceeded 90% threshold.',
    type: 'warning',
    isRead: false,
    createdAt: '11 Oct 2024, 05:10 AM',
    updatedAt: '11 Oct 2024, 05:10 AM',
  },
];
