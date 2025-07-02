// columns.ts
import { columns } from './columns';

// Hooks
import { useUsers } from '@/hooks/user-management/useUser';

// Components
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UserTable } from './userTable';

const UserManagement = () => {
  const { data, isLoading, isError, error } = useUsers();

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
      <UserTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default UserManagement;
