import { Route, Routes, Navigate } from 'react-router-dom';
import GuideSideBar from './components/GuideSideBar.jsx';
import GuidePage from './components/GuidePage.jsx';
import './Guide.css';
import { useDoc } from '@/data/useDocs.jsx';

const Guide = () => {
  const guideDoc = useDoc('guide');
  const pages = guideDoc?.pages || [];

  return (
    <div className="guide">
      <GuideSideBar pages={pages} />
      <Routes>
        {pages.map((page, index) => (
          <Route
            key={index}
            path={`/${page.pageName.toLowerCase().replace(/\s+/g, '-')}`}
            element={<GuidePage content={page.pageContent} edit={false} />}
          />
        ))}
        <Route path="/" element={<Navigate to="introduction" />} />
      </Routes>
    </div>
  );
};

export default Guide;
// pages[1] &&
// `/ ${pages[1].pageName.toLowerCase().replace(/\s+/g, "-")}`
