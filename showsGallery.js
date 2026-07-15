// =====================================================================
// SHOWS GALLERY — Wix Custom Element (Velo)
// =====================================================================
// This replaces the default "wix-default-custom-element" boilerplate.
// It renders a responsive grid of 5 show cards (image + title + button).
//
// HOW TO EDIT THE CONTENT:
// Just change the 5 objects in the SHOWS array below. Nothing else in
// this file needs to change for basic content updates.
//
//   title : the show's name (Hebrew is fully supported, RTL is built in)
//   image : URL of the image. Upload your photo in the Wix Media Manager,
//           right-click it -> "Copy image URL", and paste it here.
//   link  : the page to open when the button is clicked. Use the page's
//           relative URL, e.g. "/comedy-night" (check it under
//           Pages -> [page] -> SEO / page-info panel in the editor).
// =====================================================================

const SHOWS = [
  {
    title: 'הופעת להקה',
    image: 'https://placehold.co/500x350?text=הופעת+להקה',
    link: '/הופעת-להקה',
  },
  {
    title: 'הופעת סולו',
    image: 'https://placehold.co/500x350?text=הופעת+סולו',
    link: '/הופעת-סולו',
  },
  {
    title: 'מופע 3',
    image: 'https://placehold.co/500x350?text=מופע+3',
    link: '/show-3',
  },
  {
    title: 'מופע 4',
    image: 'https://placehold.co/500x350?text=מופע+4',
    link: '/show-4',
  },
  {
    title: 'מופע 5',
    image: 'https://placehold.co/500x350?text=מופע+5',
    link: '/show-5',
  },
];

const BUTTON_TEXT = 'לפרטים נוספים';

// ---------------------------------------------------------------------
// DOM builders
// ---------------------------------------------------------------------

function createCard(show) {
  const card = document.createElement('div');
  card.className = 'sg-card';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'sg-image-wrap';

  const img = document.createElement('img');
  img.className = 'sg-image';
  img.src = show.image;
  img.alt = show.title;
  imageWrap.appendChild(img);

  const title = document.createElement('h3');
  title.className = 'sg-title';
  title.textContent = show.title;

  const button = document.createElement('a');
  button.className = 'sg-button';
  button.href = show.link;
  button.textContent = BUTTON_TEXT;

  card.appendChild(imageWrap);
  card.appendChild(title);
  card.appendChild(button);

  return card;
}

function createGallery() {
  const gallery = document.createElement('div');
  gallery.className = 'sg-gallery';
  gallery.dir = 'rtl';

  SHOWS.forEach(function (show) {
    gallery.appendChild(createCard(show));
  });

  return gallery;
}

function createStyle() {
  const style = document.createElement('style');
  style.textContent = `
    wix-default-custom-element {
      display: block;
      width: 100%;
      height: 100%;
    }

    .sg-gallery {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      font-family: Arial, Helvetica, sans-serif;
    }

    @media (max-width: 1100px) {
      .sg-gallery {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 700px) {
      .sg-gallery {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 420px) {
      .sg-gallery {
        grid-template-columns: 1fr;
      }
    }

    .sg-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .sg-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
    }

    .sg-image-wrap {
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: #f0f4f7;
    }

    .sg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .sg-title {
      margin: 14px 12px 6px 12px;
      font-size: 17px;
      font-weight: 700;
      color: #1c2b36;
      text-align: center;
    }

    .sg-button {
      margin: 8px 0 16px 0;
      padding: 10px 22px;
      background-color: #2a5d8f;
      color: #ffffff;
      text-decoration: none;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      transition: background-color 0.2s ease;
    }

    .sg-button:hover {
      background-color: #1e4569;
    }
  `;
  return style;
}

// ---------------------------------------------------------------------
// Custom element definition
// ---------------------------------------------------------------------

class WixDefaultCustomElement extends HTMLElement {
  connectedCallback() {
    this.appendChild(createStyle());
    this.appendChild(createGallery());
  }
}

// NOTE: this tag name must match the "Tag name" field set for this
// element in the Wix Editor (Custom Element settings panel). If your
// element there is already registered as "wix-default-custom-element",
// leave this as-is. If you used a different tag name, change the
// string below to match it.
customElements.define('wix-default-custom-element', WixDefaultCustomElement);
