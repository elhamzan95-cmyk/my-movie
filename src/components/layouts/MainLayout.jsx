import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#666666]">
      <main className="container mx-auto px-4 py-12">
        <div className="bg-[#666666] rounded-3xl">
          <Header />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;