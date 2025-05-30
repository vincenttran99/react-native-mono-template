import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Cấu trúc sidebar tùy chỉnh theo mẫu Obytes Starter
  docs: [
    {
      type: "doc",
      id: "overview",
      label: "Overview",
    },
    {
      type: "category",
      label: "Start Here",
      collapsible: true,
      collapsed: false,
      link: {
        type: "generated-index",
        description: "5 minutes to create your own app",
      },
      items: [
        "start-here/create-new-app",
        "start-here/customize-your-app",
        "start-here/rules-and-conventions",
        "start-here/project-structure",
        "start-here/environment-variables",
      ],
    },
    {
      type: "category",
      label: "UI Components & Theming",
      collapsible: true,
      collapsed: true,
      items: ["ui-components/ui-and-theming"],
    },
    // {
    //   type: "category",
    //   label: "Guides",
    //   collapsible: true,
    //   collapsed: true,
    //   items: ["guides/performance"],
    // },
    {
      type: "category",
      label: "Performance",
      collapsible: true,
      collapsed: true,
      link: {
        type: "generated-index",
        description: "Learn how to optimize your app",
      },
      items: [
        "performance/re-rendering-optimization",
        "performance/component-structure-optimization",
        "performance/flashlist-optimization",
        "performance/heavy-task-processing",
        "performance/animation-optimization",
        "performance/image-optimization",
        "performance/data-state-optimization",
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Recipes',
    //   collapsible: true,
    //   collapsed: true,
    //   items: [
    //     // Thêm các trang công thức ở đây
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Testing',
    //   collapsible: true,
    //   collapsed: true,
    //   items: [
    //     // Thêm các trang về testing ở đây
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'CI/CD',
    //   collapsible: true,
    //   collapsed: true,
    //   items: [
    //     // Thêm các trang về CI/CD ở đây
    //   ],
    // },
    // {
    //   type: 'doc',
    //   id: 'libraries-recommendation',
    //   label: 'Libraries Recommendation',
    // },
    // {
    //   type: 'doc',
    //   id: 'faq',
    //   label: 'FAQ',
    // },
    // {
    //   type: 'doc',
    //   id: 'changelog',
    //   label: 'CHANGELOG',
    // },
    // {
    //   type: 'doc',
    //   id: 'how-to-contribute',
    //   label: 'How to contribute?',
    // },
    // {
    //   type: 'doc',
    //   id: 'reviews',
    //   label: 'Reviews',
    // },
    // {
    //   type: 'doc',
    //   id: 'stay-updated',
    //   label: 'Stay Updated',
    // },
  ],
};

export default sidebars;
