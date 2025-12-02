import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react';

interface AdminManagementSectionProps {
  accessToken: string;
}

export function AdminManagementSection({ accessToken }: AdminManagementSectionProps) {
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call createAdminAccount function
      if (typeof (window as any).createAdminAccount === 'function') {
        await (window as any).createAdminAccount(newAdminEmail, newAdminPassword, newAdminName);
        alert('Admin account created successfully!');
        setNewAdminEmail('');
        setNewAdminPassword('');
        setNewAdminName('');
      } else {
        alert('Admin creation function not available');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Error creating admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Admin Management
        </h1>
        <p className="text-gray-400">Create and manage admin accounts</p>
      </div>

      <Card className="bg-gray-800/50 border-gray-700/50 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-white">Create New Admin</CardTitle>
          <CardDescription className="text-gray-400">
            Add a new admin user with limited permissions (Blog, Gallery, Coachee Assignment only)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <Label htmlFor="admin-name" className="text-gray-300">Admin Name</Label>
              <Input
                id="admin-name"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-700 text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="admin-email" className="text-gray-300">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-700 text-white"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <Label htmlFor="admin-password" className="text-gray-300">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-700 text-white"
                placeholder="Minimum 8 characters"
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? 'Creating...' : 'Create Admin'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700/50 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-white">Admin Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Super Admin (You)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Full access to all features</li>
                <li>Create and manage admin accounts</li>
                <li>Manage events and destiny coaches</li>
                <li>View all analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Regular Admin</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Create and manage blog posts</li>
                <li>Upload and manage gallery images</li>
                <li>Assign coachees to destiny coaches</li>
                <li>Limited dashboard access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
