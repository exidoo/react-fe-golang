// Containers
import Header from '@/containers/global/header';
import Sidebar from '@/containers/global/sidebar';
import UserManagement from '@/containers/dashboard/user-management/userManagement';

const UserManagementPage = () => {
  return (
    <main className="w-full flex min-h-screen">
      {/* Sidebar di sebelah kiri */}
      <div className="">
        <Sidebar />
      </div>

      {/* Content di sebelah kanan */}
      <section className="flex-1 flex flex-col  mx-auto">
        <Header />
        <UserManagement />
      </section>
    </main>
  );
};

export default UserManagementPage;
