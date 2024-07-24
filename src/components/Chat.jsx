import React, { useEffect, useRef, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ChatBubble from './ChatBubble'
import Swal from 'sweetalert2'

const Chat = () => {
  const [promptText, setPromptText] = useState('')
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('')
  const lastMessageRef = useRef(null)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('messages')) || [])
  }, [])
  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => lastMessageRef.current.scrollIntoView({ behavior: 'smooth' }), 500)

    }
  }, [messages]);
  let textpos = -1
  const typeAnimation = (textToShow) => {
    if (textpos >= textToShow.length - 1) {
      setContent((prev) => prev + '\n');
      return
    };
    setContent((prev) => (prev ? prev + textToShow[textpos] : '' + textToShow[textpos]));
    textpos++;
    setTimeout(() => typeAnimation(textToShow), 10);
  }
  const getAnswer = async (e) => {
    e.preventDefault()
    try {
      localStorage.setItem('messages', JSON.stringify([...messages, { content: promptText, type: 'end' }]))
      setMessages([...messages, { content: promptText, type: 'end' }]);
      const result = await model.generateContent(promptText)
      const response = result.response;
      const textToShow = response.text();
      setMessages(prev => [...prev, { content: textToShow, type: 'start' }]);
      localStorage.setItem('messages', JSON.stringify([...messages, { content: promptText, type: 'end' }, { content: textToShow, type: 'start' }]))
      setPromptText('')
    } catch (error) {
      Swal.fire({
        title: error,
        text: "Something went wrong while generating content, please try again!",
        icon: "error"
      });
    }
  }
  return (
    <div>
      <div className='h-screen flex flex-col'>
        <div className='flex-1' id='content'>
          {messages && (
            messages.map((message, index) => (
              <div ref={lastMessageRef} key={index}>
                <ChatBubble content={message.content} type={message.type} />
              </div>
            ))
          )}
        </div>
        <form onSubmit={getAnswer} className='flex w-full'>
          <input type="text" value={promptText} onChange={(e) => setPromptText(e.target.value)} placeholder="Type here" className="input input-bordered flex-1 mr-2" />
          <button type='submit' className='btn mr-2 w-28'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
