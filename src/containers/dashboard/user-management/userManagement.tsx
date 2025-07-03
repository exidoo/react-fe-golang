// columns.ts
import { columns } from './columns';

// Hooks
import { useUsers } from '@/hooks/user-management/useUser';
import { useUserCreate } from '@/hooks/user-management/useUserCreate';

// Components
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Data Table
import { UserTable } from './userTable';

// React Tools
import { useState } from 'react';

// React Query
import { useQueryClient } from '@tanstack/react-query';

const UserManagement = () => {
  // Get data user
  const { data, isLoading, isError, error } = useUsers();

  // Query Client
  const queryClient = useQueryClient();

  // Add data user
  const createUser = useUserCreate();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  // Untuk menampung data nya sementara
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      username: formData.username ? '' : 'Username is required',
      email: formData.email ? '' : 'Email is required',
      password: formData.password ? '' : 'Password is required',
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== '');
    if (hasError) return;

    createUser.mutate(formData, {
      onSuccess: () => {
        // ✅ Refresh data users
        queryClient.invalidateQueries({ queryKey: ['users'] });

        setOpen(false);
        setFormData({ name: '', username: '', email: '', password: '' });
        setErrors({ name: '', username: '', email: '', password: '' });
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({ name: '', username: '', email: '', password: '' });
    setErrors({ name: '', username: '', email: '', password: '' });
  };

  // Handle load data user
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Terjadi Kesalahan</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      {/* Button Add User & Modal */}
      <div className="flex justify-end mb-2 ">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="cursor-pointer">
            <Button variant="default">Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label className="mb-2">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label className="mb-2">Username</Label>
                <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
              </div>
              <div>
                <Label className="mb-2">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label className="mb-2">Password</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={createUser.isPending}>
                {createUser.isPending ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <UserTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default UserManagement;
