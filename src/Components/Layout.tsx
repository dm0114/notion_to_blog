import styled from "@emotion/styled"
import { ReactNode } from "react"

const Container = styled.div`
  background-color: tomato;
  padding: 20px;
`

const Layout = ({children}: {children: ReactNode}) => {
  return <Container>{children}</Container>
}

export default Layout