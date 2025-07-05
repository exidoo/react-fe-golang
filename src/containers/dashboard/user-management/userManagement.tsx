// columns.ts
import { columns } from './columns';

// Hooks
import { useUsers } from '@/hooks/user-management/useUser';
import { useUserCreate } from '@/hooks/user-management/useUserCreate';
import { useUserUpdate } from '@/hooks/user-management/useUserUpdate';
import { useUserDelete } from '@/hooks/user-management/useUserDelete';
import type { User } from '@/hooks/user-management/useUserById';

// Components
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogUser } from '@/components/reusable/dialog/dialogUser';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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
  const [openModalAdd, setOpenModalAdd] = useState(false);
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

        setOpenModalAdd(false);
        setFormData({ name: '', username: '', email: '', password: '' });
        setErrors({ name: '', username: '', email: '', password: '' });
      },
    });
  };

  const handleCancel = () => {
    setOpenModalAdd(false);
    setFormData({ name: '', username: '', email: '', password: '' });
    setErrors({ name: '', username: '', email: '', password: '' });
  };

  //  =========== Function Edit ==============
  const updateUser = useUserUpdate();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenEdit = (user: User) => {
    setSelectedUserId(user.id);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      password: '', // kosongkan, hanya isi jika mau ubah
    });
    setOpenModalEdit(true);
  };

  const handleUpdate = () => {
    if (!selectedUserId) return;

    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      username: formData.username ? '' : 'Username is required',
      email: formData.email ? '' : 'Email is required',
      password: '', // opsional
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => err !== '');
    if (hasError) return;

    updateUser.mutate(
      { id: selectedUserId, data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          setOpenModalEdit(false);
          setFormData({ name: '', username: '', email: '', password: '' });
          setSelectedUserId(null);
          setErrors({ name: '', username: '', email: '', password: '' });
        },
      }
    );
  };

  //  =========== Function Delete ==============

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserDelete, setSelectedUserDelete] = useState<User | null>(null);

  const deleteUser = useUserDelete();

  const handleDeleteConfirm = (user: User) => {
    setSelectedUserDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (!selectedUserDelete) return;

    deleteUser.mutate(selectedUserDelete.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setOpenDeleteDialog(false);
        setSelectedUserDelete(null);
      },
    });
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
        <Button variant="default" onClick={() => setOpenModalAdd(true)}>
          Add User
        </Button>
        <DialogUser open={openModalAdd} mode="add" onOpenChange={setOpenModalAdd} onSubmit={handleSubmit} onCancel={handleCancel} isPending={createUser.isPending} formData={formData} errors={errors} onChange={handleChange} />
      </div>

      {/* Button Edit User & Modal */}
      <DialogUser
        open={openModalEdit}
        mode="edit"
        onOpenChange={setOpenModalEdit}
        onSubmit={handleUpdate}
        onCancel={() => setOpenModalEdit(false)}
        isPending={updateUser.isPending}
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus User</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin menghapus user <strong>{selectedUserDelete?.name}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteUser.isPending}>
              {deleteUser.isPending ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UserTable columns={columns(handleOpenEdit, handleDeleteConfirm)} data={data ?? []} />
    </div>
  );
};

export default UserManagement;
