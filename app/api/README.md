# API

## Generated Client from hey-api

A typescript client to interface with the SpaceTraders API has been generated under `/app/api/client` via command line. No changes will persist on next generation.

## Customizations

Functions at the `/app/api` level are custom wrapped calls using the client & standardizing the data for UI presentation.

**Note:**

Many features/components/routes may want to use these customizations. Since these are meant for reusability app-wide, they have been created at this top level above the features. This allows for a single source of truth for API calls and data formatting, and prevents code duplication across different parts of the app.
