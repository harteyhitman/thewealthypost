"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MediaSection.module.scss";
import { HiPlay, HiX, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  views?: string;
  publishedAt?: string;
  type: "video" | "podcast" | "post";
  youtubeId?: string;
  url?: string;
}

export default function MediaSection() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const podcastsRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  // Real YouTube videos from the channel
  const videos: MediaItem[] = [
    {
      id: "1",
      title: "How to INVEST as a Beginner 2024: The Basics",
      thumbnail: "https://img.youtube.com/vi/wh3_ScPqdKY/maxresdefault.jpg",
      duration: "8:23",
      views: "21.6K",
      publishedAt: "11 months ago",
      type: "video",
      youtubeId: "wh3_ScPqdKY",
    },
    {
      id: "2",
      title: "11 Money Lessons I Wish I Knew Sooner in the UK!",
      thumbnail: "https://img.youtube.com/vi/sE5Soee8KuE/maxresdefault.jpg",
      duration: "12:11",
      views: "190",
      publishedAt: "10 months ago",
      type: "video",
      youtubeId: "sE5Soee8KuE",
    },
    {
      id: "3",
      title:
        "Leaving the UK? The TRUTH About Your Assets (ISA, Pension, Property & Investments)",
      thumbnail: "https://img.youtube.com/vi/8I2eUe6LXPI/maxresdefault.jpg",
      duration: "9:23",
      views: "6.9K",
      publishedAt: "2 months ago",
      type: "video",
      youtubeId: "8I2eUe6LXPI",
    },
    {
      id: "4",
      title: "Being CAR POOR Is the New Normal and It's Ruining Lives",
      thumbnail: "https://img.youtube.com/vi/PMUdmyFw3CY/maxresdefault.jpg",
      duration: "17:36",
      views: "2.0K",
      publishedAt: "5 months ago",
      type: "video",
      youtubeId: "PMUdmyFw3CY",
    },
    {
      id: "5",
      title:
        "How the UK Pension System Actually Works in 2025 (State, Workplace & Personal Pensions Explained)",
      thumbnail: "https://img.youtube.com/vi/6FD9Hr_oXn4/maxresdefault.jpg",
      duration: "18:37",
      views: "307",
      publishedAt: "5 months ago",
      type: "video",
      youtubeId: "6FD9Hr_oXn4",
    },
    {
      id: "6",
      title: "Why Everything CHANGES Once You Save $10K",
      thumbnail: "https://img.youtube.com/vi/Y2msnureuIQ/maxresdefault.jpg",
      duration: "20:58",
      views: "437",
      publishedAt: "4 months ago",
      type: "video",
      youtubeId: "Y2msnureuIQ",
    },
  ];

  // Podcasts from playlists
  const podcasts: MediaItem[] = [
    {
      id: "p1",
      title:
        "The No 1 Biggest Financial Mistake Immigrants Make | MoneyWise Doctor",
      thumbnail: "https://img.youtube.com/vi/yqzQFt7sYUE/maxresdefault.jpg",
      duration: "1:04:00",
      views: "152",
      publishedAt: "10 months ago",
      type: "podcast",
      youtubeId: "yqzQFt7sYUE",
    },
    {
      id: "p2",
      title:
        "MoneyWise Doctor: How I Achieved 87% Returns on my Investments - Investing Secrets Revealed",
      thumbnail: "https://img.youtube.com/vi/zLHWVO8gLy8/maxresdefault.jpg",
      duration: "1:23:03",
      views: "118",
      publishedAt: "2 months ago",
      type: "podcast",
      youtubeId: "zLHWVO8gLy8",
    },
    {
      id: "p3",
      title:
        "Fastest Way to Become a Project Manager and Actually Get a Job in 2024 Darlington Anaele",
      thumbnail: "https://img.youtube.com/vi/a9zlCUiXNjc/maxresdefault.jpg",
      duration: "1:08:03",
      views: "90",
      publishedAt: "6 months ago",
      type: "podcast",
      youtubeId: "a9zlCUiXNjc",
    },
    {
      id: "p4",
      title:
        "How She Turned a Part-Time Blog into Full-Time Income - EMMA JACKSON BEE MONEY SAVVY",
      thumbnail: "https://img.youtube.com/vi/8XamVI7t4c0/maxresdefault.jpg",
      duration: "37:51",
      views: "186",
      publishedAt: "9 months ago",
      type: "podcast",
      youtubeId: "8XamVI7t4c0",
    },
  ];

  // Latest blog posts (YouTube Community Posts)
  const posts: MediaItem[] = [
    {
      id: "post1",
      title:
        "🚨 Just dropped: \"Don't Fall for the Tax Trap\" If you're leaving the UK or planning to one day this video is a must-watch",
      thumbnail:
        "https://yt3.ggpht.com/KUIe2kn5qa2rKuLdsqZc-rpOmd43BM9OlsG3Ms6-v6nzWnN03s088WtQE6AT6T1riEKxzB18C2V_uQ=s1152-c-fcrop64=1,34660000c466ffff-nd-v1",
      publishedAt: "2 months ago",
      type: "post",
      url: "http://youtube.com/post/UgkxcW2y6Nq5UwWbVGAZ2mn9tW-pz4RpEqzt",
    },
    {
      id: "post2",
      title:
        '🚨 New video just dropped: "NO LIMIT? Why the UK\'s Contactless Rule Could Be a Disaster" The government wants to remove the £100 contactless limit...',
      thumbnail:
        "https://yt3.ggpht.com/hANJdwEqMiVwq5lUwe86RMUiajEUnROK59INE_4WfqHARRs-9VSWNyc2WsnhO-cRsaYmI-GxgfYGcg=s720-c-fcrop64=1,000000008fffffff-nd-v1",
      publishedAt: "3 months ago",
      type: "post",
      url: "http://youtube.com/post/Ugkx0FwlFUJSKXp4Mv1GsUlcZVnXvDXhrwGP",
    },
    {
      id: "post3",
      title: "Would you trust unlimited contactless payments in the UK?",
      thumbnail:
        "https://yt3.ggpht.com/E1x6i0X5SxoVviOD52vkXi-BboWPSDBak1BtdR5VCT62DIZirLZSCnX1FuADUlCoPIQPsDG0=s200-c-k-c0x00ffffff-no-rj",
      publishedAt: "3 months ago",
      type: "post",
      url: "http://youtube.com/post/UgkxEp8DDiLN2Ie7c7RN5fedn24pigOl8yOA",
    },
    {
      id: "post4",
      title:
        "We've been sold a dream: \"Finance the car. Make it affordable. You deserve it.\" But what they didn't tell you...",
      thumbnail:
        "https://yt3.ggpht.com/lgB2-M-zMQugfxh5pSJ8XJd1x9WLmdoKxCn7CdlNdfJ1PM7pWfRvYNzMnZbf5DLwZJ8i_meTFNmk-g=s1080-c-fcrop64=1,088a00009889ffff-nd-v1",
      publishedAt: "5 months ago",
      type: "post",
      url: "http://youtube.com/post/UgkxW0AtwTZbJgJxcwnxFa8Y5Z-2lVHbkkQ-",
    },
    {
      id: "post5",
      title:
        "New Video Alert! 🚨 Your Boss Wants to Give You FREE Money?! (No, it's not a scam!) 👉 WATCH NOW",
      thumbnail:
        "https://yt3.ggpht.com/zQeyYjfcPwm0z-iph-DyZ9jC3-XlysEgVG4taYgyCKeKlxZeuuBVuoOYZq02HazwRQ76lFgekTKadZY=s1080-c-fcrop64=1,1e0f0000ae0effff-nd-v1",
      publishedAt: "5 months ago",
      type: "post",
      url: "http://youtube.com/post/UgkxDgO2vaHsfZap2LwLAS-DYzO6uXA58Jhr",
    },
  ];

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMediaClick = (item: MediaItem) => {
    if (item.type === "post") {
      if (item.url?.startsWith("http")) {
        // Open external URLs (YouTube community posts) in new tab
        window.open(item.url, "_blank", "noopener,noreferrer");
      } else {
        // Internal blog post links
        window.location.href = item.url || "/blog";
      }
    } else {
      setSelectedMedia(item);
    }
  };

  const closePlayer = () => {
    setSelectedMedia(null);
  };

  return (
    <section className={styles.mediaSection}>
      <div className={styles.container}>
        {/* Single CTA Button at Top */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Watch, Listen & Read</h2>
          <a
            href="https://www.youtube.com/@thewealthypost"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mainCTA}
          >
            <FaYoutube className={styles.youtubeIcon} />
            <span>Visit Our YouTube Channel</span>
          </a>
        </motion.div>

        {/* Videos Row */}
        <motion.div
          className={styles.row}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.rowHeader}>
            <h3 className={styles.rowTitle}>Videos</h3>
            <div className={styles.scrollButtons}>
              <button
                onClick={() => scroll(videosRef, "left")}
                className={styles.scrollButton}
                aria-label="Scroll left"
              >
                <HiChevronLeft />
              </button>
              <button
                onClick={() => scroll(videosRef, "right")}
                className={styles.scrollButton}
                aria-label="Scroll right"
              >
                <HiChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.scrollContainer} ref={videosRef}>
            <div className={styles.mediaRow}>
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  className={styles.mediaCard}
                  onClick={() => handleMediaClick(video)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.thumbnailWrapper}>
                    <img src={video.thumbnail} alt={video.title} />
                    <div className={styles.playOverlay}>
                      <HiPlay className={styles.playIcon} />
                    </div>
                    {video.duration && (
                      <span className={styles.duration}>{video.duration}</span>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.mediaTitle}>{video.title}</h4>
                    <div className={styles.metadata}>
                      {video.views && <span>{video.views} views</span>}
                      {video.publishedAt && <span> • {video.publishedAt}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Podcasts Row */}
        <motion.div
          className={styles.row}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.rowHeader}>
            <h3 className={styles.rowTitle}>Podcasts</h3>
            <div className={styles.scrollButtons}>
              <button
                onClick={() => scroll(podcastsRef, "left")}
                className={styles.scrollButton}
                aria-label="Scroll left"
              >
                <HiChevronLeft />
              </button>
              <button
                onClick={() => scroll(podcastsRef, "right")}
                className={styles.scrollButton}
                aria-label="Scroll right"
              >
                <HiChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.scrollContainer} ref={podcastsRef}>
            <div className={styles.mediaRow}>
              {podcasts.map((podcast) => (
                <motion.div
                  key={podcast.id}
                  className={styles.mediaCard}
                  onClick={() => handleMediaClick(podcast)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.thumbnailWrapper}>
                    <img src={podcast.thumbnail} alt={podcast.title} />
                    <div className={styles.playOverlay}>
                      <HiPlay className={styles.playIcon} />
                    </div>
                    {podcast.duration && (
                      <span className={styles.duration}>
                        {podcast.duration}
                      </span>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.mediaTitle}>{podcast.title}</h4>
                    <div className={styles.metadata}>
                      {podcast.views && <span>{podcast.views} views</span>}
                      {podcast.publishedAt && (
                        <span> • {podcast.publishedAt}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Row */}
        <motion.div
  className={styles.row}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  <div className={styles.rowHeader}>
    <h3 className={styles.rowTitle}>Latest Posts</h3>
    <div className={styles.scrollButtons}>
      <button
        onClick={() => scroll(postsRef, 'left')}
        className={styles.scrollButton}
        aria-label="Scroll left"
      >
        <HiChevronLeft />
      </button>
      <button
        onClick={() => scroll(postsRef, 'right')}
        className={styles.scrollButton}
        aria-label="Scroll right"
      >
        <HiChevronRight />
      </button>
    </div>
  </div>
  <div className={styles.scrollContainer} ref={postsRef}>
    <div className={styles.mediaRow}>
      {posts.map((post) => (
        <motion.div
          key={post.id}
          className={`${styles.mediaCard} ${styles.postCard}`}
          data-type="post"
          onClick={() => handleMediaClick(post)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.postHeader}>
            <div className={styles.postProfile}>
              <div className={styles.profilePicture}>
                <img src="/text-img-logo.png" alt="The Wealthy Post" className={styles.profileImg} />
              </div>
              <div className={styles.postChannelInfo}>
                <span className={styles.channelName}>The Wealthy Post</span>
                <span className={styles.postTimestamp}>• {post.publishedAt}</span>
              </div>
            </div>
          </div>
          <div className={styles.postBody}>
            <div className={styles.postTextContent}>
              <p className={styles.postText}>{post.title}</p>
            </div>
            <div className={styles.postThumbnail}>
              <img src={post.thumbnail} alt={post.title} />
            </div>
          </div>
          <div className={styles.postEngagement}>
            <button className={styles.engagementButton} aria-label="Like">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-3.33 10A2 2 0 0 1 17.5 24H2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4l1-5a2 2 0 0 1 2-2z"/>
              </svg>
            </button>
            <button className={styles.engagementButton} aria-label="Dislike">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 14V2M7 18.12 8 14H2.17a2 2 0 0 0-1.92 2.56l3.33 10A2 2 0 0 0 6.5 24H22a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-4l-1-5a2 2 0 0 0-2-2z"/>
              </svg>
            </button>
            <button className={styles.engagementButton} aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
              </svg>
            </button>
            <button className={styles.engagementButton} aria-label="Comment">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button className={styles.engagementButton} aria-label="More options">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>
      </div>

      {/* Video/Podcast Player Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePlayer}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closePlayer}>
                <HiX />
              </button>
              <div className={styles.playerWrapper}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1&rel=0`}
                  title={selectedMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.player}
                />
              </div>
              <h3 className={styles.modalTitle}>{selectedMedia.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
