// import FC from react
import type { FC } from 'react';

//import router
import AppRoutes from './routes';

const App: FC = () => {
  return (
    <div>
      <div className=" h-full">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
