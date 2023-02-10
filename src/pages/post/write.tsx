import Layout from "@/Components/Layout"
import Link from "next/link"
import React, { useRef, useState } from "react"

// 제어 컴포넌트를 활용한 HTML Form
const Write = () => {
  const idRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const [showLink, setShowLink] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // In this code, we use the optional chaining operator ?. 
    // to access the value property of the current property of the idRef, titleRef, and contentRef hooks. 
    // This operator allows you to access the value property only if the current property is not null or undefined.
    
    // If any of the current properties are null or undefined, 
    // the handleSubmit function will not make the fetch request, and no error will occur.

    const id = idRef.current?.value
    const title = titleRef.current?.value
    const content = contentRef.current?.value

    if (id && title && content) {
      
      fetch('/api/post/write', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id,
          title,
          content
        })
      })
      .then(res => {        
        if (res.ok) {
          return res.json()
        }
        // fetch Promise는 HTTP error에 의해 reject되지 않으므로, throw new Error로 던져줘야 한다.
        throw new Error('Fetch Error')
      })
      .then(data => {
        setShowLink(true)
        alert(data.message)
      })
      .catch(err => alert(`request error: ${err}`))
    }
  }
  return (
    <Layout>
      <h1>write</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />

        <input type="text" name="title" placeholder="title" required ref={titleRef} />
        <br />

        <textarea name="content" placeholder="content" required ref={contentRef} />
        <br />

        <input type="submit" value='Create'/>
      </form>
      {showLink && <Link href={`/posts/${idRef.current?.value}`}><p>created Post</p></Link>}
    </Layout>
  )
}

export default Write