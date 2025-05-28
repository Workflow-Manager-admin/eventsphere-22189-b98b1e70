# Translation Files for EventSphere

- Each language supported by the app should have a `.json` file at this location (e.g., `i18n.en.json`, `i18n.es.json`, etc.).
- Keys must be consistent across languages for proper runtime translation mapping.
- To add a new language:
  1. Add the language code and native label to the `LangSelector` in `App.js`.
  2. Create or update the corresponding translation file (e.g., `i18n.ta.json` for Tamil).
  3. (If using) Ensure any translation loading utility or hook is aware of the new language.

Tamil (`ta`) is now supported!
