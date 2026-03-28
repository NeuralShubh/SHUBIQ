"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [showPlayButton, setShowPlayButton] = useState(true)

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be")
  const isVimeo = src.includes("vimeo.com")
  const isEmbed = isYouTube || isVimeo
  const isEmpty = !src || src.trim() === ""

  const getEmbedUrl = () => {
    if (isYouTube) {
      const videoId = src.includes("youtu.be")
        ? src.split("youtu.be/")[1]?.split("?")[0]
        : src.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`
    }
    if (isVimeo) {
      const videoId = src.split("vimeo.com/")[1]?.split("?")[0]
      return `https://player.vimeo.com/video/${videoId}?autoplay=0`
    }
    return src
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("loadedmetadata", updateProgress)
    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("loadedmetadata", updateProgress)
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, [isPlaying])

  useEffect(() => {
    if (isEmpty || isEmbed) return
    const video = videoRef.current
    const target = containerRef.current
    if (!video || !target) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => {
              setIsPlaying(true)
              setShowPlayButton(false)
            }).catch(() => {
              setIsPlaying(false)
            })
          } else {
            video.pause()
            setIsPlaying(false)
            setShowPlayButton(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [isEmbed, isEmpty])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
      setShowPlayButton(false)
    } else {
      video.pause()
      setIsPlaying(false)
      setShowPlayButton(true)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    const container = containerRef.current
    if (!container) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  if (isEmpty) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-black/90 shadow-[0_20px_60px_rgb(0_0_0_/_0.5)]"
        style={{ aspectRatio: "16/9" }}
      >
        {poster ? (
          <Image
            src={poster}
            alt={title}
            width={1200}
            height={675}
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-black via-[rgb(var(--surface-2-rgb))] to-black" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 ml-1">
              <polygon points="5,3 19,12 5,21" fill="currentColor" />
            </svg>
          </div>
          <span className="text-white/40 text-sm font-medium tracking-wide uppercase">Video demo coming soon</span>
        </div>
      </div>
    )
  }

  if (isEmbed) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-[0_18px_46px_rgb(0_0_0_/_0.5)]"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          src={getEmbedUrl()}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title={`${title} video demo`}
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden bg-black shadow-[0_20px_60px_rgb(0_0_0_/_0.55)] group cursor-pointer"
      style={{ aspectRatio: "16/9" }}
      onMouseMove={() => setShowControls(true)}
      onTouchStart={() => setShowControls(true)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onEnded={() => {
          setIsPlaying(false)
          setShowPlayButton(true)
        }}
      />

      <AnimatePresence>
        {showPlayButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-1">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/progress"
          onClick={seekTo}
        >
          <div
            className="h-full rounded-full transition-all duration-150 relative"
            style={{
              width: `${progress}%`,
              background: "rgb(var(--gold-rgb))",
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover/progress:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isMuted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={handleFullscreen}
            aria-label="Toggle fullscreen"
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,3 21,3 21,9" />
              <polyline points="9,21 3,21 3,15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
