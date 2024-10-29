import Chatbot from '@/components/chatbot';

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container px-4'>
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
        
        
        <Chatbot />
      </div>
    </section>
  );
}