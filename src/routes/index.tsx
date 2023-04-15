import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const List = lazy(() => import('@/views/List'));

const AppRoutes = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/">
          <Route index element={<List />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
