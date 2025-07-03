import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/hooks/user-management/useUser';

// UI shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log('Edit', user.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Delete', user.id)} className="text-red-500 focus:text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
