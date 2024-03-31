import { Button } from 'antd'
import React from 'react'
import Link from 'next/link'

export default function BlogCard(posts: IPosts) {
  return (
    <div className='border-1 shadow-xl rounded-lg flex flex-col' key={posts.id} data-aos="fade-up">
        <h1 className='rounded-t-lg h-16 font-bold text-center text-base bg-gray-100 p-2 flex justify-center items-center'>{posts.title}</h1>
        <p className='px-4 pt-3 text-justify'>{posts.body.slice(0,100)}...</p>
        <Button className='m-3 font-semibold' href={`./posts/${posts.id}`}>Read Blog</Button>
    </div>
  )
}
