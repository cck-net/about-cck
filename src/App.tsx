import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

const url = 'https://backend-api-url.com/about-me/'

interface ServerResponse {
  linkedin: string,
  github:   GithubResponse[]
}

interface GithubResponse {
  repository: string,
  commitCount: number,
  occuredAt: Date
}

function App() {

  const [linkedinData, setLinkedin] = useState("")
  const [githubData, setGithub] = useState([""])
  const [error, setError] = useState(null)
  const [isRotating, setIsRotating] = useState(false)

  const handleClick = () => {
    setIsRotating(!isRotating);
  };

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get<ServerResponse>(url)

        const gitRes: string[] = response.data.github.map(i => { return `${i.repository} (${i.commitCount} commits)` })

        setGithub(gitRes)
        setLinkedin(response.data.linkedin)

      } catch (error) {
        console.log(error)
        //setError(error);
      }
    }

    fetchData()
  }, [])

  if (error) return <div>Error: {error}</div>
  if (!linkedinData) return <div>Loading...</div>

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Cristian Kfouri web page.
        </p>
        <img src={logo}
          className={`App-logo ${isRotating ? 'rotating' : ''}`}
          alt="logo"
          onClick={handleClick}
        />
        <p className="Content">
          This page was developed to test integrations with social media.<br/>
          The frontend consumes an API, which queries Linkedin and Github.<br/>
          Written in React.js, Node.js and Typescript.</p>
        <p>
          {linkedinData} <br/><span className="Subscript">visit <a href="https://www.linkedin.com/in/cristiankfouri">linkedin</a></span>
        </p>
        <p>
          Public repositories 
        </p>
        <ul className="Content">
          {
            githubData.map((item, index) => (
              <li key={ index }>{ item }</li>
            ))
          }
        </ul>
        <span className="Subscript">visit <a href="https://github.com/cck-net">github</a></span>
      </header>
    </div>
  )
}

export default App
