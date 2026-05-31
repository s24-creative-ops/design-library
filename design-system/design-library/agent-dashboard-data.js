window.designLibraryAgentDashboardData = {
  homeQuickLink: {
    label: "Agent Library",
    section: "agents",
    text: "Teaminterne Übersicht über GPT Agents, Status und Einstiegspunkte.",
  },
  section: {
    id: "agents",
    label: "Agent Library",
    items: [
      {
        id: "all-agents",
        label: "Alle Agents",
        kind: "agents",
        title: "Agent Library",
        intro:
          "Kuratiere Team-Agents an einem Ort, inklusive Status, Zielgruppen und direktem Einstieg. V1 basiert auf gepflegten Beispieldaten und noch nicht auf einem Slack-Sync.",
      },
    ],
  },
  statusMeta: {
    idea: {
      label: "Idea",
      rangeLabel: "0-20%",
      progress: 10,
    },
    prototype: {
      label: "Prototype",
      rangeLabel: "20-50%",
      progress: 35,
    },
    testing: {
      label: "Testing",
      rangeLabel: "50-80%",
      progress: 65,
    },
    live: {
      label: "Live",
      rangeLabel: "80-100%",
      progress: 100,
    },
    paused: {
      label: "Paused",
      rangeLabel: null,
      progress: null,
    },
    archived: {
      label: "Archived",
      rangeLabel: null,
      progress: null,
    },
  },
  agents: [
    {
      id: "lp-builder",
      title: "LP Builder",
      shortDescription: "Supports landing page creation based on reusable modules and templates.",
      owner: "Dominik",
      status: "live",
      targetUsers: ["HO", "B2B", "Seeker"],
      tags: ["Landing Page", "Marketing"],
      links: {
        agent: "https://chatgpt.com/g/g-69839550ac988191bd3a3838d2b00d02-landing-page-builder",
        onboarding: "https://scout24.slack.com/docs/T02B63WEX/F0A8U5M1F7T",
      },
    },
    {
      id: "email-builder",
      title: "E-Mail Builder",
      shortDescription: "Supports email creation based on reusable modules and templates.",
      owner: "Dominik",
      status: "testing",
      targetUsers: ["HO", "B2B", "Seeker"],
      tags: ["Email", "Marketing"],
      links: {
        agent: "",
        onboarding: "",
      },
    },
    {
      id: "brand-channel-agent",
      title: "Brand Channel Agent",
      shortDescription: "Helps with brand-related questions, approved assets, logos, fonts and guidance.",
      owner: "Peter",
      status: "prototype",
      targetUsers: ["Full org", "Creative Support", "Linear"],
      tags: ["Brand", "Slack", "Self-Service"],
      links: {
        agent: "",
        onboarding: "",
      },
    },
    {
      id: "creative-briefing-agent-placeholder",
      title: "Creative Briefing Agent",
      shortDescription: "Placeholder for testing how briefing-related agents appear in the dashboard.",
      owner: "Creative Studio",
      status: "idea",
      targetUsers: ["Creative Studio", "Content", "Social Media"],
      tags: ["Briefing", "Creative", "Content"],
      links: {
        agent: "",
        onboarding: "",
      },
    },
    {
      id: "image-production-agent-placeholder",
      title: "Image Production Agent",
      shortDescription: "Placeholder for testing image production and automation workflows.",
      owner: "Creative Studio",
      status: "prototype",
      targetUsers: ["Brand", "Creative Studio", "Media"],
      tags: ["Image", "Automation", "Marketing"],
      links: {
        agent: "",
        onboarding: "",
      },
    },
    {
      id: "event-asset-agent-placeholder",
      title: "Event Asset Agent",
      shortDescription: "Placeholder for testing event-related production workflows.",
      owner: "Creative Studio",
      status: "testing",
      targetUsers: ["Event", "Brand", "Social Media"],
      tags: ["Event", "Asset Production", "Marketing"],
      links: {
        agent: "",
        onboarding: "",
      },
    },
    {
      id: "loft-campaign-agent-placeholder",
      title: "Loft Campaign Agent",
      shortDescription: "Placeholder for testing LOFT campaign and ad workflows.",
      owner: "Creative Studio",
      status: "paused",
      lastKnownProgress: 63,
      targetUsers: ["Loft", "Professional", "Media"],
      tags: ["Loft", "Campaign", "Ads"],
      links: {
        agent: "",
        onboarding: "",
      },
    },
  ],
};
