import { MessageTreeNode } from 'ai-ui-components/TreeChatbot';

export const treeChatbotInitial: MessageTreeNode = {
  message: {
    query: 'What is React?',
    answer:
      'React is an open-source JavaScript library for building user interfaces or UI components. It was developed by Facebook and is maintained by Facebook and a community of individual developers and companies. It allows developers to create large web applications that can change data, without reloading the page. It is mainly used to build single-page applications.',
  },
  children: [
    {
      message: {
        query: 'Can it toast hot dogs?',
        answer: `No, React is a JavaScript library used in web development. It doesn't have physical attributes or capabilities to toast hot dogs. It is not related to cooking or kitchen appliances. It's for building user interfaces on websites.`,
      },
      children: [
        {
          message: {
            query: `What CAN toast hot dogs?`,
            answer: `You can toast hot dogs on a variety of appliances including a grill, stove, oven, toaster oven, or even over an open fire. Some specialized devices include a hot dog toaster or hot dog roller grill. Always remember, no matter how you cook them, to ensure the hot dogs are thoroughly heated and cooked to safe temperatures.`,
          },
        },
      ],
    },
    {
      message: {
        query: 'Why is it so popular?',
        answer: `React has gained popularity for a number of reasons:

1. Components: React code is made of entities called components. Components simplify the development and maintenance of complex UI features. They are reusable and can manage their own state.

2. Virtual DOM: React uses a virtual DOM that helps to organize your components in a way that follows logic and reason. The virtual DOM also makes React very fast, optimizing rendering and improving app performance.

3. Flexibility: React offers more flexibility and efficiency through its unidirectional data flow, allowing you to structure your app in the way that makes the most sense for you.

4. Community and Ecosystem: React has a large community and ecosystem, leading to better resources for learning and troubleshooting. It's also backed by Facebook, which provides a level of trust in its longevity and continued support.

5. React Native: With React Native, you can develop mobile apps that are indistinguishable from an app built using Objective-C or Java. React Native uses the same fundamental UI building blocks as regular iOS or Android apps.

6. Advanced JavaScript: React pushes you to learn JavaScript in depth and use its modern features, which can make you a better JavaScript developer.

7. Use of JSX: JSX is an HTML-like syntax that compiles down to JavaScript. It makes writing React components, handling of JavaScript's "this" keyword, and managing component state easier.`,
      },
    },
    {
      message: {
        query: `How does it work?`,
        answer: `React works by building interfaces using small parts or components. Each component manages its own state (data that influences how a component renders). The components are reusable, allowing developers to easily manage and manipulate their web applications as isolated, independent pieces.

React uses a virtual DOM (Document Object Model) to improve performance. The DOM is a representation of the webpage that JavaScript can use to change the content of a web page. However, updating the DOM directly can be slow, especially when there are heavy updates. 

Here's where Virtual DOM comes in. Whenever a change is made, React builds a new Virtual DOM and compares it with the old one. It identifies the changes (or 'differences') and then updates ONLY those changes on the actual DOM. This process, known as 'diffing', greatly enhances the performance and speed of updates, contributing to a more seamless user interface.

React also utilizes one-way data binding and an application architecture called Flux controls to update the view and control application workflow. This approach allows for improved control over the application.

In summary, React’s workflow enables developers to efficiently manage and organize their project, contributing to improved maintainability, simplicity and a smoother, faster web performance.`,
      },
    },
  ],
};
