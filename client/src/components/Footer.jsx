import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footerc() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='my-5'>
                    <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl
                        font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                             via-purple-500 to-pink-500 rounded-lg text-white'>The Unwritten</span>
                            Chapters
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Blogs
                            </Footer.Link>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Our Orign
                            </Footer.Link>
                        </Footer.LinkGroup>
                        
                    </div>
                    <div>
                        <Footer.Title title='Follow us on' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Instagram
                            </Footer.Link>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Facebook
                            </Footer.Link>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Twitter
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Free and Secure' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link href='www.google.com' target='_blank' rel='noopener noreferrer'>
                                Terms and Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <Footer.Copyright by='Dragons Force Org.' year={new Date().getFullYear()} />
        </div>
    </Footer>
  )
}
