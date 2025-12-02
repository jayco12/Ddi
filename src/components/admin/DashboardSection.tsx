import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

interface DashboardSectionProps {
  accessToken: string;
  serverUrl: string;
  events: any[];
  mentees: any[];
}

export function DashboardSection({ accessToken, serverUrl, events, mentees }: DashboardSectionProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [eventAnalytics, setEventAnalytics] = useState<any>(null);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventAnalytics(selectedEventId);
    }
  }, [selectedEventId]);

  const fetchEventAnalytics = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEventAnalytics({
        attendanceCount: event.attendanceCount || 0,
        eventDate: event.date,
        eventTitle: event.title
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-gray-400">Overview of your organization's metrics</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-cyan-400 font-bold">{events.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Total Coachees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-purple-400 font-bold">{mentees.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Total Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-blue-400 font-bold">
              {events.reduce((sum, e) => sum + (e.attendanceCount || 0), 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              Avg Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-green-400 font-bold">
              {events.length > 0 ? Math.round(events.reduce((sum, e) => sum + (e.attendanceCount || 0), 0) / events.length) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Event Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="event-select" className="text-gray-300">Select Event</Label>
            <select
              id="event-select"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full mt-2 bg-gray-900/50 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="">-- Select an event --</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} - {new Date(event.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {eventAnalytics && (
            <div className="mt-6 p-6 bg-gray-900/30 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">{eventAnalytics.eventTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Event Date</p>
                  <p className="text-white text-lg font-semibold">
                    {new Date(eventAnalytics.eventDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Attendance</p>
                  <p className="text-cyan-400 text-3xl font-bold">{eventAnalytics.attendanceCount}</p>
                </div>
              </div>
            </div>
          )}

          {!selectedEventId && (
            <div className="text-center py-8 text-gray-400">
              Select an event to view detailed analytics
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
