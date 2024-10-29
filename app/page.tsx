import Chatbot from '@/components/chatbot';

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold'>Next.js Clerk Shadcn Starter with OpenRouter LLM Integration</h1>
        <p className='mt-4'>Welcome to the Next.js Clerk Shadcn Starter with OpenRouter LLM Integration! This project combines the power of Next.js, Clerk, Shadcn UI, and OpenRouter to provide a seamless and intelligent conversational experience.</p>
        <Chatbot />
      </div>
    </section>
  );
}