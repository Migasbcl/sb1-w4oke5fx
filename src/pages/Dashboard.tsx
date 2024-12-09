import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">
          Manage your {user?.role === 'organizer' ? 'events and teams' : 'guest lists'} from your personalized dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Active Events</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="mt-2 text-indigo-100">No active events</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Guests</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="mt-2 text-emerald-100">No guests registered</p>
        </div>

        {user?.role === 'organizer' && (
          <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Team Members</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="mt-2 text-violet-100">No team members</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all">
            <h3 className="font-medium text-gray-900">Create New Event</h3>
            <p className="text-sm text-gray-500 mt-1">Set up a new event and manage guest lists</p>
          </button>
          
          {user?.role === 'organizer' && (
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-900">Manage Team</h3>
              <p className="text-sm text-gray-500 mt-1">Add or remove team members</p>
            </button>
          )}
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all">
            <h3 className="font-medium text-gray-900">View Reports</h3>
            <p className="text-sm text-gray-500 mt-1">Check event statistics and analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
};