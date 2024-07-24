import React from 'react'
import MarkdownRenderer from 'react-markdown-renderer'

const ChatBubble = ({ content, type }) => {
    return (
        <div className={`chat ${type === 'end' ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-bubble">
                <MarkdownRenderer markdown={content} />
            </div>
        </div>
    )
}

export default ChatBubble
