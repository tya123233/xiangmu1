'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Josefin_Sans } from 'next/font/google'
import EmbeddedGestureGallery from '@/components/EmbeddedGestureGallery'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

const josefin = Josefin_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  display: 'swap'
})

const conversationPart1 = [
  { id: 1, side: 'left', text: "So how did you two meet?" },
  { id: 2, side: 'right', text: "We started on the same day. You know that feeling... the first-day-at-work nerves? We were both in the elevator, and she pressed the same floor." },
  { id: 3, side: 'left', text: "And then?" },
  { id: 4, side: 'right', text: "And then... it was just work. She sat diagonally across from me. Sometimes I'd catch her resting her chin in her hand, thinking about something. She liked to make coffee around three in the afternoon. When she passed by my desk... how do I put it, there was this faint scent of perfume, like... wood after rain? I'm not good at describing it." },
  { id: 5, side: 'left', text: "Sounds like you noticed a lot of details." },
  { id: 6, side: 'right', text: "I'm pretty sure a lot of people at the company liked her." },
  { id: 7, side: 'left', text: "Were you one of them?" },
  { id: 8, side: 'right', text: "Not at first. Back then I was working 12-hour days (bitter laugh), my head was full of code reviews and stuff. Love? What a luxury." },
  { id: 9, side: 'right', text: "She... I guess she just needed someone to listen to her. Later we'd run into each other at the break room occasionally, chat about things outside of work." },
  { id: 10, side: 'left', text: "Did you start dating?" },
  { id: 11, side: 'right', text: "I wouldn't call it dating exactly. It was more like... we just naturally started doing things together." },
]

const conversationPart2 = [
  { id: 12, side: 'left', text: "It sounds like you two really liked each other." },
  { id: 13, side: 'right', text: "(bitter laugh) Actually... we never got together. Maybe she just needed me—needed someone to listen. Those romantic moments, maybe to her they were just companionship between friends. I never dared to say it out loud, afraid I'd lose even what we had." },
  { id: 14, side: 'left', text: "Why didn't you dare?" },
  { id: 15, side: 'right', text: "I was afraid that once I said it, even our current dynamic would disappear. She'd lean on my shoulder watching the sunset, hold my hand in the snow, but the next day at the office, it was like nothing had happened. I tried dropping hints, but she always seemed to... pull back to a safe distance at the crucial moment." },
  { id: 16, side: 'right', text: "Once I worked up the courage to tell her by the window. But she suddenly pointed at the sunset in the distance, started talking about the weather forecast or something, and just changed the subject like that. All the words I'd prepared got stuck in my throat. In the end I could only talk with her about whether it would rain tomorrow. But later, some other things happened..." },
]

export default function DialogueTypewriter() {
  const containerRef1 = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)
  const textRefs1 = useRef<(HTMLParagraphElement | null)[]>([])
  const textRefs2 = useRef<(HTMLParagraphElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null) // 新增

  // Part 1 Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef1.current,
        start: "top 80%", 
        toggleActions: "play none none none",
      }
    })

    conversationPart1.forEach((item, index) => {
      const duration = Math.min(Math.max(item.text.length * 0.02, 0.8), 4)
      
      tl.to({}, { 
        duration: duration, 
        ease: "none",
        onUpdate: function() {
          const el = textRefs1.current[index]
          if (el) {
            const progress = this.progress()
            const len = Math.ceil(item.text.length * progress)
            el.innerText = item.text.substring(0, len)
          }
        }
      })
      tl.to({}, { duration: 0.3 })
    })

  }, { scope: containerRef1 })

  // Part 2 Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef2.current,
        start: "top 80%", // 当第二部分进入视口时触发
        toggleActions: "play none none none",
      }
    })

    conversationPart2.forEach((item, index) => {
      const duration = Math.min(Math.max(item.text.length * 0.02, 0.8), 4)
      
      tl.to({}, { 
        duration: duration, 
        ease: "none",
        onUpdate: function() {
          const el = textRefs2.current[index]
          if (el) {
            const progress = this.progress()
            const len = Math.ceil(item.text.length * progress)
            el.innerText = item.text.substring(0, len)
          }
        }
      })
      tl.to({}, { duration: 0.3 })
    })

    // Show Title "In the office..."
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      )
    }

  }, { scope: containerRef2 })

  return (
    <div className={`flex flex-col w-full max-w-5xl mx-auto px-8 py-12 gap-16 ${josefin.className}`}>
      
      {/* Part 1 */}
      <div ref={containerRef1} className="flex flex-col gap-8">
        {conversationPart1.map((item, index) => (
          <div 
            key={item.id} 
            className={`max-w-[80%] md:max-w-[60%] ${item.side === 'left' ? 'self-start' : 'self-end'}`}
          >
            <p 
              ref={el => { textRefs1.current[index] = el }}
              className={`text-2xl md:text-3xl leading-relaxed min-h-[2.5rem] ${item.side === 'left' ? 'text-black font-medium' : 'text-gray-800 font-light text-left'}`}
            >
            </p>
          </div>
        ))}

        {/* 手势控制照片画廊 */}
        <div className="self-center w-full max-w-xl mb-16">
          <EmbeddedGestureGallery className="w-full" />
        </div>
      </div>

      {/* Part 2 */}
      <div ref={containerRef2} className="flex flex-col gap-8">
        {conversationPart2.map((item, index) => (
          <div 
            key={item.id} 
            className={`max-w-[80%] md:max-w-[60%] ${item.side === 'left' ? 'self-start' : 'self-end'}`}
          >
            <p 
              ref={el => { textRefs2.current[index] = el }}
              className={`text-2xl md:text-3xl leading-relaxed min-h-[2.5rem] ${item.side === 'left' ? 'text-black font-medium' : 'text-gray-800 font-light text-left'}`}
            >
            </p>
          </div>
        ))}

        {/* 过渡标题 - 对话结束后 */}
        <h3 ref={titleRef} className="text-center text-4xl md:text-5xl font-bold text-black mt-24 mb-8 select-none opacity-0">
          In the office...
        </h3>
      </div>

    </div>
  )
}
