DO $$
DECLARE
  -- ============== EXPANDED REAL-WORLD REFERENCE DATA ==============

  -- 1. COUNTRIES (Now includes Bangladesh)
  country_names text[] := ARRAY[
    -- Americas
    'United States', 'Canada', 'Brazil', 'Mexico', 'Argentina',
    -- Europe
    'United Kingdom', 'Germany', 'France', 'Switzerland', 'Netherlands',
    -- Asia
    'Bangladesh', 'Japan', 'China', 'South Korea', 'Singapore', 'India',
    -- Oceania & Africa
    'Australia', 'New Zealand', 'South Africa', 'Egypt', 'Nigeria'
  ];

  -- 2. UNIVERSITIES (Mapped per country, with a detailed list for Bangladesh)
  -- Sourced from University Grants Commission (UGC) of Bangladesh, QS Rankings, and other reputable sources.
  universities_map jsonb := '{
    "United States": ["Massachusetts Institute of Technology (MIT)", "Harvard University", "Stanford University", "University of California, Berkeley (UCB)", "University of Chicago", "Yale University", "Columbia University"],
    "Canada": ["University of Toronto", "McGill University", "University of British Columbia", "University of Alberta", "McMaster University", "University of Waterloo"],
    "Brazil": ["Universidade de São Paulo", "Universidade Estadual de Campinas (Unicamp)", "Universidade Federal do Rio de Janeiro", "Universidade Estadual Paulista (UNESP)"],
    "Mexico": ["Universidad Nacional Autónoma de México (UNAM)", "Tecnológico de Monterrey", "Universidad Panamericana (UP)", "Universidad Autónoma Metropolitana (UAM)"],
    "Argentina": ["Universidad de Buenos Aires (UBA)", "Pontificia Universidad Católica Argentina", "Universidad Austral", "Universidad Nacional de La Plata"],
    "United Kingdom": ["University of Oxford", "University of Cambridge", "Imperial College London", "UCL (University College London)", "The University of Edinburgh", "King''s College London"],
    "Germany": ["Technical University of Munich", "Ludwig-Maximilians-Universität München", "Heidelberg University", "Freie Universitaet Berlin", "RWTH Aachen University"],
    "France": ["Université PSL", "Institut Polytechnique de Paris", "Sorbonne University", "Université Paris-Saclay", "École Normale Supérieure de Lyon"],
    "Switzerland": ["ETH Zurich", "EPFL", "University of Zurich", "University of Geneva", "University of Bern"],
    "Netherlands": ["Delft University of Technology", "University of Amsterdam", "Wageningen University & Research", "Utrecht University"],
    "Bangladesh": [
        "University of Dhaka",
        "Bangladesh University of Engineering and Technology (BUET)",
        "Jahangirnagar University",
        "University of Chittagong",
        "University of Rajshahi",
        "Shahjalal University of Science and Technology (SUST)",
        "Khulna University of Engineering & Technology (KUET)",
        "Rajshahi University of Engineering & Technology (RUET)",
        "Chittagong University of Engineering & Technology (CUET)",
        "Dhaka University of Engineering & Technology (DUET)",
        "Islamic University of Technology (IUT)",
        "Bangladesh Agricultural University",
        "Sher-e-Bangla Agricultural University",
        "Bangabandhu Sheikh Mujibur Rahman Agricultural University",
        "North South University",
        "BRAC University",
        "Independent University, Bangladesh (IUB)",
        "American International University-Bangladesh (AIUB)",
        "East West University",
        "Ahsanullah University of Science and Technology",
        "United International University (UIU)",
        "Daffodil International University"
    ],
    "Japan": ["The University of Tokyo", "Kyoto University", "Tokyo Institute of Technology", "Osaka University", "Tohoku University"],
    "China": ["Peking University", "Tsinghua University", "Fudan University", "Shanghai Jiao Tong University", "Zhejiang University"],
    "South Korea": ["Seoul National University", "KAIST", "Pohang University of Science and Technology (POSTECH)", "Yonsei University"],
    "Singapore": ["National University of Singapore (NUS)", "Nanyang Technological University, Singapore (NTU)"],
    "India": ["Indian Institute of Technology Bombay (IITB)", "Indian Institute of Technology Delhi (IITD)", "Indian Institute of Science (IISc)", "University of Delhi", "Indian Institute of Technology Madras (IITM)"],
    "Australia": ["The University of Melbourne", "The University of Sydney", "Monash University", "Australian National University", "The University of Queensland"],
    "New Zealand": ["The University of Auckland", "University of Otago", "Victoria University of Wellington", "University of Canterbury"],
    "South Africa": ["University of Cape Town", "University of the Witwatersrand", "Stellenbosch University", "University of Johannesburg", "University of Pretoria"],
    "Egypt": ["Cairo University", "The American University in Cairo", "Ain Shams University", "Alexandria University"],
    "Nigeria": ["University of Ibadan", "University of Lagos", "Covenant University", "Ahmadu Bello University"]
  }';

  -- 3. CLUBS (Expanded pool for variety)
  club_names text[] := ARRAY[
    'AI & Machine Learning Club', 'Acoustic Music Society', 'Aerospace Engineering Society', 'Animation and VFX Club', 'Anthropology Society',
    'Applied Mathematics Society', 'Art History Circle', 'Astronomy Club', 'Biotechnology Forum', 'Blockchain & Crypto Club',
    'Board Games Guild', 'Business Analytics Club', 'Chemistry Collective', 'Chess Club', 'Classical Music Ensemble',
    'Coding & Competitive Programming', 'Consulting Club', 'Creative Writing Workshop', 'Culinary Arts Club', 'Cycling Club',
    'Data Science Group', 'Debate Union', 'Drama & Theatre Society', 'Economics Discussion Group', 'Engineers Without Borders',
    'Entrepreneurship Cell', 'Environmental Action Committee', 'Film Production Society', 'Finance & Investment Club', 'Foreign Language Exchange',
    'Gaming & eSports Guild', 'Graphic Design Hub', 'Hiking and Outdoors Club', 'History Society', 'Improv Comedy Troupe',
    'International Students Association', 'Jazz Performance Group', 'Journalism & Media Club', 'Law & Politics Society', 'Literary Review Magazine',
    'Marine Biology Society', 'Marketing & Advertising Club', 'Model United Nations', 'Neuroscience Society', 'Photography Club',
    'Physics Student Association', 'Psychology Students Union', 'Robotics Society', 'Sports & Fitness Club', 'Volunteering & Outreach Network'
  ];

  -- 4. DYNAMIC CONTENT TEMPLATES
  club_descriptions text[] := ARRAY[
    'The heart of {club} on campus. We host workshops, speaker sessions, and social events. All skill levels welcome!',
    'A community for students passionate about {club}. Join us to learn, collaborate on projects, and connect with peers and professionals.',
    'Welcome to the {club}! We explore the latest trends and fundamentals through engaging activities. Check our page for upcoming events!',
    'Whether you''re a beginner or an expert, the {club} is your place to be. We are dedicated to fostering a vibrant community at {uni}.',
    'Join the {club} to meet like-minded people, develop new skills, and have a great time. We are one of the most active clubs at {uni}!'
  ];
  post_contents text[] := ARRAY[
    'Big welcome to all our new and returning members! We''re so excited for the semester ahead. Our first GBM is next Tuesday at 6 PM in Room 402. See you there!',
    'Don''t forget to sign up for our annual flagship event! We have industry leaders, amazing workshops, and networking opportunities. Link in bio to register!',
    'Member spotlight! Meet Sarah, our club secretary. She''s a third-year student passionate about our field and has been instrumental in our success. Say hi!',
    'We''re now accepting applications for our executive board! This is a fantastic opportunity to gain leadership experience. Apply by October 15th.',
    'What a fantastic turnout at our workshop yesterday! Thank you to everyone who came and participated. Here are a few snapshots from the event. #studentlife #{tag}',
    'Mid-term stress getting to you? Join our relaxing social event this Friday! We''ll have snacks, games, and good company to help you unwind.'
  ];
  comment_contents text[] := ARRAY[
    'This looks amazing! Can''t wait!', 'So excited for this semester!', 'Thanks for organizing!', 'Will there be food?',
    'Already registered! Looking forward to it.', 'Is this event beginner-friendly?', 'Great initiative!', 'So proud of this club!'
  ];

  -- 5. USER NAMES
  fnames text[] := ARRAY['Alex','Sam','Jordan','Taylor','Casey','Jamie','Riley','Avery','Morgan','Cameron','Olivia','Liam','Emma','Noah','Sophia','Ethan','Isabella','Aiden','Mia','Lucas'];
  lnames text[] := ARRAY['Smith','Johnson','Williams','Brown','Jones','Miller','Davis','Garcia','Rodriguez','Wilson','Martinez','Anderson','Taylor','Thomas','Hernandez','Moore','Martin','Jackson'];

  -- ============== CONFIG & WORKING VARIABLES ==============
  clubs_per_university     int := 5;
  students_per_university  int := 100;
  members_per_club         int := 30;
  apps_per_club            int := 8;
  posts_per_club           int := 4;
  comments_per_post        int := 3;
  likes_per_post           int := 15;

  v_country text;
  v_uni_list text[];
  v_country_id integer;
  v_uni_name text;
  v_uni_id uuid;
  v_uni_admin_id uuid;
  v_uni_domain text;
  u_idx int := 0;
  c_idx int := 0;
  v_first text; v_last text; v_email text; v_pwd text;
  v_student_ids uuid[]; v_student_id uuid;
  v_club_admin_id uuid; v_club_id uuid; v_club_name text;
  cj int; v_club_member_ids uuid[]; v_start_idx int;
  s int; p int; k int; m int; a int;
  v_post_id uuid; v_app_id uuid; v_status text; v_processed_ts timestamptz;
