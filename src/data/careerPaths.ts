import { CareerPath, Module, LearningMaterial, Quiz, QuizQuestion } from '../types';

export const careerPaths: CareerPath[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    description: 'Master HTML, CSS, JavaScript and modern frontend frameworks to build beautiful user interfaces',
    icon: 'Code',
    modules: [
      {
        id: 'frontend-html-css',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of web pages',
        materials: [
          {
            id: 'html-basics',
            title: 'HTML Basics',
            type: 'article',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
            duration: 30,
            description: 'Introduction to HTML structure and elements'
          },
          {
            id: 'css-selectors',
            title: 'CSS Selectors and Styling',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
            duration: 45,
            description: 'Learn how to style HTML elements with CSS'
          }
        ],
        quiz: {
          id: 'quiz-html-css',
          title: 'HTML & CSS Quiz',
          questions: [
            {
              id: 'q1',
              question: 'What does HTML stand for?',
              options: [
                'Hyper Text Markup Language',
                'High Tech Modern Language',
                'Hyper Transfer Markup Language',
                'Home Tool Markup Language'
              ],
              correctAnswer: 'Hyper Text Markup Language',
              explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for documents designed to be displayed in a web browser.'
            },
            {
              id: 'q2',
              question: 'Which CSS property is used to change the text color?',
              options: [
                'font-color',
                'text-color',
                'color',
                'text-color'
              ],
              correctAnswer: 'color',
              explanation: 'The color property is used to set the color of text in CSS.'
            }
          ],
          passingScore: 70
        },
        isLocked: false
      },
      {
        id: 'frontend-javascript',
        title: 'JavaScript Fundamentals',
        description: 'Learn programming logic and DOM manipulation',
        materials: [
          {
            id: 'js-basics',
            title: 'JavaScript Basics',
            type: 'article',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
            duration: 40,
            description: 'Introduction to JavaScript programming language'
          },
          {
            id: 'dom-manipulation',
            title: 'DOM Manipulation',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc',
            duration: 50,
            description: 'Learn how to interact with HTML elements using JavaScript'
          }
        ],
        quiz: {
          id: 'quiz-javascript',
          title: 'JavaScript Quiz',
          questions: [
            {
              id: 'q1',
              question: 'How do you declare a variable in JavaScript?',
              options: [
                'var myVar;',
                'variable myVar;',
                'v myVar;',
                'declare myVar;'
              ],
              correctAnswer: 'var myVar;',
              explanation: 'In JavaScript, you declare a variable using the var, let, or const keyword.'
            },
            {
              id: 'q2',
              question: 'Which method is used to select an HTML element by its ID?',
              options: [
                'getElementById()',
                'getElementsByClassName()',
                'getElementsByTagName()',
                'querySelectorAll()'
              ],
              correctAnswer: 'getElementById()',
              explanation: 'The getElementById() method returns the element that has the ID attribute with the specified value.'
            }
          ],
          passingScore: 70
        },
        isLocked: true
      },
      {
        id: 'frontend-react',
        title: 'React Fundamentals',
        description: 'Build dynamic user interfaces with React',
        materials: [
          {
            id: 'react-intro',
            title: 'Introduction to React',
            type: 'article',
            url: 'https://react.dev/learn',
            duration: 60,
            description: 'Official React introduction and core concepts'
          },
          {
            id: 'react-hooks',
            title: 'React Hooks',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=dpw9EHDh2bM',
            duration: 55,
            description: 'Learn how to use useState and useEffect hooks'
          }
        ],
        quiz: {
          id: 'quiz-react',
          title: 'React Quiz',
          questions: [
            {
              id: 'q1',
              question: 'What is JSX?',
              options: [
                'JavaScript XML',
                'JavaScript Extension',
                'JavaScript Syntax Extension',
                'None of the above'
              ],
              correctAnswer: 'JavaScript Syntax Extension',
              explanation: 'JSX stands for JavaScript Syntax Extension. It is a syntax extension for JavaScript used with React to describe what the UI should look like.'
            },
            {
              id: 'q2',
              question: 'Which hook is used for managing state in functional components?',
              options: [
                'useEffect()',
                'useState()',
                'useContext()',
                'useReducer()'
              ],
              correctAnswer: 'useState()',
              explanation: 'The useState hook allows you to add state to functional components in React.'
            }
          ],
          passingScore: 70
        },
        isLocked: true
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    description: 'Learn server-side programming, databases, and API development',
    icon: 'Server',
    modules: [
      {
        id: 'backend-nodejs',
        title: 'Node.js Fundamentals',
        description: 'Learn JavaScript runtime for server-side applications',
        materials: [
          {
            id: 'nodejs-intro',
            title: 'Introduction to Node.js',
            type: 'article',
            url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
            duration: 40,
            description: 'What is Node.js and how to get started'
          },
          {
            id: 'nodejs-modules',
            title: 'Node.js Modules',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=xHLd36QoS4k',
            duration: 50,
            description: 'Learn how to use and create modules in Node.js'
          }
        ],
        quiz: {
          id: 'quiz-nodejs',
          title: 'Node.js Quiz',
          questions: [
            {
              id: 'q1',
              question: 'What is Node.js?',
              options: [
                'A programming language',
                'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
                'A database system',
                'A web framework'
              ],
              correctAnswer: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
              explanation: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser.'
            },
            {
              id: 'q2',
              question: 'How do you import a module in Node.js?',
              options: [
                'import module from \'module\';',
                'require(\'module\');',
                'include(\'module\');',
                'use module;'
              ],
              correctAnswer: 'require(\'module\');',
              explanation: 'In Node.js, you use the require() function to import modules.'
            }
          ],
          passingScore: 70
        },
        isLocked: false
      },
      {
        id: 'backend-databases',
        title: 'Databases & SQL',
        description: 'Learn relational databases and SQL querying',
        materials: [
          {
            id: 'sql-basics',
            title: 'SQL Basics',
            type: 'article',
            url: 'https://www.w3schools.com/sql/',
            duration: 50,
            description: 'Introduction to SQL and database concepts'
          },
          {
            id: 'database-design',
            title: 'Database Design Principles',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
            duration: 60,
            description: 'Learn how to design efficient database schemas'
          }
        ],
        quiz: {
          id: 'quiz-databases',
          title: 'Databases Quiz',
          questions: [
            {
              id: 'q1',
              question: 'What does SQL stand for?',
              options: [
                'Structured Query Language',
                'Strong Question Language',
                'Simple Query Language',
                'None of the above'
              ],
              correctAnswer: 'Structured Query Language',
              explanation: 'SQL stands for Structured Query Language, used for managing and manipulating relational databases.'
            },
            {
              id: 'q2',
              question: 'Which SQL clause is used to filter records?',
              options: [
                'ORDER BY',
                'GROUP BY',
                'WHERE',
                'HAVING'
              ],
              correctAnswer: 'WHERE',
              explanation: 'The WHERE clause is used to filter records based on specified conditions.'
            }
          ],
          passingScore: 70
        },
        isLocked: true      }
    ]
  }
];