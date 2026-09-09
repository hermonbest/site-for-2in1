/**
 * 2 IN ONE PHOTOGRAPHY
 * Bole Medhanialem Milkomi City Complex Mall 2nd Floor, Addis Ababa, Ethiopia
 * Direct: +251 939 194 666 / +251 905 894 444
 * Instagram: @2_in_one_photography (17.2K Followers, 1,401 Posts)
 * Tagline: "Being a photographer Book your events now,,,"
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroSlideshow();
  initCinemaPlayer();
  initCardCarousels();
  initPortfolioFilter();
  initLightbox();
  initBookingForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. HEADER SCROLL & MOBILE DRAWER
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');
  const backdrop = document.querySelector('.nav-backdrop');
  const links = document.querySelectorAll('.nav-link, .drawer-book-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  function openMenu() {
    if (!menu) return;
    menu.classList.add('open');
    if (toggle) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    }
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (toggle) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = menu && menu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Active Section Spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 140;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. HERO MULTI-SLIDE BACKGROUND SHOWCASE
   ========================================================================== */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
  }

  function startTimer() {
    stopTimer();
    slideInterval = setInterval(() => {
      if (!document.hidden) {
        showSlide(currentSlide + 1);
      }
    }, 6500);
  }

  function stopTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      showSlide(idx);
      startTimer();
    });
  });

  startTimer();
}

/* ==========================================================================
   2b. CINEMA & 4K REEL CONTROLLER
   ========================================================================== */
function initCinemaPlayer() {
  const video = document.getElementById('cinemaVideo');
  const wrap = document.getElementById('cinemaPlayerWrap');
  const centerBtn = document.getElementById('cinemaCenterBtn');
  const audioBtn = document.getElementById('cinemaAudioBtn');
  const progressTrack = document.getElementById('cinemaProgressTrack');
  const progressFill = document.getElementById('cinemaProgressFill');
  const timeText = document.getElementById('cinemaTimeText');
  const fsBtn = document.getElementById('cinemaFsBtn');

  if (!video || !wrap) return;

  const playIcon = centerBtn ? centerBtn.querySelector('.icon-play') : null;
  const pauseIcon = centerBtn ? centerBtn.querySelector('.icon-pause') : null;
  const mutedIcon = audioBtn ? audioBtn.querySelector('.icon-muted') : null;
  const unmutedIcon = audioBtn ? audioBtn.querySelector('.icon-unmuted') : null;
  const audioText = audioBtn ? audioBtn.querySelector('.audio-text') : null;

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      wrap.classList.add('is-playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    } else {
      wrap.classList.remove('is-playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    }
  }

  function togglePlay() {
    if (video.paused || video.ended) {
      video.play().then(() => {
        updatePlayState(true);
      }).catch(() => {
        // Autoplay policy or interrupt handling
      });
    } else {
      video.pause();
      updatePlayState(false);
    }
  }

  if (centerBtn) {
    centerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // Clicking the video also toggles play/pause
  video.addEventListener('click', () => {
    togglePlay();
  });

  // Audio Toggle
  function updateAudioState() {
    if (video.muted) {
      if (mutedIcon) mutedIcon.style.display = 'block';
      if (unmutedIcon) unmutedIcon.style.display = 'none';
      if (audioText) audioText.textContent = 'Tap for Sound';
      if (audioBtn) audioBtn.setAttribute('aria-label', 'Unmute audio');
    } else {
      if (mutedIcon) mutedIcon.style.display = 'none';
      if (unmutedIcon) unmutedIcon.style.display = 'block';
      if (audioText) audioText.textContent = 'Sound On';
      if (audioBtn) audioBtn.setAttribute('aria-label', 'Mute audio');
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      updateAudioState();
      // If user toggles sound while video is paused, resume playback
      if (video.paused) {
        video.play().then(() => updatePlayState(true)).catch(() => {});
      }
    });
  }

  // Format time (mm:ss)
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Video time update
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (timeText) {
        timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      }
      if (progressTrack) {
        progressTrack.setAttribute('aria-valuenow', Math.round(pct));
      }
    }
  });

  video.addEventListener('loadedmetadata', () => {
    if (timeText && video.duration) {
      timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    }
  });

  video.addEventListener('play', () => updatePlayState(true));
  video.addEventListener('pause', () => updatePlayState(false));
  video.addEventListener('ended', () => updatePlayState(false));

  // Timeline scrub click
  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = progressTrack.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      if (video.duration) {
        video.currentTime = Math.max(0, Math.min(video.duration, clickPos * video.duration));
      }
    });

    // Keyboard support for timeline
    progressTrack.addEventListener('keydown', (e) => {
      if (!video.duration) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 5);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      }
    });
  }

  // Fullscreen
  if (fsBtn) {
    fsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        if (wrap.requestFullscreen) {
          wrap.requestFullscreen();
        } else if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen(); // iOS Safari video element fullscreen
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Efficient IntersectionObserver for smart auto-play / auto-pause:
  // Starts playback when scrolled into view (saving data and CPU while off-screen)
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          // Play only if muted for zero-disruption autoplay
          if (video.paused && video.muted) {
            video.play().then(() => {
              updatePlayState(true);
            }).catch(() => {
              // Gracefully handle browser policy
            });
          }
        } else {
          // Pause when user scrolls away to save battery, CPU and memory
          if (!video.paused) {
            video.pause();
            updatePlayState(false);
          }
        }
      });
    }, {
      threshold: [0, 0.35, 0.7]
    });

    videoObserver.observe(wrap);
  }
}

