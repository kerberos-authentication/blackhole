// src/Router.jsx
import { Route, Routes, Navigate } from "react-router";
import Navbar from './components/Navbar/Navbar.jsx';
import StarsCanvas from './components/main/StarBackground.jsx';

import { Suspense, lazy } from 'react';
import { pageModules } from './routes.js';

const Layout = lazy(() => import('./app/Layout.jsx'));

const Spinner = () => (
  <div className="flex justify-center items-center p-4">
    <svg
      className="animate-spin h-5 w-5 text-indigo-500"
       fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

const routes = Object.entries(pageModules)
  .flatMap(([filePath, importer]) => {
    const match = filePath.match(/\.\/app\/([^/]+)\/page\.jsx$/);
    if (!match) return [];
    const folderName = match[1].toLowerCase();
    const SupportedLanguages = ['en', 'fa'];
    const paths = SupportedLanguages.map(
      (lang) => folderName === 'home' ? `/${lang}` : `/${lang}/${folderName}`
    );
    // Add unprefixed version (optional)
if (folderName !== 'home') {
  paths.push(`/${folderName}`);
}
    const Component = lazy(importer);
    return paths.map((path) => ({
      path,
      element: (
        <Suspense fallback={<div className="translate-y-1/2"><Spinner /></div>}>
          <Layout>
            <Component />
          </Layout>
        </Suspense>
      ),
    }));
  });

export function Router({user}) {
  return (<>     <Navbar user={user}/>
          <StarsCanvas />
    <Routes>
  {routes.map(({ path, element }, i) => (
    <Route key={i} path={path} element={element} />
  ))}

  <Route path="/" element={<Navigate to="/en" replace />} />
  <Route path="*" element={<div className="text-white p-4">404 Not Found</div>} />
</Routes>
    </>
           );
          }


 /* async function renderRoute(routePath) {  
        try {
            const layoutModule = await import(`./app/Layout.jsx`);
            const Page = (await import(`./app/${routePath}/page.jsx`)).default;
            const Layout = layoutModule.default;

            return (
               <div className='relative h-full w-full overflow-x-hidden'>
                
                 <Layout>
            
             <Navbar />          
                    <StarsCanvas/>
                 
                    <Page />
                    
                </Layout>
               </div>
            );
        } catch (error) {
             return <div>Page not found</div>;
        }
    }

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={renderRoute("home")} />
     <Route path="/:lang" element={renderRoute("home")} />
                         
        //                 // Redirect root to default language }
                        
       //                  <Route path="/about" element={renderRoute('about')} />
     //      <Route path="*" element={<NotFound />} />
 //   </Routes>
//  );
// }

export default Router;
 */