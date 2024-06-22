import { App } from './App'

const server = new App()
server.start().catch((error) => {
  console.error(error)
})
