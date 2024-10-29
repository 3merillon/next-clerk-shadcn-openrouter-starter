import Chatbot from '@/components/chatbot';

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Next.js Clerk Shadcn Starter with OpenRouter LLM Integration</h1>
        <p className='mt-4'>Welcome to the Next.js Clerk Shadcn Starter with OpenRouter LLM Integration! This project combines the power of Next.js, Clerk, Shadcn UI, and OpenRouter to provide a seamless and intelligent conversational experience.</p>
        
        <h2 className='text-2xl font-bold mt-8'>🚀 Overview</h2>
        <p className='mt-4'>This template is based on two primary sources:</p>
        <ul className='list-disc list-inside ml-4'>
          <li><a href="https://github.com/xleron/next-clerk-shadcn-starter" className='text-blue-500'>Next.js Clerk Shadcn Starter</a></li>
          <li><a href="https://github.com/sherrybabe1978/openrouter-llm-integration" className='text-blue-500'>OpenRouter LLM Integration</a></li>
        </ul>
        
        <h2 className='text-2xl font-bold mt-8'>✨ Features</h2>
        <ul className='list-disc list-inside ml-4'>
          <li>Next.js: A powerful React framework for building server-side rendered and statically generated web applications.</li>
          <li>Clerk: Provides user authentication and management.</li>
          <li>Shadcn UI: A collection of accessible and customizable UI components.</li>
          <li>OpenRouter: Integration with OpenRouter API for access to cutting-edge Large Language Models (LLMs).</li>
          <li>Tailwind CSS: A utility-first CSS framework for rapid UI development.</li>
          <li>TypeScript: A statically typed superset of JavaScript.</li>
        </ul>
        
        <h2 className='text-2xl font-bold mt-8'>🛠️ Tech Stack</h2>
        <ul className='list-disc list-inside ml-4'>
          <li>Next.js: Version 13+</li>
          <li>React: Version 18+</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Clerk</li>
          <li>Shadcn UI</li>
          <li>OpenRouter API</li>
        </ul>
        
        <h2 className='text-2xl font-bold mt-8'>🖥️ Getting Started</h2>
        <h3 className='text-xl font-bold mt-4'>Prerequisites</h3>
        <ul className='list-disc list-inside ml-4'>
          <li>Node.js (v14 or later)</li>
          <li>npm or yarn</li>
          <li>An OpenRouter API key</li>
        </ul>
        
        <h3 className='text-xl font-bold mt-4'>Installation</h3>
        <ol className='list-decimal list-inside ml-4'>
          <li>Clone the repository:</li>
          <pre className='bg-muted-foreground text-background p-4 rounded'>
            <code>
              git clone https://github.com/your-username/next-clerk-shadcn-starter.git<br />
              cd next-clerk-shadcn-starter
            </code>
          </pre>
          <li>Install dependencies:</li>
          <pre className='bg-muted-foreground text-background p-4 rounded'>
            <code>
              npm install<br />
              # or<br />
              yarn install
            </code>
          </pre>
          <li>Set up environment variables:</li>
          <p>Copy <code>.env.example</code> to <code>.env.local</code> and fill in your OpenRouter API key and other required variables.</p>
          <li>Run the development server:</li>
          <pre className='bg-muted-foreground text-background p-4 rounded'>
            <code>
              npm run dev<br />
              # or<br />
              yarn dev
            </code>
          </pre>
          <p>Open <a href="http://localhost:3000" className='text-blue-500'>http://localhost:3000</a> in your browser to see the application.</p>
        </ol>
        
        <h2 className='text-2xl font-bold mt-8'>🖥️ Usage</h2>
        <ol className='list-decimal list-inside ml-4'>
          <li>Enter your message in the chat input field.</li>
          <li>Press &quot;Send&quot; or hit Enter to submit your message.</li>
          <li>The AI will process your input and provide a response.</li>
          <li>Continue the conversation as desired.</li>
        </ol>
        
        <h2 className='text-2xl font-bold mt-8'>🚀 Deployment</h2>
        <p>This project is set up for easy deployment on Vercel:</p>
        <ol className='list-decimal list-inside ml-4'>
          <li>Push your code to a GitHub repository.</li>
          <li>Connect your GitHub account to Vercel.</li>
          <li>Select the repository and configure your environment variables.</li>
          <li>Deploy!</li>
        </ol>
        <p>For more detailed instructions, check out the <a href="https://nextjs.org/docs/deployment" className='text-blue-500'>Next.js deployment documentation</a>.</p>
        
        <h2 className='text-2xl font-bold mt-8'>🤝 Contributing</h2>
        <p>Contributions, issues, and feature requests are welcome! Feel free to check the <a href="https://github.com/your-username/next-clerk-shadcn-starter/issues" className='text-blue-500'>issues page</a>.</p>
        
        <h2 className='text-2xl font-bold mt-8'>📝 License</h2>
        <p>This project is MIT licensed.</p>
        
        <h2 className='text-2xl font-bold mt-8'>🙏 Acknowledgements</h2>
        <ul className='list-disc list-inside ml-4'>
          <li><a href="https://github.com/xleron/next-clerk-shadcn-starter" className='text-blue-500'>Next.js Clerk Shadcn Starter</a></li>
          <li><a href="https://github.com/sherrybabe1978/openrouter-llm-integration" className='text-blue-500'>OpenRouter LLM Integration</a></li>
          <li><a href="https://nextjs.org/" className='text-blue-500'>Next.js</a></li>
          <li><a href="https://clerk.dev/" className='text-blue-500'>Clerk</a></li>
          <li><a href="https://shadcn.dev/" className='text-blue-500'>Shadcn UI</a></li>
          <li><a href="https://openrouter.ai/" className='text-blue-500'>OpenRouter</a></li>
          <li><a href="https://vercel.com/" className='text-blue-500'>Vercel</a></li>
        </ul>
        
        <h2 className='text-2xl font-bold mt-8'>📄 Demo</h2>
        <p>Check out the live demo: <a href="https://your-demo-link.vercel.app" className='text-blue-500'>Demo Link</a></p>

        <h2 className='text-2xl font-bold mt-8'>🙏 Special Thanks</h2>
        <p>A heartfelt thank you to Sharon for her incredible work on the <a href="https://github.com/sherrybabe1978/openrouter-llm-integration" className='text-blue-500'>OpenRouter LLM Integration</a>. Your contributions have been invaluable to this project!</p>

        
        <p className='mt-8'>Made with ❤️ by <a href="https://cyrilmonkewitz.com" className='text-blue-500'>Cyril Monkewitz</a></p>
        
        <Chatbot />
      </div>
    </section>
  );
}