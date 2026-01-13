"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setShowWelcome(false);
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "I apologize, but I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startScenario = (level: number) => {
    const prompts: Record<number, string> = {
      1: "I'd like to practice a Level 1 scenario. I'm new and want to focus on the basics of the Three-Pillar Framework.",
      2: "I'd like to practice a Level 2 scenario. I have some experience and want to work on discovery skills.",
      3: "I'd like to practice a Level 3 scenario. Give me something challenging with hidden complexity.",
    };
    setInput(prompts[level]);
    textareaRef.current?.focus();
  };

  const selectMode = (mode: string) => {
    const prompts: Record<string, string> = {
      teaching: "I'd like to learn about the Palante methodology. Can you explain the Three-Pillar Framework and how the pillars interact?",
      scenario: "I'd like to run a training scenario. What scenarios do you have available?",
      evaluation: "I have a client plan I'd like you to evaluate. What information do you need from me?",
    };
    setInput(prompts[mode]);
    textareaRef.current?.focus();
  };

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.logoShape}></div>
              <div className={styles.logoShape}></div>
              <div className={styles.logoShape}></div>
              <div className={styles.logoShape}></div>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Palante</span>
              <span className={styles.logoSubtitle}>Advisor Training</span>
            </div>
          </div>
          <nav className={styles.nav}>
            <button 
              className={styles.navButton}
              onClick={() => {
                setMessages([]);
                setShowWelcome(true);
              }}
            >
              New Session
            </button>
          </nav>
        </div>
      </header>

      {/* Chat Container */}
      <div className={styles.chatContainer}>
        {/* Messages Area */}
        <div className={styles.messagesArea}>
          {showWelcome && messages.length === 0 ? (
            <div className={styles.welcome}>
              <div className={styles.welcomeContent}>
                <h1 className={styles.welcomeTitle}>
                  Welcome to the<br />
                  <span className={styles.welcomeHighlight}>Palante Training System</span>
                </h1>
                <p className={styles.welcomeText}>
                  Develop your skills as a financial advisor who delivers comprehensive, 
                  holistic planning—and sounds like a Palante advisor doing it.
                </p>

                {/* Mode Selection */}
                <div className={styles.modeSection}>
                  <h2 className={styles.modeTitle}>Choose Your Mode</h2>
                  <div className={styles.modeGrid}>
                    <button 
                      className={styles.modeCard}
                      onClick={() => selectMode("teaching")}
                    >
                      <div className={styles.modeIcon}>📚</div>
                      <h3>Teaching Mode</h3>
                      <p>Learn methodology, frameworks, and best practices</p>
                    </button>
                    <button 
                      className={styles.modeCard}
                      onClick={() => selectMode("scenario")}
                    >
                      <div className={styles.modeIcon}>🎯</div>
                      <h3>Scenario Mode</h3>
                      <p>Practice with realistic client simulations</p>
                    </button>
                    <button 
                      className={styles.modeCard}
                      onClick={() => selectMode("evaluation")}
                    >
                      <div className={styles.modeIcon}>✅</div>
                      <h3>Evaluation Mode</h3>
                      <p>Get feedback on your plans and presentations</p>
                    </button>
                  </div>
                </div>

                {/* Quick Start Scenarios */}
                <div className={styles.quickStart}>
                  <h2 className={styles.quickStartTitle}>Quick Start: Practice Scenarios</h2>
                  <div className={styles.levelGrid}>
                    <button 
                      className={styles.levelCard}
                      onClick={() => startScenario(1)}
                    >
                      <span className={styles.levelBadge}>Level 1</span>
                      <h3>Supervised</h3>
                      <p>Guided practice with full support</p>
                    </button>
                    <button 
                      className={styles.levelCard}
                      onClick={() => startScenario(2)}
                    >
                      <span className={styles.levelBadge}>Level 2</span>
                      <h3>Independent</h3>
                      <p>Discovery-focused challenges</p>
                    </button>
                    <button 
                      className={styles.levelCard}
                      onClick={() => startScenario(3)}
                    >
                      <span className={styles.levelBadge}>Level 3</span>
                      <h3>Advanced</h3>
                      <p>Complex, realistic scenarios</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    message.role === "user" ? styles.userMessage : styles.assistantMessage
                  }`}
                >
                  <div className={styles.messageContent}>
                    {message.role === "assistant" ? (
                      <div className={styles.assistantAvatar}>P</div>
                    ) : null}
                    <div className={styles.messageBubble}>
                      {message.role === "assistant" ? (
                        <div className="markdown-content">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.assistantMessage}`}>
                  <div className={styles.messageContent}>
                    <div className={styles.assistantAvatar}>P</div>
                    <div className={styles.messageBubble}>
                      <div className={styles.typing}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <div className={styles.inputWrapper}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question, request a scenario, or submit work for evaluation..."
                className={styles.input}
                rows={1}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={isLoading || !input.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                </svg>
              </button>
            </div>
            <p className={styles.inputHint}>
              Press Enter to send, Shift+Enter for new line
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
