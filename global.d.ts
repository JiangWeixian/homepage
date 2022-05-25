declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string
      // inject on platform vercel
      NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: string
      NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string
      // follow env variable replace in webpack build in next.config.js
      // Github repo owner, in Vercel, defined in env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER
      REPO_OWNER: string
      // Github repo name, in Vercel, defined in env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
      REPO_NAME: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
