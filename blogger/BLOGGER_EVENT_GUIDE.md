# Race Atlas Blogger setup

## Install the theme

1. Open Blogger Dashboard.
2. Choose your blog.
3. Open **Theme**.
4. Select the three-dot menu.
5. Choose **Restore** or **Edit HTML**.
6. Upload or paste `race-atlas-theme.xml`.
7. Save the theme.

Always download your current Blogger theme first as a backup.

## Where to publish a new event

New events are published from the normal Blogger backend:

1. Open **Blogger Dashboard**.
2. Select the Race Atlas blog.
3. Click **Posts**.
4. Click **New Post**.
5. Add the event title, image, event details, and official registration link.
6. Add the labels listed below.
7. Click **Publish**.

The new event will automatically appear in the homepage post cards and in Blogger search/label pages.

The `Publish event` header button is only a shortcut to Blogger's editor. Replace its URL with your actual Blogger editor URL or remove it if you do not want public visitors to see it.

## Required labels

Use one label from each group:

### Distance

- Marathon
- Half Marathon
- 10K
- 5K
- Trail Run
- Ultra Marathon

### Event type

- Road Race
- Trail Run
- Charity Run
- Virtual Run
- Fun Run

### Registration status

- Registration Open
- Coming Soon
- Sold Out
- Registration Closed

### Country

Use the country name, for example:

- Bangladesh
- India
- United States
- United Kingdom
- Australia

## Recommended event post format

Use this structure inside every event post:

```html
<p><strong>Event date:</strong> January 15, 2027</p>
<p><strong>Start time:</strong> 06:00 local time</p>
<p><strong>Location:</strong> Dhaka, Bangladesh</p>
<p><strong>Venue:</strong> Hatirjheel Amphitheatre</p>
<p><strong>Organizer:</strong> Dhaka Running Collective</p>
<p><strong>Distances:</strong> Marathon - 42.195 km; Half Marathon - 21.1 km; 10K - 10 km</p>
<p><strong>Registration:</strong> Registration Open</p>
<p><strong>Official website:</strong> <a href="https://example.com" rel="nofollow noopener" target="_blank">Visit official website</a></p>
<p><strong>Register:</strong> <a href="https://example.com/register" rel="nofollow noopener" target="_blank">Register on official website</a></p>
<hr/>
<p>Write the full verified event description here.</p>
```

Replace every example URL with the organizer-provided URL. Never invent registration URLs.

## Featured events

Blogger does not provide a built-in featured flag in this theme. To feature an event, place the post near the top of the blog or add a `Featured` label and customize the theme later to prioritize that label.

## Important limitation

Blogger is excellent for publishing and organizing event posts, but it does not provide the same relational database, admin CRUD, multi-filter API, or custom authentication as the Next.js application. For a simple event directory, use Blogger labels and consistent post formatting. For advanced filters, map search, CSV import, and structured admin workflows, keep using the Next.js version.
