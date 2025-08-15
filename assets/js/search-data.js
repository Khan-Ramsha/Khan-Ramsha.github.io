// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of my work",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-eduresource-hub",
          title: 'EduResource Hub',
          description: "EduResourceHub is an NLP-powered platform that recommends NPTEL courses and online resources by matching uploaded syllabi with the most relevant educational content using vector similarity.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/EduResourcehub/";
            },},{id: "projects-fasalguru",
          title: 'FasalGuru',
          description: "An AI platform for farmers and agri-businesses, offering image-based crop disease detection and prevention suggestions, smart fertilizer and irrigation recommendation according to real-time weather.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Fasalguru/";
            },},{id: "projects-finetunex",
          title: 'FinetuneX',
          description: "A powerful framework to democratize LLM fine-tuning allows to choose custom training methods and interact with the fine-tuned model.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/FinetuneX/";
            },},{id: "projects-vocalscribe",
          title: 'VocalScribe',
          description: "VocalScribe is an AI-powered meeting assistant that transcribes speech in real time using Whisper, summarizes with Mistral 7B, and exports professionally formatted meeting records.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/VocalScribe/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
