import React from "react"
import styled from "styled-components"
import { Switch, Route, Link } from 'react-router-dom'

const blue = "#4a90e2"

class TabView extends React.Component {
  render() {
    let base_url = (this.props.match && this.props.match.url) || ""

    return (
      <div>
        <TabSelector tabCount={Object.keys(this.props.tabs).length}>
          { Object.keys(this.props.tabs).map((tab) => (
            <Tab
              key={tab}
              to={base_url + "/" + tab}
              selected={window.location.pathname === base_url + "/" + tab}
            >
              {tab}
            </Tab>
          ))}
        </TabSelector>

        <Switch>
          { Object.keys(this.props.tabs).map((tab) => (
            <Route
              key={tab}
              path={base_url + "/" + tab}
              component={this.props.tabs[tab]}
            />
          ))}
        </Switch>

        <Route
          exact
          path={base_url}
          component={Object.values(this.props.tabs)[0]}
        />
      </div>
    )
  }
}

const TabSelector = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  grid-template-columns: repeat(${p => p.tabCount}, auto);
  height: 4rem;
  overflow: hidden;
  font-size: 1.2rem;
`

const Tab = styled(Link)`
  text-align: center;
  text-transform: capitalize;
  color: ${(p) => p.selected ? blue : "inherit"};
  text-decoration: underline;
`

export default TabView;