BEGIN
  FOREACH v_country IN ARRAY country_names LOOP
    -- Get the list of universities for the current country from the JSONB map
    SELECT array_agg(value) INTO v_uni_list FROM jsonb_array_elements_text(universities_map -> v_country);
    IF v_uni_list IS NULL THEN CONTINUE; END IF;

    INSERT INTO Country (name) VALUES (v_country) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_country_id;

    FOREACH v_uni_name IN ARRAY v_uni_list LOOP
      u_idx := u_idx + 1;
      INSERT INTO University (name, country_id) VALUES (v_uni_name, v_country_id) ON CONFLICT (name, country_id) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_uni_id;
      v_uni_domain := 'u' || lpad(u_idx::text, 4, '0') || '.edu';

      -- University Admin
      v_first := fnames[1+(u_idx%array_length(fnames,1))]; v_last := lnames[1+(u_idx%array_length(lnames,1))];
      v_email := 'admin.' || u_idx || '@' || v_uni_domain; v_pwd := 'password123';
      INSERT INTO "User" (email, password_hash, first_name, last_name, role, university_id, bio)
      VALUES (v_email, v_pwd, v_first, v_last, 'UNIVERSITY_ADMIN', v_uni_id, 'University administrator for ' || v_uni_name)
      ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email RETURNING id INTO v_uni_admin_id;

      -- Students
      v_student_ids := ARRAY[]::uuid[];
      FOR s IN 1..students_per_university LOOP
        v_first := fnames[1+((s+u_idx)%array_length(fnames,1))]; v_last := lnames[1+((s+u_idx)%array_length(lnames,1))];
        v_email := lower(v_first) || '.' || lower(v_last) || s || '@student.' || v_uni_domain; v_pwd := 'password123';
        INSERT INTO "User" (email, password_hash, first_name, last_name, role, university_id)
        VALUES (v_email, v_pwd, v_first, v_last, 'STUDENT', v_uni_id)
        ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email RETURNING id INTO v_student_id;
        v_student_ids := array_append(v_student_ids, v_student_id);
      END LOOP;

      -- Clubs, Members, Posts, etc.
      FOR cj IN 1..clubs_per_university LOOP
        c_idx := c_idx + 1;
        v_club_name := club_names[1 + (c_idx % array_length(club_names, 1))];

        -- Club Admin
        v_first := fnames[1+((cj+u_idx*2)%array_length(fnames,1))]; v_last := lnames[1+((cj+u_idx*2)%array_length(lnames,1))];
        v_email := 'ca' || u_idx || '_' || cj || '@' || v_uni_domain; v_pwd := 'password123';
        INSERT INTO "User" (email, password_hash, first_name, last_name, role, university_id, bio)
        VALUES (v_email, v_pwd, v_first, v_last, 'CLUB_ADMIN', v_uni_id, 'Admin for the ' || v_club_name)
        ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email RETURNING id INTO v_club_admin_id;

        -- Club
        INSERT INTO Club (name, description, university_id, admin_id, logo_url, banner_url)
        VALUES (v_club_name,
          replace(replace(club_descriptions[1 + (c_idx % array_length(club_descriptions, 1))], '{club}', v_club_name), '{uni}', v_uni_name),
          v_uni_id, v_club_admin_id,
          'https://picsum.photos/seed/logo-' || c_idx || '/200',
          'https://picsum.photos/seed/banner-' || c_idx || '/1200/300')
        ON CONFLICT (name, university_id) DO UPDATE SET description=EXCLUDED.description RETURNING id INTO v_club_id;

        -- Club Members
        v_club_member_ids := ARRAY[]::uuid[];
        v_start_idx := ((cj - 1) * members_per_club) % students_per_university + 1;
        FOR m IN 0..(members_per_club - 1) LOOP
          v_student_id := v_student_ids[((v_start_idx - 1 + m) % students_per_university) + 1];
          INSERT INTO ClubMember (club_id, user_id) VALUES (v_club_id, v_student_id) ON CONFLICT DO NOTHING;
          INSERT INTO Follow (club_id, user_id) VALUES (v_club_id, v_student_id) ON CONFLICT DO NOTHING;
          v_club_member_ids := array_append(v_club_member_ids, v_student_id);
        END LOOP;

        -- Club Posts
        FOR p IN 1..posts_per_club LOOP
          INSERT INTO Post (club_id, author_id, content)
          VALUES (v_club_id,
            CASE WHEN (p % 3) = 1 THEN v_club_admin_id ELSE v_club_member_ids[1+(p%array_length(v_club_member_ids,1))] END,
            replace(post_contents[1 + ((c_idx + p) % array_length(post_contents, 1))], '{tag}', lower(regexp_replace(v_club_name, '[^a-zA-Z0-9]', '', 'g')))
          ) RETURNING id INTO v_post_id;

          -- Comments & Likes
          FOR k IN 1..likes_per_post LOOP
            IF k <= comments_per_post THEN
              INSERT INTO PostComment (post_id, author_id, content)
              VALUES (v_post_id, v_club_member_ids[1+((p*k)%array_length(v_club_member_ids,1))], comment_contents[1+((c_idx+p+k)%array_length(comment_contents,1))]);
            END IF;
            INSERT INTO PostLikes (post_id, user_id) VALUES (v_post_id, v_club_member_ids[1+((p*k*2)%array_length(v_club_member_ids,1))]) ON CONFLICT DO NOTHING;
          END LOOP;
        END LOOP;

      END LOOP; -- clubs
    END LOOP; -- universities
  END LOOP; -- countries
END $$ LANGUAGE plpgsql;