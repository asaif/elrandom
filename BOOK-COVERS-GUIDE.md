# Adding Book Covers to Your Reading Page

## 1. Update Schema (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished', 'want-to-read']),
    // ... other fields ...
    
    // Add cover image field
    coverImage: z.string().optional(), // URL to cover image
    
    tags: z.array(z.string()),
    language: z.enum(['en', 'ar']).default('en'),
    year: z.number(),
  }),
});

export const collections = {
  books: booksCollection,
};
```

## 2. Add Cover Images to Your Books

### Option A: Store images in your project

1. Create a folder: `public/covers/`
2. Add cover images: `public/covers/one-hundred-years.jpg`
3. Reference in markdown:

```markdown
---
title: "One Hundred Years of Solitude"
author: "Gabriel García Márquez"
coverImage: "/covers/one-hundred-years.jpg"
status: "reading"
# ... rest of frontmatter
---
```

### Option B: Use external URLs

```markdown
---
title: "One Hundred Years of Solitude"
author: "Gabriel García Márquez"
coverImage: "https://covers.openlibrary.org/b/isbn/0060883286-L.jpg"
status: "reading"
# ... rest of frontmatter
---
```

## 3. Where to Get Book Covers

### Free Sources:
1. **Open Library Covers API**
   - Format: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`
   - Example: `https://covers.openlibrary.org/b/isbn/0060883286-L.jpg`
   - Sizes: `-S` (small), `-M` (medium), `-L` (large)

2. **Google Books API**
   - Search for books and get thumbnail URLs
   - Free but requires API key

3. **Manual Downloads**
   - Amazon book pages (save image)
   - Goodreads
   - Publisher websites

### Recommended Approach:
Store images locally in `public/covers/` for:
- Better performance
- No external dependencies
- Control over image quality

## 4. Image Specifications

**Recommended dimensions:**
- Width: 300-400px
- Height: 450-600px
- Aspect ratio: 2:3 (portrait)
- Format: JPG or WebP
- File size: Under 200KB

**Naming convention:**
```
one-hundred-years-of-solitude.jpg
rashomon.jpg
al-ayyam.jpg
```

## 5. Example Book Entry with Cover

```markdown
---
title: "One Hundred Years of Solitude"
author: "Gabriel García Márquez"
status: "reading"
dateStarted: 2024-12-01
progress: 68
currentPage: 284
totalPages: 417
genre: "Magical Realism"
coverImage: "/covers/one-hundred-years.jpg"
quote: "He really had been through death, but he had returned because he could not bear the solitude."
tags: 
  - "Magical Realism"
  - "Latin American Literature"
language: "en"
year: 2024
---

García Márquez's prose is hypnotic...
```

## 6. Fallback Behavior

If no `coverImage` is provided, the system will display a colored placeholder with the book title. The placeholder uses your site's burgundy color scheme (#8b2942).

## 7. Optimizing Images

### Using Astro's Image Component (Optional)

For better performance, you can use Astro's built-in image optimization:

```astro
---
import { Image } from 'astro:assets';
// In your component
---

{book.data.coverImage && (
  <Image 
    src={book.data.coverImage} 
    alt={book.data.title}
    width={180}
    height={270}
    format="webp"
  />
)}
```

## 8. Batch Adding Covers

### Python Script to Fetch Covers from Open Library

```python
import requests
import os

books = [
    {"isbn": "0060883286", "filename": "one-hundred-years.jpg"},
    {"isbn": "0140449264", "filename": "rashomon.jpg"},
]

for book in books:
    url = f"https://covers.openlibrary.org/b/isbn/{book['isbn']}-L.jpg"
    response = requests.get(url)
    
    if response.status_code == 200:
        with open(f"public/covers/{book['filename']}", "wb") as f:
            f.write(response.content)
        print(f"Downloaded {book['filename']}")
    else:
        print(f"Failed to download {book['filename']}")
```

## 9. Directory Structure

```
your-project/
├── public/
│   └── covers/
│       ├── one-hundred-years.jpg
│       ├── rashomon.jpg
│       ├── al-ayyam.jpg
│       └── sapiens.jpg
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── books/
│   │       ├── one-hundred-years.md
│   │       ├── rashomon.md
│   │       └── al-ayyam.md
│   └── pages/
│       └── reading/
│           └── [slug].astro
```

## 10. CSS Customization

The book covers use these CSS classes:

```css
.book-cover {
    width: 180px;
    height: 270px;
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.book-cover-placeholder {
    background: linear-gradient(135deg, #8b2942 0%, #6a1f32 100%);
    /* Fallback styling when no cover image */
}
```

You can customize the shadow, border-radius, or gradient colors to match your design preferences.
