# Wealth Desk

Password-protected, view-only investment dashboard for Shaan, published with GitHub Pages.

`index.html` is encrypted (StatiCrypt, AES-256). Without the password it shows only a login box.
`tools/build.mjs` rebuilds it from a data file that is never committed. No account numbers or IDs are stored here.
