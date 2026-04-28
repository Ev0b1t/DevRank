BEGIN TRANSACTION;

INSERT INTO candidates (name, cv_text, github_url, vacancy_description, created_at) VALUES
('Alex','dasdsa','https://github.com/Ev0b1t/DevRank',NULL,'2026-03-31 07:45:58.459969'),
('RedGDS','7 y.o','https://github.com/redgds','Frontend','2026-03-31 08:02:13.398078'),
('RedGDS2','wanna be front','https://github.com/notredgds','Frontend','2026-03-31 08:04:11.518228'),
('Alex','Wanna be frontend','https://github.com/notredgds','Frontend Developer','2026-03-31 08:27:25.839948'),
('Cartnixx','I want to be a good React developer. My stack is React, TS, Tanstack Query, Zustand. UI: TailwindCSS, Framer Motion, Shadcn','https://github.com/Cartnix','Frontend/ React developer (Junior)','2026-03-31 08:31:48.028933'),
('Cartnix','My stack: React, TS, Zustand, Tanstack Query. I wanna be a junior react developer','https://github.com/Cartnix','Frontend developer','2026-03-31 08:35:37.076171'),
('Alex Smagin','I want to be a real android developer. I''ve finished a CS courses and University. Stack python, java','https://github.com/notredgds','Android Developer','2026-03-31 08:39:13.285139'),
('Alexey Sorokin','Alexey Sorokin — Frontend Developer, 2 years of experience.\n\nSkills: React, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, REST API, Git, Vite, Zustand.\n\nExperience:\n- Pet projects: Built several web applications using React + TypeScript, integrated external APIs, deployed on Vercel.\n- Freelance (2023–2024): Developed landing pages and SPAs for small businesses.\n\nEducation: Self-taught, actively learning through projects и open source contributions.\n\nGitHub: Multiple public repos with React/TS projects.','https://github.com/Cartnix','Looking for a Middle Frontend Developer. Requirements: React, TypeScript, REST API integration, Git. Nice to have: Next.js, Tailwind CSS, state management (Redux/Zustand), unit testing.','2026-04-26 08:18:26.237956');

INSERT INTO analysis (candidate_id, cv_quality_score, trust_score, code_quality_score, activity_score, vacancy_match_score, final_score, summary, raw_llm_response, created_at) VALUES
(1,55.0,45.0,20.0,20.0,70.0,49.0,'Heuristic fallback CV analysis used because external LLM is unavailable.','{"cv": {"skills": [], "level": "Middle", "cv_quality_score": 55, "trust_score": 45, "vacancy_match_score": 70, "risks": [], "summary": "Heuristic fallback CV analysis used because external LLM is unavailable."}, "github": {"code_quality_score": 20, "activity_score": 20, "complexity_score": 15, "tech_stack": [], "summary": "No public repositories found."}}','2026-03-31 07:45:59.074041'),
(2,55.0,45.0,20.0,20.0,60.0,45.0,'Heuristic fallback CV analysis used because external LLM is unavailable.','{"cv": {"skills": [], "level": "Middle", "cv_quality_score": 55, "trust_score": 45, "vacancy_match_score": 60, "risks": [], "summary": "Heuristic fallback CV analysis used because external LLM is unavailable."}, "github": {"code_quality_score": 20, "activity_score": 20, "complexity_score": 15, "tech_stack": [], "summary": "No public repositories found."}}','2026-03-31 08:02:13.991758');

COMMIT;