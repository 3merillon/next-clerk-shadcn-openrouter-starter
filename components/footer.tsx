export default function Footer() {
  return (
    <footer className='py-4'>
      <div className='container'>
        <p className='text-center text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Cyril Monkewitz. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