/* ==========================================================================
   3. IN-CARD INSTAGRAM CAROUSEL CONTROLS
   ========================================================================== */
function initCardCarousels() {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    const rawImages = item.getAttribute('data-images');
    if (!rawImages) return;

    let images = [];
    try {
      images = JSON.parse(rawImages);
    } catch (e) {
      return;
    }

    if (!images || images.length <= 1) return;

    let activeIndex = 0;
    const imgEl = item.querySelector('.gallery-img');
    const dots = item.querySelectorAll('.card-dot');
    const prevBtn = item.querySelector('.card-prev');
    const nextBtn = item.querySelector('.card-next');

    function updateCardImage(idx) {
      activeIndex = (idx + images.length) % images.length;
      if (imgEl) {
        imgEl.style.opacity = '0.75';
        imgEl.src = images[activeIndex];
        requestAnimationFrame(() => {
          imgEl.style.opacity = '1';
        });
      }
      dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === activeIndex);
      });
      item.setAttribute('data-active-index', activeIndex);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCardImage(activeIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCardImage(activeIndex + 1);
      });
    }
  });
}

/* ==========================================================================
   4. PORTFOLIO GALLERY & CATEGORY FILTERING
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categoryAttr = item.getAttribute('data-category') || '';
        const categories = categoryAttr.split(' ');
        const isMatch = filterValue === 'all' || categories.includes(filterValue);

        if (isMatch) {
          item.style.display = 'block';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. FULLSCREEN LIGHTBOX MODAL WITH INSTAGRAM SET CAROUSEL & THUMBS
   ========================================================================== */
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const modalSetTag = document.getElementById('lightboxSetTag');
  const modalSetTitle = document.getElementById('lightboxSetTitle');
  const modalCounter = document.getElementById('lightboxCounter');
  const thumbsContainer = document.getElementById('lightboxThumbs');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!modal || !modalImg) return;

  // Build sets collection
  const sets = [];
  items.forEach((item, setIdx) => {
    let images = [];
    try {
      images = JSON.parse(item.getAttribute('data-images') || '[]');
    } catch (e) {
      images = [];
    }
    if (images.length === 0) {
      const singleSrc = item.querySelector('.gallery-img')?.getAttribute('src');
      if (singleSrc) images = [singleSrc];
    }

    const title = item.getAttribute('data-title') || item.querySelector('.gallery-title')?.textContent || '2 In 1 Studio';
    const tag = item.getAttribute('data-tag') || item.querySelector('.gallery-tag')?.textContent || 'Commission';
    const meta = item.getAttribute('data-meta') || item.querySelector('.gallery-meta')?.textContent || '';

    sets.push({
      setIndex: setIdx,
      title,
      tag,
      meta,
      images,
      itemEl: item
    });
  });

  let currentSetIdx = 0;
  let currentPhotoIdx = 0;

  function renderThumbs(set) {
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = '';
    set.images.forEach((src, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lightbox-thumb-btn' + (idx === currentPhotoIdx ? ' active' : '');
      btn.setAttribute('aria-label', `View photo ${idx + 1} of ${set.images.length}`);
      
      const thumbImg = document.createElement('img');
      thumbImg.src = src;
      thumbImg.alt = `${set.title} photo ${idx + 1}`;
      thumbImg.loading = 'lazy';
      
      btn.appendChild(thumbImg);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToPhoto(idx);
      });
      thumbsContainer.appendChild(btn);
    });
  }

  function updateActiveState() {
    const currentSet = sets[currentSetIdx];
    if (!currentSet || !currentSet.images[currentPhotoIdx]) return;

    modalImg.style.opacity = '0.6';
    modalImg.src = currentSet.images[currentPhotoIdx];
    modalImg.alt = `${currentSet.title} photo ${currentPhotoIdx + 1}`;
    requestAnimationFrame(() => {
      modalImg.style.opacity = '1';
    });

    if (modalSetTag) modalSetTag.textContent = currentSet.tag;
    if (modalSetTitle) modalSetTitle.textContent = currentSet.title;
    if (modalCounter) {
      modalCounter.textContent = `Photo ${currentPhotoIdx + 1} of ${currentSet.images.length}`;
    }
    if (modalCaption) {
      modalCaption.textContent = `${currentSet.meta} • Two In One Photography Studio`;
    }

    // Update thumbnail highlights & scroll active thumbnail into view
    if (thumbsContainer) {
      const thumbBtns = thumbsContainer.querySelectorAll('.lightbox-thumb-btn');
      thumbBtns.forEach((btn, idx) => {
        const isActive = idx === currentPhotoIdx;
        btn.classList.toggle('active', isActive);
        if (isActive) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }
  }

  function goToPhoto(photoIdx) {
    currentPhotoIdx = photoIdx;
    updateActiveState();
  }

  function nextPhoto() {
    const currentSet = sets[currentSetIdx];
    if (currentPhotoIdx < currentSet.images.length - 1) {
      currentPhotoIdx++;
      updateActiveState();
    } else {
      // Advance to next set
      currentSetIdx = (currentSetIdx + 1) % sets.length;
      currentPhotoIdx = 0;
      renderThumbs(sets[currentSetIdx]);
      updateActiveState();
    }
  }

  function prevPhoto() {
    if (currentPhotoIdx > 0) {
      currentPhotoIdx--;
      updateActiveState();
    } else {
      // Go to previous set's last photo
      currentSetIdx = (currentSetIdx - 1 + sets.length) % sets.length;
      currentPhotoIdx = sets[currentSetIdx].images.length - 1;
      renderThumbs(sets[currentSetIdx]);
      updateActiveState();
    }
  }

  function openLightbox(setIdx, initialPhotoIdx = 0) {
    currentSetIdx = setIdx;
    currentPhotoIdx = initialPhotoIdx;
    renderThumbs(sets[currentSetIdx]);
    updateActiveState();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  items.forEach((item, setIdx) => {
    item.addEventListener('click', () => {
      const activeIdx = parseInt(item.getAttribute('data-active-index') || '0', 10);
      openLightbox(setIdx, activeIdx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextPhoto();
  });
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevPhoto();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Touch swipe support on modal
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  modal.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
    }
  }, { passive: true });

  modal.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }
  }, { passive: true });

  modal.addEventListener('touchend', () => {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   6. STREAMLINED INQUIRY FORM & WHATSAPP / TELEGRAM DISPATCH
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const whatsappBtn = document.getElementById('btnSendWhatsapp');
  const telegramBtn = document.getElementById('btnSendTelegram');
  const feedbackModal = document.getElementById('inquiryFeedbackModal');
  const closeFeedbackBtn = document.getElementById('closeFeedbackModal');

  function getFormData() {
    const name = document.getElementById('bookingName')?.value.trim() || 'Client';
    const phone = document.getElementById('bookingPhone')?.value.trim() || 'Not specified';
    const date = document.getElementById('bookingDate')?.value || 'TBD';
    const studio = document.getElementById('bookingStudio')?.value || 'Bole Medhanialem Studio';
    const service = document.getElementById('bookingService')?.value || 'Event Photography & Celebration';
    const notes = document.getElementById('bookingNotes')?.value.trim() || 'None';

    return { name, phone, date, studio, service, notes };
  }

  // Pre-fill WhatsApp message
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      const message = 
`*2 IN ONE PHOTOGRAPHY - EVENT INQUIRY*
----------------------------
*Name:* ${data.name}
*Phone:* ${data.phone}
*Event Date:* ${data.date}
*Location:* ${data.studio}
*Service Requested:* ${data.service}
*Vision Notes:* ${data.notes}
----------------------------
Being a photographer Book your events now,,,
Sent via 2 in one photography Website`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/251939194666?text=${encoded}`, '_blank');
    });
  }

  // Telegram link
  if (telegramBtn) {
    telegramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://t.me/inonephotography', '_blank');
    });
  }

  // Form Submit Modal
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();
      
      const summaryContent = document.getElementById('feedbackSummaryText');
      if (summaryContent) {
        summaryContent.innerHTML = `
          <strong>Client:</strong> ${data.name}<br>
          <strong>Contact:</strong> ${data.phone}<br>
          <strong>Service:</strong> ${data.service}<br>
          <strong>Preferred Date:</strong> ${data.date}<br>
          <strong>Studio Location:</strong> ${data.studio}
        `;
      }

      if (feedbackModal) {
        feedbackModal.classList.add('active');
      }
    });
  }

  if (closeFeedbackBtn && feedbackModal) {
    closeFeedbackBtn.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
      form.reset();
    });
  }
}

/* ==========================================================================
   7. SMOOTH SCROLL FOR BUTTONS & ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
