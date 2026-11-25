const preferenceKey = 'marly:movimento';
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
const pageUrl = new URL(location.href);
let previewMotion = pageUrl.searchParams.get('movimento') === 'ativo';

let savedMotion: string | null = null;
try {
  savedMotion = localStorage.getItem(preferenceKey);
} catch {
  // The page can still use the system setting when storage is unavailable.
}

export function hasMotion() {
  return document.documentElement.dataset.motion === 'full';
}

const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');

function updateMotion() {
  const enabled = previewMotion || (savedMotion ? savedMotion === 'full' : !systemMotion.matches);
  document.documentElement.dataset.motion = enabled ? 'full' : 'reduced';
  if (toggle) {
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(enabled));
    const state = toggle.querySelector('[data-motion-state]');
    if (state) state.textContent = enabled ? 'Ligadas' : 'Desligadas';
  }
}

toggle?.addEventListener('click', () => {
  savedMotion = hasMotion() ? 'reduced' : 'full';
  if (previewMotion) {
    previewMotion = false;
    pageUrl.searchParams.delete('movimento');
    pageUrl.hash = location.hash;
    history.replaceState(history.state, '', pageUrl);
  }
  try {
    localStorage.setItem(preferenceKey, savedMotion);
  } catch {
    // The new preference remains available while this page is open.
  }
  updateMotion();
});

systemMotion.addEventListener('change', updateMotion);
updateMotion();

document.addEventListener('click', event => {
  if (event.defaultPrevented || !hasMotion() || event.detail === 0 || event.button !== 0 ||
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!anchor) return;
  const target = document.getElementById(anchor.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (location.hash !== anchor.hash) history.pushState(history.state, '', anchor.hash);
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: 'smooth' });
});

const editorialRail = document.querySelector('[data-collection-rail]');
if (editorialRail && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return;
    editorialRail.classList.add('rail-in-view');
    observer.disconnect();
  }, { threshold: 0.2 });
  observer.observe(editorialRail);
}
