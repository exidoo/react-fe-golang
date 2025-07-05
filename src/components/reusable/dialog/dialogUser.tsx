// components/DialogAddEditUser.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FC, ChangeEvent } from 'react';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  onOpenChange: (value: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isPending: boolean;
  formData: {
    name: string;
    username: string;
    email: string;
    password: string;
  };
  errors: {
    name: string;
    username: string;
    email: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DialogUser: FC<Props> = ({ open, mode, onOpenChange, onSubmit, onCancel, isPending, formData, errors, onChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add User Baru' : 'Edit User'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label className="mb-2">Name</Label>
            <Input name="name" value={formData.name} onChange={onChange} />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label className="mb-2">Username</Label>
            <Input name="username" value={formData.username} onChange={onChange} />
            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
          </div>
          <div>
            <Label className="mb-2">Email</Label>
            <Input name="email" value={formData.email} onChange={onChange} />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label className="mb-2">{mode === 'edit' ? 'Password (opsional)' : 'Password'}</Label>
            <Input name="password" value={formData.password} onChange={onChange} type="password" />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onCancel} className=" cursor-pointer">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending} className=" cursor-pointer">
            {isPending ? 'Saving...' : mode === 'add' ? 'Save' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
