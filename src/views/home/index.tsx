// Containers
import Header from '@/containers/global/header';
import Sidebar from '@/containers/global/sidebar';
import ChartData from '@/containers/dashboard/home/Chart';

const Home = () => {
  return (
    <main className="w-full flex min-h-screen">
      {/* Sidebar di sebelah kiri */}
      <div className="">
        <Sidebar />
      </div>

      {/* Content di sebelah kanan */}
      <section className="flex-1 flex flex-col justify-center mx-auto">
        <Header />
        <ChartData />
      </section>
    </main>
  );
};

export default Home;
