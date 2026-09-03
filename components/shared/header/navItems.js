export const navItems = [
  {
    label: "হোম",
    path: "/",
  },
  {
    label: "প্রতিষ্ঠান পরিচিতি",
    path: "/about",
  },
  {
    label: "একাডেমিক তথ্য",
    path: "#",
    children: [
      {
        label: "শ্রেণি ও  শিক্ষার্থী",
        path: "/academic/students-list",
      },
      {
        label: "ক্লাস রুটিন",
        path: "/academic/class-routines",
      },
      // {
      //   label: "সাপ্তাহিক/বার্ষিক পাঠ্যসূচী",
      //   path: "/academic/syllabus",
      // },
      {
        label: "শিক্ষক-শিক্ষিকার তালিকা",
        path: "/academic/teacher",
      },
      { label: "ব্যবস্থাপনা কমিটি", path: "/academic/committee" },
    ],
  },
  {
    label: "ফলাফল",
    path: "#",
    children: [
      { label: "একক ফলাফল", path: "/results/single" },
      { label: "সেকশন ফলাফল", path: "/results/section" },
    ],
  },
  {
    label: "গ্যালারি",
    path: "/gallery",
  },
  {
    label: "যোগাযোগ",
    path: "/contact",
  },
  {
    label: "অনলাইন সেবা",
    path: "/online-services",
  },
  {
    label: "লগইন",
    path: "#",
    children: [
      {
        label: "Software Login",
        path: "https://campusmaster.digital/login",
        openInNewTab: true,
      },
      {
        label: "School Login",
        path: "https://cmsadmin.campusmaster.digital/signin",
        openInNewTab: true,
      },
    ],
  },
];
