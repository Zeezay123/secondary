import React from 'react'

const Footer = () => {
  return (
    <div>
        {/* <!-- ========== FOOTER ========== --> */}
<footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
  {/* <!-- Grid --> */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10 mt-20">
    <div className="col-span-full hidden lg:col-span-1 lg:block">
      <a className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white" href="#" aria-label="Brand">Delta State University</a>
      <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
        © {new Date().getFullYear()} Delsu.ng
      </p>
    </div>
    {/* <!-- End Col --> */}

    <div>
      <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Product</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://tetfund.gov.ng/">Tetfund</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="http://education.gov.ng/">Ministry of Education</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://delsu.edu.ng/Advertisement.pdf">Vacancies</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://delsu.edu.ng/Advertisement.pdf">Recruitment</a></p>
      </div>
    </div>
    {/* <!-- End Col --> */}

    <div>
      <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Company</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">About us</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Blog</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Careers</a> <span className="inline text-blue-600 dark:text-blue-500">— We're hiring</span></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Customers</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Newsroom</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Sitemap</a></p>
      </div>
    </div>
    {/* <!-- End Col --> */}

    <div>
      <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Resources</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://delsu.edu.ng/2024-2025-AcademicCalendar.jpg">Academic calender</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://delsu.edu.ng/Convoc.png">Event Calender</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Recruitment</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Police</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Safety-Alert</a></p>
      </div>
    </div>
    {/* <!-- End Col --> */}

    <div>
      <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Developers</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Student Affairs</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Student Union</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="/programmes">Programmes</a> </p>
      </div>

      <h4 className="mt-7 text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">Industries</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="/blog">Blog</a></p>
        <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Government</a></p>
      </div>
    </div>
    {/* <!-- End Col --> */}
  </div>
  {/* <!-- End Grid --> */}

  <div className="pt-5 mt-5 border-t border-gray-200 dark:border-neutral-700">
    <div className="sm:flex sm:justify-between sm:items-center">
      <div className="flex flex-wrap items-center gap-3">
       
        {/* <!-- End Language Dropdown --> */}

        <div className="space-x-4 text-sm">
          <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://www.facebook.com/delsucommunity">Facebook</a>
          <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://x.com/abraka_delsu">Twitter</a>
          <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="https://www.linkedin.com/school/delsu-main-campus">Linkedin</a>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="mt-3 sm:hidden">
          <a className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white" href="#" aria-label="Brand">Delta State university</a>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
            © { new Date().getFullYear()} Delsu.ng
          </p>
        </div>

    
       
      
      </div>
    
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer