import React from 'react'
import Card from '../Cards/Card'

const Projects = () => {
  const projects = {
    kardiomegalia: {
      title: 'Wykrywanie Kardiomegalii',
      text: 'Projekt opierał się na znalezieniu i opracowaniu odpowiednich cech, które były potem wykorzystane do wyuczenia wybranych modelów do prawidłowej predykcji osoby chorej lub zdrowej.'
    }
  }

  return (
    <section id='projects'>
      <div className="badge">🔸 Projekty </div>
      <h2>Projekty nad którymi pracowaliśmy, lub aktualnie pracujemy 🧠 <span></span></h2>

      <div className="project-grid">
        {Object.entries(projects).map(([key, project]) => (
        <Card key={key} title={project.title} text={project.text} imgSrc={project.imgSrc}/>
      ))}
    </div>
    </section>
  )
}

export default Projects