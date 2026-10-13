import React, { useState } from 'react';
import { Search, BookOpen, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PublicPage, SectionHeading, ChannelCard, Cards } from './PublicContent';
export const PublicCourses: React.FC = () => {
 const { courses, navigateWithParam } = useApp(); const [query, setQuery] = useState('');
 const available = courses.filter(c => c.published && c.ownerId && c.labId === 'ai-foundations');
 const matching = available.filter(c => `${c.title} ${c.shortDesc} ${c.instructor.name}`.toLowerCase().includes(query.toLowerCase()));
 return <PublicPage eyebrow="Learning at CCL" title="Big possibilities. Start with the basics." intro="Find your footing with AI Foundations. Learn to give clear instructions, assess the results, and bring AI into creative work with confidence.">
  <section><SectionHeading eyebrow="Our foundation focus" title="Better questions. Better creative decisions." text="These are the skills at the heart of our starting lab. Published course pages describe their specific lessons and access requirements." /><Cards items={[
   { title: 'Understand the tool', text: 'Get familiar with how AI responds, where it helps, and why its answers still need your judgment.' },
   { title: 'Write a useful prompt', text: 'Describe your audience, goal, and context. Learn to turn an unclear request into a clear creative brief.' },
   { title: 'Review what you make', text: 'Check facts and Scripture, refine the language, and consider accuracy and permissions before publishing.' }
  ]} /></section>
  <section><SectionHeading eyebrow="Course catalogue" title="Explore published learning." /><label className="ccl-search"><Search size={19} /><input aria-label="Search courses" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by topic or instructor" /></label>
  {matching.length ? <div className="ccl-card-grid">{matching.map(course => <article key={course.id} className="ccl-course-card"><img src={course.thumbnail} alt="" loading="lazy" /><div><p className="ccl-eyebrow">AI Foundations · {course.difficulty}</p><h3>{course.title}</h3><p>{course.shortDesc}</p><span className="ccl-small-note">{course.lessonCount} lessons · {course.durationMinutes} minutes</span><button className="ccl-text-link" onClick={() => navigateWithParam('course_detail', course.id)}>View course details<ArrowUpRight size={18} /></button></div></article>)}</div> : <div className="ccl-catalog-empty" role="status"><span className="ccl-icon-box"><BookOpen size={26} /></span><div><h3>{query ? 'No course matches your search.' : 'The next chapter is taking shape.'}</h3><p>{query ? 'Try a different topic or clear your search.' : 'Instructor-published courses will appear here as they are ready. In the meantime, explore the free AI Bible and creative resources in our channel.'}</p></div></div>}
  </section><ChannelCard />
 </PublicPage>;
};
