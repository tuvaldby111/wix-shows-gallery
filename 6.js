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
    image:
      'https://static.wixstatic.com/media/5559d0_1fd08c917a8543328e1af7166228aef9~mv2.jpeg',
    link: '/הופעת-להקה',
  },
  {
    title: 'הופעת סולו',
    image:
      'https://static.wixstatic.com/media/5559d0_cbbee65906ef4f5f8ea036fb5e71a11b~mv2.jpeg',
    link: '/הופעת-סולו',
  },
  {
    title: 'עם בועז כהן',
    image:
      'https://static.wixstatic.com/media/5559d0_83d437203d31464dac0b84de8325f5ba~mv2.jpeg',
    link: '/משה-בן-יוחנה-עם-בועז-כהן',
  },
  {
    title: 'עם אשכול נבו',
    image:
      'https://static.wixstatic.com/media/5559d0_2c107f92609f44c98218b7d2e5c5bddc~mv2.jpeg',
    link: '/משה-בן-יוחנה-עם-אשכול-נבו',
  },
  {
    title: 'הופעת סלון',
    image:
      'https://static.wixstatic.com/media/5559d0_3b5b284dbeb742779c0954269b8d579d~mv2.jpeg',
    link: '/הופעת-סלון',
  },
];

const BUTTON_TEXT = 'לפרטים נוספים';

// ---------------------------------------------------------------------
// DOM builders
// ---------------------------------------------------------------------

function createCard(show) {
  // The whole card is a single link now, so clicking the image, the
  // title, or the button all navigate to the same page.
  const card = document.createElement('a');
  card.className = 'sg-card';
  card.href = show.link;
  card.setAttribute('aria-label', show.title + ' — ' + BUTTON_TEXT);

  const imageWrap = document.createElement('div');
  imageWrap.className = 'sg-image-wrap';

  const img = document.createElement('img');
  img.className = 'sg-image';
  img.src = show.image;
  img.alt = show.title;
  imageWrap.appendChild(img);

  const footer = document.createElement('div');
  footer.className = 'sg-footer';

  const title = document.createElement('h3');
  title.className = 'sg-title';
  title.textContent = show.title;

  // Visually a button, but a <span> (not a nested <a>) since the whole
  // card is already the link -- HTML doesn't allow links inside links.
  const button = document.createElement('span');
  button.className = 'sg-button';
  button.textContent = BUTTON_TEXT;

  footer.appendChild(title);
  footer.appendChild(button);

  card.appendChild(imageWrap);
  card.appendChild(footer);

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
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      width: 100%;
    }

    .sg-gallery {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      width: 100%;
      margin: 0 auto;
      padding: 10px;
      font-family: asimon-aaa-400, 'Rubik', Arial, Helvetica, sans-serif;
    }

    .sg-card {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      flex: 0 1 240px;
      max-width: 260px;
      min-width: 220px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
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

    .sg-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      padding: 14px 16px;
    }

    .sg-title {
      margin: 0;
      font-size: 14px;
      line-height: 1.25;
      font-weight: 700;
      color: #1c2b36;
      min-width: 0;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .sg-button {
      flex-shrink: 0;
      padding: 9px 18px;
      background-color: #EE1D17;
      color: #ffffff;
      text-decoration: none;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      transition: background-color 0.2s ease;
    }

    .sg-card:hover .sg-button {
      background-color: #c9160f;
    }
  `;
  return style;
}

// ---------------------------------------------------------------------
// Custom element definition
// ---------------------------------------------------------------------

class WixDefaultCustomElement extends HTMLElement {
  connectedCallback() {
    // Shadow DOM keeps our CSS fully isolated from the site's global
    // theme styles (and vice versa). This is what makes the component
    // render identically in the editor and on the published site --
    // without it, the site's own link/heading/button CSS can bleed in
    // on the live page and squash the layout.
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(createStyle());
    shadow.appendChild(createGallery());
  }
}

// NOTE: this tag name must match the "Tag name" field set for this
// element in the Wix Editor (Custom Element settings panel). If your
// element there is already registered as "wix-default-custom-element",
// leave this as-is. If you used a different tag name, change the
// string below to match it.
customElements.define('wix-default-custom-element', WixDefaultCustomElement);
