import { Route as rootRouteImport } from './routes/__root'
import { Route as CurriculoRouteImport } from './routes/curriculo'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ApiContactRouteImport } from './routes/api/contact'

const CurriculoRoute = CurriculoRouteImport.update({
  id: '/curriculo',
  path: '/curriculo',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiContactRoute = ApiContactRouteImport.update({
  id: '/api/contact',
  path: '/api/contact',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/curriculo': typeof CurriculoRoute
  '/api/contact': typeof ApiContactRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/curriculo': typeof CurriculoRoute
  '/api/contact': typeof ApiContactRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/curriculo': typeof CurriculoRoute
  '/api/contact': typeof ApiContactRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/curriculo' | '/api/contact'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/curriculo' | '/api/contact'
  id: '__root__' | '/' | '/curriculo' | '/api/contact'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CurriculoRoute: typeof CurriculoRoute
  ApiContactRoute: typeof ApiContactRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/curriculo': {
      id: '/curriculo'
      path: '/curriculo'
      fullPath: '/curriculo'
      preLoaderRoute: typeof CurriculoRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/api/contact': {
      id: '/api/contact'
      path: '/api/contact'
      fullPath: '/api/contact'
      preLoaderRoute: typeof ApiContactRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CurriculoRoute: CurriculoRoute,
  ApiContactRoute: ApiContactRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}
